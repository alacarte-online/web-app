"use client";

import "./globals.css";
import MenuBarHorizontal from "@/app/ui/navigation/menu-bar-horizontal";
import {useEffect, useState} from "react";
import DesktopAppBar from "@/app/ui/navigation/desktopAppBar";
import {AppRouterCacheProvider} from '@mui/material-nextjs/v15-appRouter';
import {theme} from "@/app/theme";
import {styled, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {Oswald} from 'next/font/google';

const oswald = Oswald({
    subsets: ['latin'],
})

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const isDesktopWidth = 800;
    const [isDesktop, setDesktop] = useState(false);

    const DesktopToolbarOffset = styled('div')(({ theme }) => theme.mixins.toolbar);
    const defaultMobileBottomNavHeight: string = '49px';
    const MobileBottomNavigationOffset = styled('div')({ height: defaultMobileBottomNavHeight });

    const updateMedia = () => {
        setDesktop(window.innerWidth > isDesktopWidth);
    };
    useEffect(() => {
        setDesktop(window.innerWidth > isDesktopWidth);
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    }, [setDesktop]);

    return (
        <html lang={`en ${oswald.className}`}>
        <head>
            <title>
                Alacarte
            </title>
            <link
                rel="icon"
                href="/icon?<generated>"
                type="image/<generated>"
                sizes="<generated>"
            />
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        </head>
        <body
            id="root" className="antialiased m-2 max-w-screen bg-background dark:bg-primary"
        >
        <AppRouterCacheProvider options={{enableCssLayer: true}}>
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme/>
                <div className={`flex ${isDesktop ? `flex-row` : `flex-col`}`}>
                    {isDesktop ? <DesktopAppBar/> : null}

                    <div className="overflow-y-auto flex-col w-full">
                        {isDesktop ? <DesktopToolbarOffset /> : null}
                        {children}
                    </div>

                    {!isDesktop ?
                        <div className="bottom-0 w-full">
                            <MobileBottomNavigationOffset />
                            <MenuBarHorizontal/>
                        </div> : null}
                </div>
            </ThemeProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    );
}
