import {alpha} from "@mui/material";

const scrollbarColor = 'rgb(36, 40, 41)'
export const scrollbarSize = 4;

// playerColors must be in rgb form!!!
export const playerColors = ['rgb(162,142,8)', 'rgb(88,4,130)'];
export const winColors = ['rgb(40,130,4)', 'rgb(211,72,8)'];
export const transition = (...keys) => keys.map(key => `${key} .3s cubic-bezier(0.4, 0, 0.2, 1) 0ms`).join(',');

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
        MuiTooltip: {
            defaultProps: {
                disableInteractive: true,
                enterDelay: 300,
            },
        },
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                        backgroundColor: 'rgba(0,0,0,0)',
                        width: scrollbarSize,
                        height: scrollbarSize,
                    },
                    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                        borderRadius: scrollbarSize,
                        backgroundColor: alpha(scrollbarColor, 0.1),
                        border: 'none',
                    },
                    '&:hover::-webkit-scrollbar-thumb, & *:hover::-webkit-scrollbar-thumb': {
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
