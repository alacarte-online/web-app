import MobileHeader, {MobileHeaderHeightOffset} from "@/app/ui/navigation/mobileHeader";
import React from "react";
import {RecipeList} from "@/app/browse/recipeList";
import {RecipeOverview} from "@/app/lib/recipeOverview";
import {apiClient} from "@/app/api/client";

export const dynamic = 'force-dynamic'

type RecipesResponse = RecipeOverview[];

export default async function BrowseRecipesPage() {
    let recipes: RecipesResponse = [];
    try {
        recipes = await apiClient.get<RecipesResponse>('/recipe').then((response) => response.data);
    } catch (error) {
        console.error('Error getting recipes - ', error);
    }

    return (
        <div className="flex flex-col gap-2">
            <Header />
            <RecipeList recipes={recipes} />
        </div>
    );
}

function Header() {
    return (
        <div className="md:hidden">
            <MobileHeader title="Browse recipes"/>
            <div className={`${MobileHeaderHeightOffset}`} />
        </div>
    )
}