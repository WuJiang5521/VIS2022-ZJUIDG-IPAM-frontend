import {Box, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import React from "react";
import {inject, observer} from "mobx-react";
import TitleBar from "./TitleBar/TitleBar";
import theme from "../static/theme";
import LayoutManager from "./Common/LayoutManager";
import useQueryView from "./QueryView";
import useTacticView from "./TacticView";
import useRallyView from "./RallyView";
import useProjectView from "./ProjectView";
import {useTranslation} from "react-i18next";
import strings from "../static/strings";
import Feedback from "./Feedback";

function App() {
    const queryView = useQueryView();
    const tacticView = useTacticView();
    const rallyView = useRallyView();
    const projectView = useProjectView();

    const {t} = useTranslation();
    return <ThemeProvider theme={createTheme(theme)}>
        <CssBaseline/>
        <React.Fragment>
            <TitleBar/>
            <Box marginTop={'40px'}
                 width={'100vw'}
                 height={'calc(100vh - 40px)'}>
                <LayoutManager size={[12, 12]}
                               padding={1}
                               panels={[
                                   {
                                       size: [3, 6],
                                       title: t(strings.QueryView),
                                       ...queryView,
                                   },
                                   {
                                       size: [6, 12],
                                       title: t(strings.TacticView),
                                       ...tacticView,
                                   },
                                   {
                                       size: [3, 12],
                                       title: t(strings.RallyView),
                                       ...rallyView,
                                   },
                                   {
                                       size: [3, 6],
                                       title: t(strings.ProjectView),
                                       ...projectView,
                                   },
                               ]}/>
            </Box>
            <Feedback/>
        </React.Fragment>
    </ThemeProvider>;
}

export default inject('data')(observer(App));
