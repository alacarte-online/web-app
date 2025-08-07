import {RecipeCardData, RecipeCardLarge} from "@/app/ui/content/recipe-card";
import {RecipeOverview} from "@/app/lib/recipeOverview";

export const dynamic = 'force-dynamic'

export default async function BrowseRecipesPage() {
    const res = await fetch('https://api.alacarteonline.co.uk/recipe')
    const recipeOverviews: RecipeOverview[] = await res.json()
    const recipeData = recipeOverviews.map((recipe: RecipeOverview): RecipeCardData => { return {recipe: recipe, byCurrentUser: false } });
    return (
        <div className="flex flex-col gap-2 bg-blackboard-500">
            <Header />
            <RecipeList recipes={recipeData} />
        </div>
    );
}

function Header() {
    return(
        <div className="flex flex-row items-center w-full md:hidden">
            <h2 className="text-2xl w-full">Browse recipes</h2>
        </div>
    )
}

function RecipeList({recipes} : {recipes: RecipeCardData[]}) {
    return (
        <div className="flex flex-col gap-2 grow md:grid md:grid-cols-2 lg:grid-cols-3">
            { recipes.map((recipe, count) => <RecipeCardLarge data={recipe} key={count} /> )}
        </div>
    )
}
