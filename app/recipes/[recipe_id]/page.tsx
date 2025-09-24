import {RecipeDetails} from "@/app/lib/recipeDetails";
import {LargeRecipeImage} from "@/app/ui/content/recipe-image";
import {Ingredient} from "@/app/lib/ingredient";
import DOMPurify from "isomorphic-dompurify";

import showdown from "showdown";
import Typography from "@mui/material/Typography";
import {SaveButton} from "@/app/ui/buttons/saveButton";
import {SavedRecipesContextProvider} from "@/app/lib/recipeSaving/recipeSavingContext";
import RecipeCardOptions from "@/app/ui/content/recipeCardOptions";
import {MealPlanContext} from "@/app/lib/mealPlanning/mealPlanContext";

export const dynamic = 'force-dynamic'

export default async function RecipePage({ params }: { params: Promise<{ recipe_id: string }>}) {
    const { recipe_id } = await params
    const res = await fetch('https://api.alacarteonline.co.uk/recipe/' + recipe_id);
    const recipe_details = await res.json()
    return <RecipePageInternal recipe_details={recipe_details} />;
}

function RecipePageInternal({recipe_details}: { recipe_details: RecipeDetails }) {
    return (
        <SavedRecipesContextProvider>
            <MealPlanContext>
                <div className="flex flex-col max-w-screen-md m-auto gap-4">
                    <RecipeOverview recipe_details={recipe_details}/>
                    <RecipeBody recipe_details={recipe_details}/>
                </div>
            </MealPlanContext>
        </SavedRecipesContextProvider>
    )
}

function RecipeOverview({recipe_details}: { recipe_details: RecipeDetails }) {
    return (
        <div className="flex flex-col gap-1">
        <Typography variant="h4" component="div" sx={{color: `primary.main`}}>{recipe_details.recipe_name}</Typography>
            <Typography component="div" sx={{color: `primary.main`}}>{recipe_details.brief_description}</Typography>
            <Typography component="div" sx={{color: `primary.main`}}>{recipe_details.user_name}</Typography>
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
            <div className="flex flex-row gap-4">
                <SaveButton recipeId={recipe_details.recipe_id} />
                <RecipeCardOptions recipe={recipe_details.recipe_id} optionsProps={{enableAddToPlan: true}} />
            </div>
            <IngredientsList ingredients={recipe_details.ingredients} />
            <Method recipe_details={recipe_details}/>
        </div>
    )
}

function IngredientsList({ingredients}: { ingredients: Ingredient[] }) {
    return (
        <div className="flex flex-col w-full">
            <Typography variant="h6" component="div" sx={{color: `primary.main`}}>Ingredients</Typography>
            {ingredients.map(ingredient => <IngredientEntry key={ingredient.ingredient_id} ingredient={ingredient} />)}
        </div>
    )
}

function IngredientEntry({ingredient} : {ingredient: Ingredient}) {
    return (
        <div className="flex flex-row gap-2">
            <Typography component="div" sx={{color: `primary.main`}}>{ingredient.amount}</Typography>
            <Typography component="div" sx={{color: `primary.main`}}>{ingredient.ingredient_name}</Typography>
        </div>
    )
}

function Method({recipe_details}: { recipe_details: RecipeDetails }) {
    const converter = new showdown.Converter();
    const text      = recipe_details.method;
    const html      = converter.makeHtml(text);

    return (
        <div className="flex flex-col w-full">
            <Typography variant="h6" component="div" sx={{color: `primary.main`}}>Method</Typography>
            <Typography sx={{color: `primary.main`}} component="div" className="content" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(html)}} />
        </div>
    )
}