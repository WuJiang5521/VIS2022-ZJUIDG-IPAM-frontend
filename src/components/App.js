import {ThemeProvider} from "@mui/styles";
import {createTheme, CssBaseline} from "@mui/material";
import React from "react";
import {inject, observer} from "mobx-react";
import TitleBar from "./TitleBar/TitleBar";

function App() {
    return <ThemeProvider theme={createTheme()}>
        <CssBaseline/>
        <TitleBar/>
    </ThemeProvider>;
}

export default inject('data')(observer(App));
