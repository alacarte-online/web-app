import {createTheme} from "@mui/material/styles";

export const theme = createTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: "#09381F",
                },
                secondary: {
                    main: "#E6D4E6",
                },
                background: {
                    default: "#FAEBF4",
                    paper: "#FAEBF4"
                }
            }
        },
        dark: {
            palette: {
                primary: {
                    main: "#E6D4E6",
                },
                secondary: {
                    main: "#09381F",
                },
                background: {
                    default: "#FAEBF4",
                    paper: "#FAEBF4"
                }
            }
        }

    },
    typography: {
        fontFamily: '"Oswald", "Roboto", "Helvetica", "Arial", sans-serif',
    },
});