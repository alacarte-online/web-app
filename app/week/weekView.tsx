import {useWeek} from "@/app/week/weekViewContext";
import DayView from "@/app/week/dayView";
import {SavedRecipesContextProvider} from "@/app/lib/recipeSaving/recipeSavingContext";

export default function WeekView() {
    const weekData = useWeek();
    return (
        <div className="flex flex-col w-full max-w-[36rem] gap-2">
            <SavedRecipesContextProvider>
                {weekData.days.map(dayData => <DayView dayData={dayData} key={dayData.day} />)}
            </SavedRecipesContextProvider>
        </div>
    )
}