import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import {usePathname} from "next/navigation";
import {MagnifyingGlassIcon} from "@/app/ui/icons/magnifyingGlass";
import {HeartIconOutline, HeartIconSolid} from "@/app/ui/icons/heart";
import {ReactNode} from "react";
import Link from 'next/link';

export default function MenuBarHorizontal() {
    type iconDetails = {name: string, displayText: string, icon: ReactNode, linkUrl: string};
    const pathname = usePathname()
    const browseIcon = <MagnifyingGlassIcon />
    const savedIcon = pathname.startsWith("/saved") ? <HeartIconSolid /> : <HeartIconOutline />;
    const browseIconDetails: iconDetails = {name: "browse", displayText: "Browse", icon: browseIcon, linkUrl: "/browse"}
    const savedIconDetails: iconDetails = {name: "saved", displayText: "Saved", icon: savedIcon, linkUrl: "/saved"}

    const icons = [savedIconDetails, browseIconDetails]
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation>
                {icons.map(details => (
                    <BottomNavigationAction
                        key={details.name}
                        component={Link}
                        href={details.linkUrl}
                        label={details.displayText}
                        icon={details.icon} />
                ))}
            </BottomNavigation>
        </Paper>
    );
}