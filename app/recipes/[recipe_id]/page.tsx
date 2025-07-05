import {RecipeDetails} from "@/app/lib/recipeDetails";
import {LargeRecipeImage} from "@/app/ui/content/recipe-image";
import {Ingredient} from "@/app/lib/ingredient";
import DOMPurify from "isomorphic-dompurify";

import showdown from "showdown";

export const dynamic = 'force-dynamic'

export default async function RecipePage({ params }: { params: Promise<{ recipe_id: string }>}) {
    const { recipe_id } = await params
    const res = await fetch('https://api.alacarteonline.co.uk/recipe/' + recipe_id);
    const recipe_details = await res.json()
    return <RecipePageInternal recipe_details={recipe_details} />;
}

function RecipePageInternal({recipe_details}: { recipe_details: RecipeDetails }) {
    return (
        <div className="flex flex-col max-w-screen-md m-auto gap-4">
            <RecipeOverview recipe_details={recipe_details}/>
            <RecipeBody recipe_details={recipe_details}/>
        </div>
    )
}

function RecipeOverview({recipe_details}: { recipe_details: RecipeDetails }) {
    return (
        <div className="flex flex-col gap-1">
            <h2 className="text-2xl">{recipe_details.recipe_name}</h2>
            <p>{recipe_details.brief_description}</p>
            <p>{recipe_details.user_name}</p>
            <RecipeThumbnail recipe_details={recipe_details}/>
        </div>
    )
}

function RecipeThumbnail({recipe_details}: { recipe_details: RecipeDetails }) {
    return (
        <LargeRecipeImage recipe_name={recipe_details.recipe_name} image_uri={recipe_details.image_uri} />
    )
}

function RecipeBody({recipe_details}: { recipe_details: RecipeDetails }) {
    return (
        <div className="flex flex-col gap-4">
            <IngredientsList ingredients={recipe_details.ingredients} />
            <Method recipe_details={recipe_details}/>
        </div>
    )
}

function IngredientsList({ingredients}: { ingredients: Ingredient[] }) {
    return (
        <div className="flex flex-col w-full">
            <h3 className="text-lg">Ingredients</h3>
            {ingredients.map(ingredient => <IngredientEntry key={ingredient.ingredient_id} ingredient={ingredient} />)}
        </div>
    )
}

function IngredientEntry({ingredient} : {ingredient: Ingredient}) {
    return (
        <div className="flex flex-row gap-2">
            <div>{ingredient.amount}</div>
            <div>{ingredient.ingredient_name}</div>
        </div>
    )
}

function Method({recipe_details}: { recipe_details: RecipeDetails }) {
    const converter = new showdown.Converter();
    const text      = recipe_details.method;
    const html      = converter.makeHtml(text);

    return (
        <div className="flex flex-col w-full">
            <h3 className="text-lg">Method</h3>
            <div className="content" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(html)}} />
        </div>
    )
}
