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
import {apiClient} from "@/app/api/client";

export const dynamic = 'force-dynamic'

type RecipeResponse = RecipeDetails;

export default async function RecipePage({ params }: { params: Promise<{ recipe_id: string }>}) {
    try {
        const { recipe_id } = await params
        const recipe = await apiClient.get<RecipeResponse>(`/recipe/${recipe_id}`).then((response) => response.data);
        return <RecipePageInternal recipe_details={recipe} />;
    } catch (error) {
        console.error('Error getting recipe - ', error);
        return <RecipeNotFound />
    }
}

function RecipeNotFound() {
    return (
        <div>
            <Typography>Recipe not found</Typography>
        </div>
    )
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

function IngredientsList({ingredients}: { ingredients: Ingredient[] | null }) {
    return (
        <div className="flex flex-col w-full">
            <Typography variant="h6" component="div" sx={{color: `primary.main`}}>Ingredients</Typography>
            <IngredientsBody ingredients={ingredients} />
        </div>
    )
}

function IngredientsBody({ingredients}: { ingredients: Ingredient[] | null }) {
    if(ingredients == null)
        return (<Typography>No ingredients provided</Typography>);
    return (ingredients.map(ingredient => <IngredientEntry key={ingredient.ingredient_id} ingredient={ingredient} />));
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
    return (
        <div className="flex flex-col w-full">
            <Typography variant="h6" component="div" sx={{color: `primary.main`}}>Method</Typography>
            <MethodBody method={recipe_details.method} />
        </div>
    )
}

function MethodBody({method} : {method: string | null}) {
    if (method == null)
        return (<Typography>No method provided</Typography>);
    const converter = new showdown.Converter();
    const html      = converter.makeHtml(method);
    return (<Typography sx={{color: `primary.main`}} component="div" className="content" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(html)}} />);
}