import {DayMealData, MealAction, useWeekDispatch} from "@/app/week/weekViewContext";
import Typography from "@mui/material/Typography";
import {MealItem} from "@/app/week/mealItem";
import React, {createContext, useState} from "react";
import {AllDays, Day, DayToDisplayString, WeekPlan} from "@/app/lib/mealPlanning/mealPlanning";
import {
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Menu,
    MenuItem
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {MealPlanAction, useDispatch, usePlan} from "@/app/lib/mealPlanning/mealPlanContext";

export const DayContext = createContext<Day>(Day.Monday)

export default function DayView({dayData}: {dayData: DayMealData}) {
    return(
        <DayContext value={dayData.day}>
            <Card className="relative flex w-full flex-col">
                {dayData.meals.length > 0 && dayData.meals.some(meal => meal.status == 'loaded') ? <DayOptions day={dayData.day} /> : null}
                <Typography sx={{fontSize: 'x-large', color: 'primary.main'}} align={'center'}>{DayToDisplayString(dayData.day)}</Typography>
                <DayList dayData={dayData} />
            </Card>
        </DayContext>
    )
}

function DayList({dayData}: {dayData: DayMealData}) {
    const [isClient, setIsClient] = React.useState(false)
    React.useEffect(() => {
        setIsClient(true)
    }, [])
    return (
        <div className="flex flex-col p-2 gap-2">
            {!isClient || dayData.meals.length == 0 ?
                <EmptyDayList /> :
                <PopulatedDayList dayData={dayData} />
            }
        </div>
    )
}

function EmptyDayList() {
    return(
        <Typography sx={{color: 'primary.main'}} align={'center'}>Empty</Typography>
    )
}

function PopulatedDayList({dayData}: {dayData: DayMealData}) {
    return (
        <div className="flex flex-col gap-1">
            {
                dayData.meals.map(meal => <MealItem mealData={meal} key={meal.id} />)
            }
        </div>
    )
}

enum MenuOpen {
    None,
    Root,
    MoveToDay,
    CopyToDay,
    SwapWithDay,
    ClearDayConfirm,
    ClearAllDaysConfirm
}

function DayOptions({day} : {day: Day}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [menuState, setMenuState] = useState<MenuOpen>(MenuOpen.None);
    const weekViewDispatch = useWeekDispatch();

    const mealPlan = usePlan();
    const mealPlanDispatch = useDispatch();

    const openRootMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setMenuState(MenuOpen.Root)
    }
    const openMoveToDayMenu = () => {
        setMenuState(MenuOpen.MoveToDay)
    }
    const openCopyToDayMenu = () => {
        setMenuState(MenuOpen.CopyToDay)
    }
    const openSwapWithDayMenu = () => {
        setMenuState(MenuOpen.SwapWithDay)
    }
    const openClearDayConfirm = () => {
        setMenuState(MenuOpen.ClearDayConfirm)
    }
    const openClearAllDaysConfirm = () => {
        setMenuState(MenuOpen.ClearAllDaysConfirm)
    }
    const handleClose = () => {
        setAnchorEl(null);
        setMenuState(MenuOpen.None)
    };

    return (
        <div className="absolute right-2 top-2">
            <button
                className="w-fit h-fit"
                aria-controls={menuState != MenuOpen.None ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={menuState != MenuOpen.None ? 'true' : undefined}
                onClick={openRootMenu}
            >
                <MoreVertIcon sx={{color: 'primary.main'}}/>
            </button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={menuState == MenuOpen.Root}
                onClose={handleClose}
                slotProps={{
                    list: {
                        'aria-labelledby': 'basic-button',
                    },
                }}
            >
                <MenuItem onClick={openMoveToDayMenu} sx={{color: 'primary.main'}}>Move to day...</MenuItem>
                <MenuItem onClick={openCopyToDayMenu} sx={{color: 'primary.main'}}>Copy to day...</MenuItem>
                <MenuItem onClick={openSwapWithDayMenu} sx={{color: 'primary.main'}}>Swap with day...</MenuItem>
                <MenuItem onClick={openClearDayConfirm} sx={{color: 'red'}}>Clear</MenuItem>
                <MenuItem onClick={openClearAllDaysConfirm} sx={{color: 'red'}}>Clear all days</MenuItem>
            </Menu>
            <MoveToDayMenu />
            <CopyToDayMenu />
            <SwapWithDayMenu />
            <ClearDayConfirmDialog />
            <ClearAllDaysConfirmDialog />
        </div>
    );

    function MoveToDayMenu() {
        const onDaySelected = (selectedDay: Day) => {
            moveToDay({mealPlan: mealPlan, fromDay: day, toDay: selectedDay, mealPlanDispatch: mealPlanDispatch, weekViewDispatch: weekViewDispatch});
            handleClose();
        };
        return (
            <ChooseDayMenu anchorEl={anchorEl} open={menuState == MenuOpen.MoveToDay} onClose={handleClose} parentDay={day} onDaySelected={onDaySelected} />
        )
    }

    function CopyToDayMenu() {
        const onDaySelected = (selectedDay: Day) => {
            copyToDay({mealPlan: mealPlan, fromDay: day, toDay: selectedDay, mealPlanDispatch: mealPlanDispatch, weekViewDispatch: weekViewDispatch});
            handleClose();
        };
        return (
            <ChooseDayMenu anchorEl={anchorEl} open={menuState == MenuOpen.CopyToDay} onClose={handleClose} parentDay={day} onDaySelected={onDaySelected} />
        )
    }

    function SwapWithDayMenu() {
        const onDaySelected = (selectedDay: Day) => {
            swapWithDay({mealPlan: mealPlan, fromDay: day, toDay: selectedDay, mealPlanDispatch: mealPlanDispatch, weekViewDispatch: weekViewDispatch});
            handleClose();
        };
        return (
            <ChooseDayMenu anchorEl={anchorEl} open={menuState == MenuOpen.SwapWithDay} onClose={handleClose} parentDay={day} onDaySelected={onDaySelected} />
        )
    }

    function ClearDayConfirmDialog() {
        const onConfirm = () => {
            clearDay({mealPlan: mealPlan, day: day, mealPlanDispatch: mealPlanDispatch, weekViewDispatch: weekViewDispatch})
            handleClose()
        }
        const title = "Clear meals from day?";
        const body = `Are you sure you want to clear all menu items from ${DayToDisplayString(day)}?`;
        return (
            <ConfirmDialog open={menuState == MenuOpen.ClearDayConfirm} onClose={handleClose} title={title} body={body} onConfirm={onConfirm} />
        )
    }

    function ClearAllDaysConfirmDialog() {
        const onConfirm = () => {
            clearAllDays({mealPlan: mealPlan, day: day, mealPlanDispatch: mealPlanDispatch, weekViewDispatch: weekViewDispatch})
            handleClose()
        }
        const title = "Clear meals from all days?";
        const body = "Are you sure you want to clear all menu items from all week days?";
        return (
            <ConfirmDialog open={menuState == MenuOpen.ClearAllDaysConfirm} onClose={handleClose} title={title} body={body} onConfirm={onConfirm} />
        )
    }
}

function ChooseDayMenu({anchorEl, open, onClose, parentDay, onDaySelected} : {anchorEl: null | HTMLElement, open: boolean, onClose: () => void, parentDay: Day, onDaySelected: (selectedDay: Day) => void}) {
    const menuItems = AllDays().map(day => {
        return <MenuItem key={day} onClick={() => onDaySelected(day)} disabled={day == parentDay} sx={{color: 'primary.main'}}>{DayToDisplayString(day)}</MenuItem>})
    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
            slotProps={{
                list: {
                    'aria-labelledby': 'basic-button',
                },
            }}
        >
            {menuItems}
        </Menu>
    )
}

