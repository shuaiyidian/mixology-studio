// Home page — server component. Fetches all ingredients and hands them to the
// client workspace, which manages DnD state and /api/match calls.

import { HomeWorkspace } from "@/components/HomeWorkspace";
import { getAllIngredients } from "@/lib/data/ingredients";

export default function Home() {
  const ingredients = getAllIngredients();
  return <HomeWorkspace ingredients={ingredients} />;
}
