import { MagnifyingGlassIcon, HeartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import {ReactNode} from "react";

export function MenuBarHorizontal() {

    const iconSize = "size-8";
    const icons : {icon: ReactNode, page: string}[] = [
        {
            icon: <HeartIcon className={ iconSize } />,
            page: "saved",
        },
        {
            icon: <MagnifyingGlassIcon className={ iconSize } />,
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