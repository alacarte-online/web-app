"use client"

import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from "next/link";
import {HeartIconOutline, HeartIconSolid} from "@/app/ui/icons/heart";
import {MagnifyingGlassIcon} from "@/app/ui/icons/magnifyingGlass";
import {usePathname} from "next/navigation";
import {ReactNode} from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const drawerWidth = 220;

type iconDetails = {name: string, displayText: string, icon: ReactNode, linkUrl: string};

const openedMixin = (): CSSObject => ({
    width: drawerWidth,
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    }
});

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: theme.shadows[0],
    variants: [
        {
            props: ({ open }) => open,
            style: {
                marginLeft: 0,
                width: `calc(100% - ${0}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(),
                    '& .MuiDrawer-paper': openedMixin(),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    }),
);

export default function DesktopAppBar() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const pathname = usePathname()
    const browseIcon = <MagnifyingGlassIcon />
    const savedIcon = pathname.startsWith("/saved") ? <HeartIconSolid /> : <HeartIconOutline />;
    const browseIconDetails: iconDetails = {name: "browse", displayText: "Browse", icon: browseIcon, linkUrl: "/browse"}
    const savedIconDetails: iconDetails = {name: "saved", displayText: "Saved", icon: savedIcon, linkUrl: "/saved"}

    const [selected, setSelected] = React.useState(
            pathname.startsWith(browseIconDetails.linkUrl) ? browseIconDetails.name :
                pathname.startsWith(savedIconDetails.linkUrl) ? savedIconDetails.name : ""
    );

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleToggleDrawer = () => {
        setOpen(!open);
    };

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: `${!open ? "center" : "flex-end"}`,
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar open={open} sx={{bgcolor: 'secondary.main', color: 'primary.main'}}>
                <Toolbar className="gap-4 border-b-[2px] border-blackboard-500">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleToggleDrawer}
                        edge="start"
                        sx={[
                            {
                                marginRight: 5,
                            }
                        ]}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h4" component="div" className="font-semibold">
                        Alacarte
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className="">
                <Drawer variant="permanent" open={open} sx={{
                    '& .MuiDrawer-paper': {
                        bgcolor: 'secondary.main'
                    },
                }}>
                    <DrawerHeader>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            // edge="start"
                            sx={[
                                open && { display: 'none' },
                            ]}
                        >
                            <MenuIcon />
                        </IconButton>
                        <IconButton onClick={handleDrawerClose} sx={[
                            !open && { display: 'none' },
                        ]}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <List>
                        {[browseIconDetails, savedIconDetails].map(iconDetails => (
                            <ListItem key={iconDetails.linkUrl} disablePadding sx={{ display: 'block'}}>
                                <Link href={iconDetails.linkUrl}>
                                    <ListItemButton
                                        selected={selected == iconDetails.name}
                                        onClick={() => setSelected(iconDetails.name)}
                                        sx={[
                                            {
                                                minHeight: 48,
                                                px: 2.5,
                                            },
                                            open
                                                ? {
                                                    justifyContent: 'initial',
                                                }
                                                : {
                                                    justifyContent: 'center',
                                                },
                                        ]}
                                    >
                                        <ListItemIcon
                                            sx={[
                                                {
                                                    minWidth: 0,
                                                    justifyContent: 'center'
                                                },
                                                open
                                                    ? {
                                                        mr: 3,
                                                    }
                                                    : {
                                                        mr: 'auto',
                                                    },
                                            ]}
                                        >
                                            {iconDetails.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={iconDetails.displayText}
                                            sx={[
                                                open
                                                    ? {
                                                        opacity: 1,
                                                    }
                                                    : {
                                                        opacity: 0,
                                                    },
                                            ]}
                                        />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </div>
        </Box>
    );
}