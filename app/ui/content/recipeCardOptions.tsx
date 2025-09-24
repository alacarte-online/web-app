"use client"

import {OptionsButtonProps} from "@/app/ui/content/recipe-card";
import {useState} from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {AllDays, Day, DayToDisplayString, IsRecipeAddedForDay} from "@/app/lib/mealPlanning/mealPlanning";
import {useDispatch, usePlan} from "@/app/lib/mealPlanning/mealPlanContext";

enum MenuOpen {
    None,
    Root,
    AddToPlan,
    RemoveFromPlan,
}

export default function RecipeCardOptions({recipe, optionsProps} : {recipe: number, optionsProps: OptionsButtonProps}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [menuState, setMenuState] = useState<MenuOpen>(MenuOpen.None);
    const openRootMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setMenuState(MenuOpen.Root)
    }
    const openAddToPlanMenu = () => {
        setMenuState(MenuOpen.AddToPlan)
    }
    const openRemoveFromDayMenu = () => {
        setMenuState(MenuOpen.RemoveFromPlan)
    }
    const handleClose = () => {
        setAnchorEl(null);
        setMenuState(MenuOpen.None)
    };

    const mealPlan = usePlan();
    const planDispatcher = useDispatch();

    return (
        <div className="flex items-center gap-2">
            <button
                className="w-fit h-fit"
                aria-controls={menuState != MenuOpen.None ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={menuState != MenuOpen.None ? 'true' : undefined}
                onClick={openRootMenu}
            >
                <MoreVertIcon/>
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
                {optionsProps.enableAddToPlan == true && <MenuItem onClick={openAddToPlanMenu} sx={{color: 'primary.main'}}>Add to meal plan...</MenuItem>}
                {optionsProps.enableAddToPlan == true && <MenuItem onClick={openRemoveFromDayMenu} sx={{color: 'primary.main'}}>Remove from meal plan...</MenuItem>}
            </Menu>
            <AddToPlanMenu />
            <RemoveFromPlanMenu />
        </div>
    );

    function AddToPlanMenu() {
        const onClick = (day: Day) => {
            planDispatcher({type: 'add', recipe: recipe, day: day})
            handleClose();
        }
        return (
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={menuState == MenuOpen.AddToPlan}
                onClose={handleClose}
                slotProps={{
                    list: {
                        'aria-labelledby': 'basic-button',
                    },
                }}
            >
                {
                    AllDays().map(
                        day => {
                            return <MenuItem
                                key={day}
                                disabled={IsRecipeAddedForDay(mealPlan, recipe, day)}
                                onClick={() => onClick(day)}
                                sx={{color: 'primary.main'}}
                            >
                                {DayToDisplayString(day)}
                            </MenuItem>;
                        }
                    )
                }
            </Menu>
        )
    }

    function RemoveFromPlanMenu() {
        const onClick = (day: Day) => {
            planDispatcher({type: 'remove', recipe: recipe, day: day})
            handleClose();
        }
        return (
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={menuState == MenuOpen.RemoveFromPlan}
                onClose={handleClose}
                slotProps={{
                    list: {
                        'aria-labelledby': 'basic-button',
                    },
                }}
            >
                {
                    AllDays().map(
                        day => {
                            return <MenuItem
                                key={day}
                                disabled={!IsRecipeAddedForDay(mealPlan, recipe, day)}
                                onClick={() => onClick(day)}
                                sx={{color: 'primary.main'}}
                            >
                                {DayToDisplayString(day)}
                            </MenuItem>;
                        }
                    )
                }
            </Menu>
        )
    }
}