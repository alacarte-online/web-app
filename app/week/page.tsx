"use client"

import WeekPlanProvider from "@/app/week/weekViewContext";
import WeekView from "@/app/week/weekView";

export default function MenuPage()
{
    return (
        <WeekPlanProvider>
            <div className="flex flex-col items-center flex-grow">
                <WeekView />
            </div>
        </WeekPlanProvider>
    );
}