import React from 'react';
import {inject, observer} from "mobx-react";
import {Alert, Backdrop, CircularProgress, Dialog, DialogContent, DialogTitle, Snackbar} from "@mui/material";
import {useTranslation} from "react-i18next";
import strings from "../../static/strings";

function Feedback({system}) {
    const blockError = system.blockError;
    const {t} = useTranslation();
    const handleCloseAlert = system.clearAlert;

    const wait = system.wait;

    return <React.Fragment>
        <Dialog open={Boolean(blockError)}>
            <DialogTitle>{t(strings.Error)}</DialogTitle>
            <DialogContent>{blockError}</DialogContent>
        </Dialog>
        <Backdrop open={wait}
                  sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}>
            <CircularProgress color="inherit"/>
        </Backdrop>
        <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                  open={system.alertText !== ''}
                  autoHideDuration={6000}
                  onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} severity={'warning'} elevation={4}>
                {system.alertText}
            </Alert>
        </Snackbar>
    </React.Fragment>
}

export default inject('system')(observer(Feedback));
