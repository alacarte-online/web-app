"use client"

import Image from "next/image";
import {useState} from "react";
import {apiClient} from "@/app/api/client";

export function LargeRecipeImage({recipe_name, image_uri}: { recipe_name: string, image_uri: string }) {
    const fallbackSrc = "/images/error.png"
    const [imageError, setImageError] = useState(false);

    return(
        <Image
            src={imageError ? fallbackSrc : `${apiClient.defaults.baseURL}/image/${image_uri}` }
            alt={`Image of ${recipe_name}`}
            className={`${imageError ? `object-contain` : `object-cover`} object-center aspect-recipe-card-large`}
            height={600} // TODO optimize with sizes
            width={600}
            onError={() => setImageError(true)}
        />
    )
}

export function SmallRecipeImage({uri, alt}: { uri: string, alt: string }) {
    const fallbackSrc = "/images/error.png"
    const [imageError, setImageError] = useState(false);

    return(
        <Image
            src={imageError ? fallbackSrc : `${apiClient.defaults.baseURL}/image/${uri}` }
            alt={`${alt}`}
            className={`object-center object-cover w-[36px] h-[36px]`}
            height={36}
            width={36}
            onError={() => setImageError(true)}
        />
    )
}
