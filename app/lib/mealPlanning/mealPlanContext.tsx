"use client"

import {Day, WeekPlan} from "@/app/lib/mealPlanning/mealPlanning";
import {createContext, Dispatch, ReactNode, useContext, useReducer} from "react";
import {CurrentWeekMealPlanner} from "@/app/lib/mealPlanning/weeklyMealPlanner";

export type MealPlanAction =
    | {type: 'add', recipe: number, day: Day}
    | {type: 'remove', recipe: number, day: Day}

const planner = CurrentWeekMealPlanner;
const defaultPlanData: WeekPlan = {days: []}
const defaultDispatch: Dispatch<MealPlanAction> = () => {}
const PlanContext = createContext(defaultPlanData);
const DispatchContext = createContext(defaultDispatch);

export function MealPlanContext({children}: {children: ReactNode}) {
    const [mealPlan, dispatch] = useReducer(planReducer, planner.getWeekPlan());

    return (
        <PlanContext value={mealPlan}>
            <DispatchContext value={dispatch}>
                {children}
            </DispatchContext>
        </PlanContext>
    )
}

export function usePlan() {
    return useContext(PlanContext);
}

export function useDispatch() {
 return useContext(DispatchContext);
}

function planReducer(plan: WeekPlan, action: MealPlanAction) {
    switch (action.type) {
        case 'add': {
            planner.addRecipeForDay(action.recipe, action.day);
            break;
        }
        case 'remove': {
            planner.removeRecipeFromDay(action.recipe, action.day);
            break;
        }
    }
    return {days: plan.days}
}