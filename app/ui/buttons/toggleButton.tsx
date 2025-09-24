"use client";

import {OverridableComponent} from "@mui/material/OverridableComponent";
import {SvgIconTypeMap} from "@mui/material";
import React from "react";

type ToggleButtonProps = {
    DisabledIcon: OverridableComponent<SvgIconTypeMap>,
    EnabledIcon: OverridableComponent<SvgIconTypeMap>,
    state?: boolean,
    onClick?: () => void
}

export const ToggleButtonWithIconComponent = ({
                                            DisabledIcon, EnabledIcon, state, onClick
                                        }: ToggleButtonProps) => {
    return (
        <button onClick={onClick}>
            {state ? <EnabledIcon /> : <DisabledIcon />}
        </button>
    );
};