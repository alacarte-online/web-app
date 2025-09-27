"use client"

import React, {
    ActionDispatch,
    Context,
    createContext,
    Dispatch,
    ReactNode,
    useContext, useEffect,
    useReducer
} from "react";
import {CurrentWeekMealPlanner, IWeeklyMealPlanner} from "@/app/lib/mealPlanning/weeklyMealPlanner";
import fetchRecipe from "@/app/week/mealPlanFetch";
import {AllDays, Day} from "@/app/lib/mealPlanning/mealPlanning";
import { MealPlanContext } from "../lib/mealPlanning/mealPlanContext";

export type MealData = {
    id: number;
    recipe_id: number;
    status: 'unloaded' | 'fetching' | 'loaded' | 'failed';
    recipe_name: string | null;
    user_name: string | null;
    image_uri: string | null;
}

export type DayMealData = {
    day: Day;
    meals: MealData[];
}

export type WeekData = {
    days: DayMealData[],
}

export type MealAction =
    | {type: 'move', mealId: number, to: Day}
    | {type: 'copy', mealId: number, to: Day}
    | {type: 'remove', mealId: number}
    | {type: 'loaded', meal: MealData}
    | {type: 'moveDay', day: Day, to: Day}
    | {type: 'copyDay', day: Day, to: Day}
    | {type: 'swapDay', day: Day, to: Day}
    | {type: 'clearDay', day: Day}
    | {type: 'clearAllDays'}

const defaultWeekData: WeekData = {days: []}
const defaultWeekDispatch: Dispatch<MealAction> = () => {}
const WeekViewContext: Context<WeekData> = createContext(defaultWeekData);
const WeekDispatchContext: Context<ActionDispatch<[action: MealAction]>> = createContext(defaultWeekDispatch);

export default function WeekPlanProvider({children}: {children: ReactNode}) {
    const [weekData, dispatch] = useReducer(weekDataReducer, getUnloadedWeekData(CurrentWeekMealPlanner));

    useEffect(() => {
        weekData.days
            .flatMap(day => day.meals)
            .map(meal => {
                if(meal.status == 'unloaded') {
                    console.log("trigger")
                    meal.status = 'fetching';
                    fetchMeal(meal).then(meal => dispatch({type: 'loaded', meal: meal}))
                }
            })
    }, [weekData]);

    return (
        <MealPlanContext>
            <WeekViewContext value={weekData}>
                <WeekDispatchContext value={dispatch}>
                    {children}
                </WeekDispatchContext>
            </WeekViewContext>
        </MealPlanContext>
    )
}

export function useWeek() {
    return useContext(WeekViewContext);
}

export function useWeekDispatch() {
    return useContext(WeekDispatchContext);
}


function getUnloadedWeekData(weekPlanner: IWeeklyMealPlanner) : WeekData {
    const weekPlan = weekPlanner.getWeekPlan();
    const dayDataArray: DayMealData[] = Array(7).fill(undefined);
    for (let day = 0; day < 7; day++)
    {
        const dayPlan = weekPlan.days[day];
        dayDataArray[day] = {
            day: day,
            meals: dayPlan.meals.map(meal => mealDataFromRecipeId(meal.recipe_id))
        };
    }
    return {days: dayDataArray};
}

let mealItemId = 0;
function mealDataFromRecipeId(recipeId: number): MealData {
    return {
        id: ++mealItemId,
        recipe_id: recipeId,
        status: 'unloaded',
        recipe_name: null,
        user_name: null,
        image_uri: null
    }
}

async function fetchMeal(meal: MealData) : Promise<MealData> {
    if (meal.status === 'loaded') {
        return meal;
    }

    const mealDetails = await fetchRecipe(meal.recipe_id);

    if(mealDetails == null) {
        meal.status = 'failed';
        return meal;
    }

    meal.recipe_name = mealDetails.recipe_name;
    meal.user_name = mealDetails.user_name;
    meal.image_uri = mealDetails.image_uri;
    meal.status = 'loaded';
    return meal;
}

function weekDataHasRecipeForDay(weekData: WeekData, recipe: number, day: Day) {
    return weekData.days[day].meals.some(meal => meal.recipe_id == recipe);
}

