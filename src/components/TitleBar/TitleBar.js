import {inject, observer} from "mobx-react";
import {AppBar, Toolbar} from "@mui/material";
import {useTranslation} from "react-i18next";
import strings from "../../static/strings";

function TitleBar({}) {
    const {t} = useTranslation();
    return <AppBar>
        <Toolbar>
            {t(strings.SystemName)}
        </Toolbar>
    </AppBar>
}

export default inject('data')(observer(TitleBar));
