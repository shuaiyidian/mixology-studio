# Mixology Studio · 调酒配方推荐

Drag ingredients into the bar → match engine finds classic cocktail recipes + techniques.

**Status:** v0.1.0 MVP — 90 ingredients, 62 classic recipes, 13 techniques. Bilingual (zh primary / en).

## What's inside

- **Home (`/`)** — drag-and-drop ingredient palette + drop zone + ranked recipe results
- **Recipe detail (`/recipe/[slug]`)** — full recipe with story, balance profile, ingredients, steps, techniques
- **API** — `POST /api/match` (recipe matching), `GET /api/health` (Railway health check)

## Tech stack

- **Next.js 16** (App Router, RSC) + **TypeScript 5** + **React 19**
- **Tailwind CSS 4** (CSS-first `@theme` config)
- **`@dnd-kit/core`** for accessible drag-and-drop
- **Zod** for API input validation
- **Static JSON data** (`data/*.json`) for 90 ingredients / 62 recipes / 13 techniques — no DB needed for v0.1
- **`output: 'standalone'`** for lean deploy artifacts

## Local development

```bash
# Requires Node 20+. npm registry mirror is recommended for users in China:
# npm config set registry https://registry.npmmirror.com

npm install
npm run dev          # http://localhost:3000
npm run type-check   # tsc --noEmit
npm run lint
```

The data layer reads from `data/*.json` and `lib/data/*` accessors. No database setup is required for v0.1.

### Try the matcher

```bash
curl -X POST http://localhost:3000/api/match \
  -H "Content-Type: application/json" \
  -d '{"ingredientIds":["ing-gin","ing-campari","ing-sweet-vermouth"]}'
# → Negroni top, score 62, 75% coverage
```

## Project structure

```
app/
  page.tsx                     # home (server) — fetches ingredients, renders workspace
  recipe/[slug]/page.tsx       # recipe detail (server)
  recipe/[slug]/not-found.tsx  # 404
  api/match/route.ts           # POST /api/match
  api/health/route.ts          # GET /api/health
  layout.tsx, globals.css      # shell + theme
components/
  HomeWorkspace.tsx            # client: drag-drop, /api/match, state
  IngredientPalette, DropZone, RecipeCard, RecipeResults, ...
  RecipeHero, RecipeIngredients, RecipeSteps, TechniqueCard
  BalanceIndicator             # the 甘酸苦烈 profile viz
data/
  ingredients.json             # 90 ingredients
  recipes.json                 # 62 classic recipes
  techniques.json              # 13 techniques
  recipe-{ingredients,steps,techniques}.json
  SOURCES.md                   # where the recipes come from
lib/
  types.ts                     # shared TS contracts
  data/{ingredients,recipes,techniques}.ts   # typed accessors
  matching/{match,score,reason}.ts           # the matching engine
  balance.ts                   # balance profile computation (B6)
  ui/cn.ts                     # className helper
prisma/
  schema.prisma                # data model (v1.1 prep — not wired in v0.1)
```

## Deploy to Railway

The project is pre-configured for Railway (`railway.json`):

1. Push the repo to GitHub
2. In Railway: **New Project → Deploy from GitHub → pick this repo**
3. Railway auto-detects Next.js and runs `npm run build` + `npm start`
4. The `railway.json` sets the health check path to `/api/health` and restart policy to ON_FAILURE
5. Optional: add a Postgres plugin and set `DATABASE_URL` (only needed for v1.1 user accounts)

The deploy URL will be like `https://<app-name>.up.railway.app`. The `/api/health` endpoint is used by Railway's health checks.

### Rollback

Railway keeps a deploy history. To roll back:
- Open the service → **Deployments** tab
- Click any previous successful deployment → **Redeploy**

This re-builds from that commit. For instant rollback without rebuild, use the **Instant Rollback** button if available on your plan.

### Logs

- **Live tail:** `railway logs --service <service-name>` in the Railway CLI
- **Dashboard:** service page → **Logs** tab, supports search and time-range filters

## Adding a new recipe

1. Edit `data/recipes.json` — add a new entry with a unique `id` and `slug`
2. Edit `data/recipe-ingredients.json` — add the ingredient links
3. Edit `data/recipe-steps.json` — add the steps
4. Edit `data/recipe-techniques.json` — link techniques
5. Restart dev server — no migration needed

## v0.1.1 / v1.1 roadmap

- LLM-powered "innovative cocktail" generator (toggle on home page)
- User accounts + favorites (Prisma + Postgres)
- URL state for shareable recipes (`?i=ing-xxx,ing-yyy`)
- Cocktail video tutorials embedding
- Recipe difficulty filtering on home page

## License

Personal project.
