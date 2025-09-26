import {MealData, useWeekDispatch} from "@/app/week/weekViewContext";
import {Day, DayToDisplayString, IsRecipeAddedForDay} from "@/app/lib/mealPlanning/mealPlanning";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, {useContext, useState} from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Card, Skeleton} from "@mui/material";
import Typography from "@mui/material/Typography";
import {SmallRecipeImage} from "@/app/ui/content/recipe-image";
import {SaveButton} from "@/app/ui/buttons/saveButton";
import {useDispatch, usePlan} from "../lib/mealPlanning/mealPlanContext";
import {DayContext} from "@/app/week/dayView";
import Link from "next/link";

export function MealItem({mealData}: {mealData: MealData}) {

    switch (mealData.status) {
        case 'unloaded':
            return (<SkeletonMealItem />);
        case 'fetching':
            return (<SkeletonMealItem />);
        case 'failed':
            return;
        case 'loaded':
            return (
                <LoadedMealItem
                    id={mealData.id}
                    recipe_id={mealData.recipe_id}
                    recipe_name={mealData.recipe_name ?? "missing recipe name"}
                    user_name={mealData.user_name ?? "missing user name"}
                    image_uri={mealData.image_uri ?? "missing image"}
                />
            )
    }
}

function LoadedMealItem({id, recipe_id, recipe_name, user_name, image_uri}: {id: number, recipe_id: number, recipe_name: string, user_name: string, image_uri: string}) {
    const mealPlanDispatch = useDispatch();
    const weekViewDispatch = useWeekDispatch();
    const dayContext = useContext(DayContext);

    return (
        <Card className="flex w-full h-12 items-center gap-8 p-1" elevation={2}>
            <Link className="flex flex-grow items-center gap-8 p-1" href={"/recipes/" + recipe_id}>
                <SmallRecipeImage uri={image_uri ?? "missing.jpg"} alt={`Image of ${recipe_name}`} />
                <div className="flex flex-col">
                    <Typography sx={{fontWeight: 'medium', fontSize: 'medium', color: 'primary.main'}}>{recipe_name}</Typography>
                    <Typography sx={{fontWeight: 'regular', fontSize: 'small', color: 'primary.main'}}>{user_name}</Typography>
                </div>
                <div className="flex-grow" />
            </Link>
            <Options onMove={onMove} onCopy={onCopy} onRemove={onRemove} recipeId={recipe_id} />
        </Card>
    )

    function onMove(to: Day) {
        mealPlanDispatch({type: 'remove', recipe: recipe_id, day: dayContext})
        mealPlanDispatch({type: 'add', recipe: recipe_id, day: to})
        weekViewDispatch({type: 'move', mealId: id, to: to});
    }

    function onCopy(to: Day) {
        mealPlanDispatch({type: 'add', recipe: recipe_id, day: to})
        weekViewDispatch({type: 'copy', mealId: id, to: to});
    }

    function onRemove() {
        mealPlanDispatch({type: 'remove', recipe: recipe_id, day: dayContext})
        weekViewDispatch({type: 'remove', mealId: id});
    }
}

function SkeletonMealItem() {
    return (
        <Card className="flex w-full h-12 items-center gap-8 p-1" elevation={2}>
            <Skeleton variant="rectangular" width={36} height={36} />
            <div className="flex flex-col">
                <Skeleton variant="text" width={128} sx={{fontSize: 'medium'}}  />
                <Skeleton variant="text" width={32} sx={{fontSize: 'small'}} />
            </div>
        </Card>
    )
}

enum MenuOpen {
    None,
    Root,
    AddToDay,
    CopyToDay
}

function Options({recipeId, onMove, onCopy, onRemove} : {recipeId: number, onMove: (to: Day) => void, onCopy: (to: Day) => void, onRemove: () => void}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [menuState, setMenuState] = useState<MenuOpen>(MenuOpen.None);
    const openRootMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setMenuState(MenuOpen.Root)
    }
    const onAddToDayMenuClicked = () => {
        setMenuState(MenuOpen.AddToDay);
    }
    const onCopyToDayMenuClicked = () => {
        setMenuState(MenuOpen.CopyToDay);
    }
    const onRemoveClicked = () => {
        onRemove();
        handleClose();
    }
    const handleClose = () => {
        setAnchorEl(null);
        setMenuState(MenuOpen.None)
    };

    return (
        <div className="flex items-center gap-2">
            <SaveButton recipeId={recipeId} />
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
                <MenuItem onClick={onAddToDayMenuClicked} sx={{color: 'primary.main'}}>Move to day...</MenuItem>
                <MenuItem onClick={onCopyToDayMenuClicked} sx={{color: 'primary.main'}}>Copy to day...</MenuItem>
                <MenuItem onClick={onRemoveClicked} sx={{color: 'primary.main'}}>Remove</MenuItem>
            </Menu>
            <MoveToDayMenu />
            <CopyToDayMenu />
        </div>
    );

    function MoveToDayMenu() {
        const days = [Day.Monday, Day.Tuesday, Day.Wednesday, Day.Thursday, Day.Friday, Day.Saturday, Day.Sunday];
        const mealPlan = usePlan();
        const menuItems = days.map(day => {
            const onClick = () => {
                onMove(day);
                handleClose();
            };
            return <MenuItem key={day} onClick={onClick} disabled={IsRecipeAddedForDay(mealPlan, recipeId, day)} sx={{color: 'primary.main'}}>{DayToDisplayString(day)}</MenuItem>})
        return (
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={menuState == MenuOpen.AddToDay}
                onClose={handleClose}
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

    function CopyToDayMenu() {
        const days = [Day.Monday, Day.Tuesday, Day.Wednesday, Day.Thursday, Day.Friday, Day.Saturday, Day.Sunday];
        const mealPlan = usePlan();
        const menuItems = days.map(day => {
            const onClick = () => {
                onCopy(day);
                handleClose();
            };
            return <MenuItem key={day} onClick={onClick} disabled={IsRecipeAddedForDay(mealPlan, recipeId, day)} sx={{color: 'primary.main'}}>{DayToDisplayString(day)}</MenuItem>})
        return (
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={menuState == MenuOpen.CopyToDay}
                onClose={handleClose}
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
}