function weekDataReducer(weekData: WeekData, action: MealAction) {
    switch (action.type) {
        case 'remove': {
            const mealToRemove = action.mealId;
            const dayAndIndex = findDayAndIndexOfMealId(mealToRemove);
            if(!dayAndIndex) {
                console.log(`Could not find day containing meal ${mealToRemove}`);
                break;
            }
            const newData = structuredClone(weekData);
            newData.days[dayAndIndex.day].meals.splice(dayAndIndex.index, 1);
            return newData;
        }
        case 'move': {
            const mealToMove = action.mealId;
            const dayToMoveTo = action.to;
            const dayAndIndex = findDayAndIndexOfMealId(mealToMove);
            if(!dayAndIndex) {
                console.log(`Could not find day containing meal ${mealToMove}`);
                break;
            }

            const mealData = weekData.days[dayAndIndex.day].meals[dayAndIndex.index];
            if(weekDataHasRecipeForDay(weekData, mealData.recipe_id, dayToMoveTo)) {
                console.log(`Cannot add meal ${mealData.id} to day ${dayToMoveTo} - recipe ${mealData.recipe_id} has already been added`);
                break;
            }

            const newData = structuredClone(weekData);
            newData.days[dayAndIndex.day].meals.splice(dayAndIndex.index, 1);
            newData.days[dayToMoveTo].meals.push(mealData)
            return newData;
        }
        case 'copy': {
            const mealToCopy = action.mealId;
            const dayToCopyTo = action.to;
            const dayAndIndex = findDayAndIndexOfMealId(mealToCopy);
            if(!dayAndIndex) {
                console.log(`Could not find day containing meal ${mealToCopy}`);
                break;
            }

            const mealData = weekData.days[dayAndIndex.day].meals[dayAndIndex.index];
            const newMealData = structuredClone(mealData);
            newMealData.id = ++mealItemId;
            if(weekDataHasRecipeForDay(weekData, mealData.recipe_id, dayToCopyTo)) {
                console.log(`Cannot add meal ${newMealData.id} to day ${dayToCopyTo} - recipe ${mealData.recipe_id} has already been added`);
                break;
            }

            const newData = structuredClone(weekData);
            newData.days[dayToCopyTo].meals.push(newMealData)
            return newData;
        }
        case 'loaded': {
            const dayAndIndex = findDayAndIndexOfMealId(action.meal.id);
            if(!dayAndIndex) {
                console.log(`Could not find day containing meal ${action.meal.id}`);
                break;
            }

            const newData = structuredClone(weekData);
            newData.days[dayAndIndex.day].meals[dayAndIndex.index] = action.meal;
            return newData;
        }
        case 'moveDay': {
            const copiedWeekData = structuredClone(weekData);
            const day = action.day;
            const to = action.to;
            copiedWeekData.days[to].meals = [...copiedWeekData.days[day].meals];
            copiedWeekData.days[day].meals = [];
            return copiedWeekData;
        }
        case 'copyDay': {
            const copiedWeekData = structuredClone(weekData);
            const day = action.day;
            const to = action.to;
            copiedWeekData.days[to].meals = [...copiedWeekData.days[day].meals];
            return copiedWeekData;
        }
        case 'swapDay': {
            const copiedWeekData = structuredClone(weekData);
            const day = action.day;
            const to = action.to;
            const temp = [...copiedWeekData.days[day].meals];
            copiedWeekData.days[day].meals = [...copiedWeekData.days[to].meals];
            copiedWeekData.days[to].meals = temp;
            return copiedWeekData;
        }
        case 'clearDay': {
            const day = action.day;
            const copiedWeekData = structuredClone(weekData);
            copiedWeekData.days[day].meals = [];
            return copiedWeekData;
        }
        case 'clearAllDays': {
            const copiedWeekData = structuredClone(weekData);
            for(const day of AllDays()) {
                copiedWeekData.days[day].meals = [];
            }
            return copiedWeekData;
        }
    }

    return structuredClone(weekData);

    function findDayAndIndexOfMealId(mealId: number) : {day: number, index: number} | undefined {
        for(let day = Day.Monday; day <= Day.Sunday; day++) {
            const dayData = weekData.days[day];
            for(let mealIndex = dayData.meals.length - 1; mealIndex >= 0; mealIndex--) {
                const mealData = dayData.meals[mealIndex];
                if(mealData.id == mealId) {
                    return {day: day, index: mealIndex}
                }
            }
        }
    }
}