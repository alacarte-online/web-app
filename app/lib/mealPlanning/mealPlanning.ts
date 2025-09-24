export type Meal = {
    recipe_id: number;
}

export type DayPlan = {
    meals: Meal[];
}

export type WeekPlan = {
    days: DayPlan[];
}

export function IsRecipeAddedForDay(plan: WeekPlan, recipe_id: number, day: Day): boolean {
    const dayPlan = plan.days[day];
    if(dayPlan == undefined) {
        return false;
    }
    return dayPlan.meals.some(meal => meal.recipe_id === recipe_id);
}

export enum Day {
    Monday = 0,
    Tuesday = 1,
    Wednesday = 2,
    Thursday = 3,
    Friday = 4,
    Saturday = 5,
    Sunday = 6
}

export function DayToDisplayString(day: Day) : string {
    switch(day) {
        case Day.Monday: return 'Monday';
        case Day.Tuesday: return 'Tuesday';
        case Day.Wednesday: return 'Wednesday';
        case Day.Thursday: return 'Thursday';
        case Day.Friday: return 'Friday';
        case Day.Saturday: return 'Saturday';
        case Day.Sunday: return 'Sunday';
        default: return 'Unknown day string';
    }
}

export function AllDays() {
    return [Day.Monday, Day.Tuesday, Day.Wednesday, Day.Thursday, Day.Friday, Day.Saturday, Day.Sunday];
}