function ConfirmDialog({open, onClose, title, body, onConfirm} : {open: boolean, onClose: () => void, title: string, body: string, onConfirm: () => void}) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {body}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} autoFocus><Typography>Cancel</Typography></Button>
                <Button onClick={onConfirm}><Typography>Confirm</Typography></Button>
            </DialogActions>
        </Dialog>
    )
}

function moveToDay(
    {mealPlan, fromDay, toDay, mealPlanDispatch, weekViewDispatch} :
    {mealPlan: WeekPlan, fromDay: Day, toDay: Day,
        mealPlanDispatch: (value: MealPlanAction) => void, weekViewDispatch: (value: MealAction) => void}) {
    for(const mealToRemove of mealPlan.days[toDay].meals) {
        mealPlanDispatch({type: 'remove', day: toDay, recipe: mealToRemove.recipe_id})
    }
    for(const mealToAdd of mealPlan.days[fromDay].meals) {
        mealPlanDispatch({type: 'add', day: toDay, recipe: mealToAdd.recipe_id})
        mealPlanDispatch({type: 'remove', day: fromDay, recipe: mealToAdd.recipe_id})
    }
    weekViewDispatch({type: 'moveDay', day: fromDay, to: toDay})
}

function copyToDay(
    {mealPlan, fromDay, toDay, mealPlanDispatch, weekViewDispatch} :
    {mealPlan: WeekPlan, fromDay: Day, toDay: Day,
        mealPlanDispatch: (value: MealPlanAction) => void, weekViewDispatch: (value: MealAction) => void}) {
    for(const mealToRemove of mealPlan.days[toDay].meals) {
        mealPlanDispatch({type: 'remove', day: toDay, recipe: mealToRemove.recipe_id})
    }
    for(const mealToAdd of mealPlan.days[fromDay].meals) {
        mealPlanDispatch({type: 'add', day: toDay, recipe: mealToAdd.recipe_id})
    }
    weekViewDispatch({type: 'copyDay', day: fromDay, to: toDay})
}

