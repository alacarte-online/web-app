import {usePathname} from "next/navigation";
import {ReactNode} from "react";
import {HeartIcon as FilledSaveIcon} from "@heroicons/react/24/solid";
import {HeartIcon as EmptySaveIcon, MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import Link from "next/link";

class IconAndHeader {
    icon: ReactNode;
    header: string;
    link: string;

    constructor(icon: ReactNode, header: string, link: string) {
        this.icon = icon;
        this.header = header;
        this.link = link;
    }
}

export function MenuBarVertical() {
    const pathname = usePathname()
    const iconSize = "size-8";

    const browseIcon = pathname.startsWith("/browse") ?
        <MagnifyingGlassIcon className={`${iconSize} stroke-[3]`} /> :
        <MagnifyingGlassIcon className={`${iconSize} stroke-1`} />;
    const heartIcon = pathname.startsWith("/saved") ?
        <FilledSaveIcon className={iconSize} /> :
        <EmptySaveIcon className={iconSize} />;

    const menuEntries: IconAndHeader[] = [
        new IconAndHeader(browseIcon, "Browse", "/browse"),
        new IconAndHeader(heartIcon, "Saved", "/saved")
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
        <div className="flex flex-col h-full p-2 bg-blackboard-500">
            {menuEntries.map((element) => IconHeaderLink(element))}
        </div>
    )
}

function IconHeaderLink(iconAndHeader: IconAndHeader) {
    const pathname = usePathname()
    const isSelected = pathname.startsWith(iconAndHeader.link)
    return(
        <Link href={iconAndHeader.link} key={iconAndHeader.link}>
            <div className={`flex p-2 mr-20 gap-4 w-full items-center ${isSelected ? 'bg-blackboard-400 rounded-lg' : ''}`}>
                {iconAndHeader.icon}
                {iconAndHeader.header}
            </div>
        </Link>
    )
}