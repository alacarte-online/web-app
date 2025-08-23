import React from "react";
import Typography from "@mui/material/Typography";

export default function MobileHeader({title}: {title: string}) {
    return (
        <div className="flex flex-row items-center left-0 right-0 top-0 w-full p-1 border-b-[2px] border-primary bg-secondary md:hidden">
            <Typography variant="h4" component="div" className="font-bold text-primary">{title}</Typography>
        </div>
    )
}