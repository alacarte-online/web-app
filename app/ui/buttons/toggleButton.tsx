"use client";

import {OverridableComponent} from "@mui/material/OverridableComponent";
import {SvgIconTypeMap} from "@mui/material";
import React, {useState} from "react";

type ToggleButtonProps = {
    DisabledIcon: OverridableComponent<SvgIconTypeMap>,
    EnabledIcon: OverridableComponent<SvgIconTypeMap>,
    initialState?: boolean,
    onToggle?: (state: boolean) => void
}

export const ToggleButtonWithIconComponent = ({
                                            DisabledIcon, EnabledIcon, initialState, onToggle
                                        }: ToggleButtonProps) => {
    const [enabled, setEnabled] = useState<boolean>(initialState ?? false);

    // Ensure we don't get hydration errors
    // This should probably be handled a layer above (ie. SaveButton), but
    // would require allowing setting the state of the toggle button externally
    const [isClient, setIsClient] = React.useState(false)
    React.useEffect(() => {
        setIsClient(true)
    }, [])

    const handleToggle = () => {
        const newState = !enabled;
        setEnabled(newState);
        onToggle?.(newState);
    };

    return (
        // our toggle button is a component
        // its name starts with a capital letter to signal that
        // so we can just render it here as any other component
        <button onClick={handleToggle}>
            {isClient && enabled ? <EnabledIcon /> : <DisabledIcon />}
        </button>
    );
};