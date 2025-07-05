"use client"

import React from "react";

export function BaseModalEntry({icon, text, style, handle} : {icon?: React.JSX.Element, text: string, style?: string, handle?: () => Promise<void>}) {
    //console.log("handle: " + handle.toString());
    return (
        <div className="flex gap-1">
            <div className="size-8">
                {icon}
            </div>
            <button className="w-full" onClick={async () => {
                if(handle != null) {
                    await handle();
                }
            }}>
                <div className={"text-start text-lg " + style}>
                    {text}
                </div>
            </button>
        </div>
    );
}