import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar({className} : {className?: string}) {
    return(
        <form className={`flex flex-row w-full bg-blackboard-400 p-1 rounded-lg ${className}`}>
            <MagnifyingGlassIcon className="size-8"/>
            <input className="bg-transparent w-full" type="search" placeholder="Search..." />
        </form>
    )
}
