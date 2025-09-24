import {RecipeOverview} from "@/app/lib/recipeOverview";
import MobileHeader, {MobileHeaderHeightOffset} from "@/app/ui/navigation/mobileHeader";
import React from "react";
import {RecipeList} from "@/app/browse/recipeList";

export const dynamic = 'force-dynamic'

export default async function BrowseRecipesPage() {
    const res = await fetch('https://api.alacarteonline.co.uk/recipe')
    const recipeOverviews: RecipeOverview[] = await res.json()
    return (
        <div className="flex flex-col gap-2">
            <Header />
            <RecipeList recipes={recipeOverviews} />
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