# Deployment & Operations Guide

This document covers the live operations side of Mixology Studio: deploying, monitoring, and rolling back. The high-level steps are also in `README.md`; this file is the long-form runbook.

## 1. Initial deploy (first time)

### Pre-flight
- [x] Repo pushed to GitHub (or GitLab)
- [x] `railway.json` is at the repo root (committed)
- [x] `.env.example` is at the repo root (committed)
- [x] No secrets in `.env.local` (would be in `.gitignore`)

### Steps
1. **Create Railway account** at <https://railway.app> (GitHub login).
2. **New Project → Deploy from GitHub → select the `mixology-studio` repo**.
3. Railway auto-detects Next.js, generates a domain like `https://<app-name>.up.railway.app`.
4. (Optional) **Settings → Networking → Generate Domain** if no domain is auto-assigned.
5. (Optional) Add a Postgres plugin if you want a real DB (v0.1 doesn't need it).

### Verify
```bash
curl https://<app-name>.up.railway.app/api/health
# → {"status":"ok","service":"mixology-studio",...}

curl -X POST https://<app-name>.up.railway.app/api/match \
  -H "Content-Type: application/json" \
  -d '{"ingredientIds":["ing-gin","ing-campari","ing-sweet-vermouth"]}'
# → JSON with Negroni as top match
```

Open the URL in a browser and try dragging an ingredient. You should see the matching recipe cards appear.

## 2. Continuous deployment

Every push to the main branch auto-deploys. Steps for a typical change:

1. Create a feature branch
2. Make changes, run `npm run type-check` and `npm run lint`
3. Open a PR — Railway will deploy a preview environment (if your plan supports it)
4. After review, merge to main → production deploy is automatic

## 3. Environment variables

Set in **Railway dashboard → Service → Variables**:

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Optional (v1.1) | Postgres connection string. Leave unset for v0.1. |
| `NEXT_PUBLIC_SITE_URL` | Optional | Public site URL. Used for OG tags. |
| `OPENAI_API_KEY` | Optional (Innovation mode) | Required for the "✨ AI 创新" mode to work. OpenAI-compatible key. |
| `OPENAI_BASE_URL` | Optional (Innovation mode) | Override the LLM endpoint. Default `https://api.openai.com`. Set to `https://api.deepseek.com` for DeepSeek, `https://api.moonshot.cn` for Moonshot, etc. |
| `LLM_MODEL` | Optional (Innovation mode) | Model name. Default `gpt-4o-mini`. Examples: `deepseek-chat`, `moonshot-v1-8k`. |
| `SENTRY_DSN` | Optional | Error tracking. |

`PORT` is set by Railway automatically. The start script uses `${PORT:-3000}`.

## 4. Logs

### Live tail (CLI)
```bash
railway logs --service mixology-studio
```

### Web
- Service page → **Logs** tab
- Search by keyword (e.g. `error`, `/api/match`)
- Time-range filter on the right

### What to look for
- `[/api/match] error` — match engine failed
- `⨯ Failed to compile` — build error (will also fail the deploy)
- `EADDRINUSE` — port conflict (shouldn't happen on Railway, indicates misconfiguration)

## 5. Rollback

### Quick rollback (Railway UI)
1. Open the service → **Deployments** tab
2. Find a previous successful deployment
3. Click **⋯** → **Redeploy** (rebuilds from that commit)
4. Or **Instant Rollback** (if available on your plan) — switches traffic without rebuild

### Manual rollback via git
```bash
# Find the last good commit
git log --oneline -20
# Revert the last deploy
git revert HEAD
git push origin main
# Railway will auto-deploy the revert
```

### Nuclear option — point to a specific commit
In `railway.json` you can pin a specific commit, but the easier way is to use Railway's "Deploy from a specific commit" UI in the service settings.

## 6. Health & monitoring

- **Railway health check:** every 10s, hits `/api/health`. Returns 200 if the service is up.
- **Build checks:** `npm run type-check` and `npm run lint` should pass before merging. CI can be added with GitHub Actions.
- **Uptime monitoring:** point any uptime monitor (UptimeRobot, BetterStack, etc.) at `https://<app>.up.railway.app/api/health`.

## 7. Cost

- Railway free tier: $5/month credit, then pay-as-you-go
- v0.1 (static JSON, no DB, single Node service): typically $1-3/month
- Adding Postgres: ~$5-10/month for the plugin
- Adding LLM API calls (Innovation mode):
  - **gpt-4o-mini** (default): ~$0.15 / 1M input + $0.60 / 1M output tokens
  - Per call: ~500 input + 800 output = **~$0.0006** (less than 1 US cent)
  - 1,000 calls/month ≈ **$0.60**; 10,000 calls/month ≈ **$6**
  - With DeepSeek: typically 5-10× cheaper

## 8. Common issues

### Build fails with "Cannot find module"
- Run `npm install` locally — verify `package-lock.json` is committed
- Check that all imports use the `@/` path alias and `tsconfig.json` is committed

### Runtime error: "Cannot read property of undefined"
- Check the dev server locally first: `npm run dev`
- Inspect the data files: `node verify-data.cjs` (B2 left this in the repo)

### 502 Bad Gateway
- Check Railway logs for crashes
- Verify `start` script: `npm start` (uses `${PORT:-3000}`)
- Verify the health check endpoint: `curl /api/health`

### Innovation mode returns 503 / "AI 模式待启用"
- `OPENAI_API_KEY` is not set in Railway env vars
- Add it under **Variables** tab, then redeploy (or wait for next push to trigger a rebuild)
- The UI shows this gracefully without crashing the rest of the app

### Innovation mode returns 429 / "Rate limited"
- You hit the LLM provider's rate limit (free tier limits are tight)
- Wait a minute, or upgrade your plan / switch to a higher-tier model

### Innovation mode returns 504 / "Timeout"
- LLM took > 25s. Either the model is slow or the network is bad
- Click "🔄 换一杯" to try again

### Drag-and-drop doesn't work on touch devices
- `PointerSensor` should handle it. If not, try `TouchSensor` from `@dnd-kit/core` with a long-press activation constraint.

## 9. Going beyond v0.1

When you're ready to add user accounts (v1.1):

1. Add a Postgres plugin in Railway
2. Set `DATABASE_URL` env var
3. Install: `npm install @auth/core bcryptjs`
4. Wire up Prisma: `npx prisma migrate dev --name init`
5. Add the schema from `prisma/schema.prisma` to the live DB
6. Implement auth UI on the home page

The Prisma schema is already in the repo as a forward-looking artifact.
