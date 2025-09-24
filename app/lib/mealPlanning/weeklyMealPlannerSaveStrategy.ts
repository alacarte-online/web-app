import Cookie from "js-cookie";
import {WeekPlan} from "./mealPlanning";

export interface IWeeklyMealPlanSaveStrategy{
    savePlan(weekPlan: WeekPlan) : void;
    loadPlan() : WeekPlan;
}

export class WeeklyMealPlannerCookieSaveStrategy implements IWeeklyMealPlanSaveStrategy {
    cookie_name: string;

    constructor(cookie_name: string) {
        this.cookie_name = cookie_name;
    }

    savePlan(plan: WeekPlan): void {
        const json = JSON.stringify(plan);
        Cookie.set(this.cookie_name, json);
    }

    loadPlan(): WeekPlan {
        const savedRecipeArray = Cookie.get(this.cookie_name);
        if (savedRecipeArray !== undefined) {
            return JSON.parse(savedRecipeArray);
        }
        return {days: Array(7).fill(undefined).map(() => {return {meals: []}})};
    }

}