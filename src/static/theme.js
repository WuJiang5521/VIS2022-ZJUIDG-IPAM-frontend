import {alpha} from "@mui/material";

const scrollbarColor = 'rgb(36, 40, 41)'
export const scrollbarSize = 6;

const theme = {
    palette: {
        primary: {
            main: 'rgb(36,40,41)'
        },
        background: {
            default: 'rgb(233,233,233)',
            paper: 'rgb(255,255,255)',
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                        backgroundColor: 'rgb(255, 255, 255)',
                        width: scrollbarSize,
                        height: scrollbarSize,
                    },
                    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                        borderRadius: scrollbarSize,
                        backgroundColor: alpha(scrollbarColor, 0.6),
                        border: 'none',
                    },
                    '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
                        backgroundColor: scrollbarColor,
                    },
                    '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
                        backgroundColor: scrollbarColor,
                    },
                    '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: alpha(scrollbarColor, 0.8),
                    },
                    '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
                        backgroundColor: 'none',
                    },
                },
            },
        },
    },
}

export default theme;
// playerColors must be in rgb form!!!
export const playerColors = ['rgb(211,72,8)', 'rgb(4, 101, 130)'];
