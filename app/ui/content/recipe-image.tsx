"use client"

import Image from "next/image";
import {useState} from "react";
import {RecipeOverview} from "@/app/lib/recipeOverview";

export function LargeRecipeImage({recipe_name, image_uri}: { recipe_name: string, image_uri: string }) {
    const fallbackSrc = "/images/error.png"
    const [imageError, setImageError] = useState(false);

    return(
        <Image
            src={imageError ? fallbackSrc : `https://api.alacarteonline.co.uk/image/${image_uri}` }
            alt={`Image of ${recipe_name}`}
            className={`${imageError ? `object-contain` : `object-cover`} object-center aspect-recipe-card-large`}
            height={600} // TODO optimize with sizes
            width={600}
            onError={() => setImageError(true)}
        />
    )
}

export function SmallRecipeImage({recipe}: { recipe: RecipeOverview }) {
    const fallbackSrc = "/images/error.png"
    const [imageError, setImageError] = useState(false);

    return(
        <Image
            src={imageError ? fallbackSrc : `https://api.alacarteonline.co.uk/image/${recipe.image_uri}` }
            alt={`Image of ${recipe.recipe_name}`}
            className={`${imageError ? `object-contain` : `object-cover`} object-center aspect-recipe-card-large`}
            height={50} // TODO optimize with sizes
            width={50}
            onError={() => setImageError(true)}
        />
    )
}
