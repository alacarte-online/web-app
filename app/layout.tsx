"use client";

import localFont from "next/font/local";
import "./globals.css";
import MenuBarHorizontal from "@/app/ui/navigation/menu-bar-horizontal";
import {useEffect, useState} from "react";
import MenuBarVertical from "@/app/ui/navigation/menuBarVertical";
import {AppRouterCacheProvider} from '@mui/material-nextjs/v15-appRouter';
import {theme} from "@/app/theme";
import { ThemeProvider } from '@mui/material/styles';

const excalifont = localFont({
    src: [
        {
            path: "../public/fonts/Excalifont-Regular.woff2",
            weight: "400",
            style: "normal"
        }
    ],
    variable: "--font-excalifont",
});

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const isDesktopWidth = 800;
    const [isDesktop, setDesktop] = useState(false);

    const updateMedia = () => {
        setDesktop(window.innerWidth > isDesktopWidth);
    };
    useEffect(() => {
        setDesktop(window.innerWidth > isDesktopWidth);
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    }, [setDesktop]);

    return (
        <html lang="en">
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
        </head>
        <body
            id="root" className={`${excalifont.className} antialiased m-2 max-w-screen bg-blackboard-500`}
        >
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
                <TitleBar isDesktop={isDesktop}/>
                <div className={`flex ${isDesktop ? `flex-row` : `flex-col`}`}>
                    {isDesktop ? <MenuBarVertical/> : null}

                    <div className="overflow-y-auto flex-col">
                        {children}
                    </div>

                    {!isDesktop ?
                        <div className="sticky bottom-0 w-full">
                            <MenuBarHorizontal/>
                        </div> : null}
                </div>
            </ThemeProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    );
}

function TitleBar({isDesktop}: { isDesktop: boolean }) {
    return (
        <div className={`${isDesktop ? `` : `hidden`} w-screen text-4xl p-2 ml-2 mb-2`}>
            Alacarte
        </div>
    )
}
