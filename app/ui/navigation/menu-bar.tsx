"use client";

import {HeartIcon as FilledSaveIcon} from "@heroicons/react/24/solid";
import {HeartIcon as EmptySaveIcon, MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import {ReactNode, useEffect} from "react";
import { usePathname } from 'next/navigation'

export function MenuBarHorizontal() {
    const pathname = usePathname()
    useEffect(() => {
        console.log(pathname);
    }, [pathname]);
    const iconSize = "size-8";
    const icons : {icon: ReactNode, page: string}[] = [
        {
            icon: pathname.startsWith("/saved") ? <FilledSaveIcon className={ iconSize } /> : <EmptySaveIcon className={ iconSize } />,
            page: "saved",
        },
        {
            icon: pathname.startsWith("/browse") ? <MagnifyingGlassIcon className={ `${iconSize} stroke-[3]` } /> : <MagnifyingGlassIcon className={ `${iconSize} stroke-1` } />,
            page: "browse",
        },
        // {
        //     icon: <BookOpenIcon className={ iconSize } />,
        //     page: "menu",
        // },
        // {
        //     icon: <UserCircleIcon className={ iconSize } />,
        //     page: "user",
        // }
    ]

    return (
        <div className="flex flex-row justify-evenly w-full p-2 bg-blackboard-500">
            { icons.map((element) => IconLink(element)) }
        </div>
    )
}

function IconLink({icon, page} : {icon: ReactNode, page: string}) {
    return(
        <Link href={`/${page}`} key={page}>
            {icon}
        </Link>
    )
}