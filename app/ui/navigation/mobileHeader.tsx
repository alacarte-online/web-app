import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const MobileHeaderHeightOffset: string = "h-[2.5rem]";
const MobileHeaderHeightValue: string = "h-[3rem]";

export default function MobileHeader({title}: {title: string}) {
    return (
        <Box sx={{bgcolor: 'secondary.main'}} className={`absolute ${MobileHeaderHeightValue} flex items-center left-0 right-0 top-0 w-screen p-1 pb-2 border-b-[2px] md:hidden`}>
            <Typography sx={{color: 'primary.main'}} variant="h4" component="div" className="font-bold">{title}</Typography>
        </Box>
    )
}