function swapWithDay(
    {mealPlan, fromDay, toDay, mealPlanDispatch, weekViewDispatch} :
    {mealPlan: WeekPlan, fromDay: Day, toDay: Day,
        mealPlanDispatch: (value: MealPlanAction) => void, weekViewDispatch: (value: MealAction) => void}) {
    const tempMeals = [...mealPlan.days[toDay].meals];
    for(const mealToRemove of mealPlan.days[fromDay].meals) {
        mealPlanDispatch({type: 'remove', day: fromDay, recipe: mealToRemove.recipe_id})
        mealPlanDispatch({type: 'add', day: toDay, recipe: mealToRemove.recipe_id})
    }
    for(const mealToAdd of tempMeals) {
        mealPlanDispatch({type: 'remove', day: toDay, recipe: mealToAdd.recipe_id})
        mealPlanDispatch({type: 'add', day: fromDay, recipe: mealToAdd.recipe_id})
    }
    weekViewDispatch({type: 'swapDay', day: fromDay, to: toDay})
}

function clearDay(
    {mealPlan, day, mealPlanDispatch, weekViewDispatch} :
    {mealPlan: WeekPlan, day: Day,
        mealPlanDispatch: (value: MealPlanAction) => void, weekViewDispatch: (value: MealAction) => void}) {
    for(const mealToRemove of mealPlan.days[day].meals) {
        mealPlanDispatch({type: 'remove', day: day, recipe: mealToRemove.recipe_id})
    }
    weekViewDispatch({type: 'clearDay', day: day})
}

function clearAllDays(
    {mealPlan, day, mealPlanDispatch, weekViewDispatch} :
    {mealPlan: WeekPlan, day: Day,
        mealPlanDispatch: (value: MealPlanAction) => void, weekViewDispatch: (value: MealAction) => void}) {
    for(const day of AllDays()) {
        for(const mealToRemove of mealPlan.days[day].meals) {
            mealPlanDispatch({type: 'remove', day: day, recipe: mealToRemove.recipe_id})
        }
    }
    weekViewDispatch({type: 'clearDay', day: day})
}