import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import React from "react";
import {inject, observer} from "mobx-react";
import TitleBar from "./TitleBar/TitleBar";
import theme from "../static/theme";

function App() {
    return <ThemeProvider theme={createTheme(theme)}>
        <CssBaseline/>
        <TitleBar/>
    </ThemeProvider>;
}

export default inject('data')(observer(App));
