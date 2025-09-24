import {
    IWeeklyMealPlanSaveStrategy,
    WeeklyMealPlannerCookieSaveStrategy
} from "./weeklyMealPlannerSaveStrategy";
import {Day, IsRecipeAddedForDay, WeekPlan} from "./mealPlanning";

export interface IWeeklyMealPlanner {
    getWeekPlan() : WeekPlan;
    isRecipeAddedForDay(recipe_id: number, day: Day) : boolean;
    addRecipeForDay(recipe_id: number, day: Day) : void;
    removeRecipeFromDay(recipe_id: number, day: Day) : void;
    clear(): void;
}

class WeeklyMealPlannerInternal implements IWeeklyMealPlanner {
    weekPlan: WeekPlan;
    saveStrategy: IWeeklyMealPlanSaveStrategy;

    constructor(saveStrategy: IWeeklyMealPlanSaveStrategy) {
        this.saveStrategy = saveStrategy;
        this.weekPlan = saveStrategy.loadPlan();
    }

    getWeekPlan() : WeekPlan {
        return this.weekPlan;
    }

    isRecipeAddedForDay(recipe_id: number, day: Day): boolean {
        return IsRecipeAddedForDay(this.weekPlan, recipe_id, day);
    }

    addRecipeForDay(recipe_id: number, day: Day): void {
        const dayPlan = this.weekPlan.days[day];
        if (dayPlan == undefined) {
            return;
        }
        if (dayPlan.meals.some(meal => meal.recipe_id === recipe_id)) {
            return;
        }
        dayPlan.meals.push({recipe_id: recipe_id})
        this.saveStrategy.savePlan(this.weekPlan);
    }

    removeRecipeFromDay(recipe_id: number, day: Day): void {
        const dayPlan = this.weekPlan.days[day];
        if (dayPlan == undefined) {
            return;
        }
        const mealIndex = dayPlan.meals.findIndex(meal => meal.recipe_id === recipe_id);
        if (mealIndex == -1) {
            return;
        }
        dayPlan.meals.splice(mealIndex, 1);
        this.saveStrategy.savePlan(this.weekPlan);
    }

    clear(): void {
        const newPlan: WeekPlan = {days: Array(7).fill(undefined).map(() => {return {meals: []}})};
        this.weekPlan = newPlan;
        this.saveStrategy.savePlan(this.weekPlan);
    }
}

export const CurrentWeekMealPlanner: IWeeklyMealPlanner = new WeeklyMealPlannerInternal(new WeeklyMealPlannerCookieSaveStrategy("current_week_plan"))