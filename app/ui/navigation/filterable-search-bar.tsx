import {AdjustmentsHorizontalIcon} from "@heroicons/react/24/outline";
import SearchBar from "@/app/ui/navigation/search-bar";

export default function FilterableSearchBar({className} : {className: string}) {
    return(
        <div className={`flex flex-row w-full items-center ${className}`}>
            <SearchBar />
            <AdjustmentsHorizontalIcon className="size-12"/>
        </div>
    )
}
