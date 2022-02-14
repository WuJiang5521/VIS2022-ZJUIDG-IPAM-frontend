import React from 'react';
import {inject, observer} from "mobx-react";
import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import {useTranslation} from "react-i18next";
import strings from "../../static/strings";

function Feedback({system}) {
    const blockError = system.blockError;
    const {t} = useTranslation();
    return <React.Fragment>
        <Dialog open={Boolean(blockError)}>
            <DialogTitle>{t(strings.Error)}</DialogTitle>
            <DialogContent>{blockError}</DialogContent>
        </Dialog>
    </React.Fragment>
}

export default inject('system')(observer(Feedback));
