import {Menu as MenuIcon} from "@mui/icons-material";
import {IconButton, Menu, MenuItem} from "@mui/material";
import React, {useState} from "react";
import {inject, observer} from "mobx-react";


function SystemMenu({analysis}) {
    const handleSave = analysis.saveProject;
    const handleLoad = analysis.loadProject;
    const handleDemo = analysis.useDemo;

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleClickMenu = func => () => {
        handleClose();
        func();
    }

    return <>
        <IconButton size={"small"} sx={{verticalAlign: 'top', color: 'white'}}
                    onClick={handleClick}>
            <MenuIcon/>
        </IconButton>
        <Menu anchorEl={anchorEl}
              open={open}
              onClose={handleClose}>
            <MenuItem onClick={handleClickMenu(handleLoad)}>Open</MenuItem>
            <MenuItem onClick={handleClickMenu(handleSave)}>Save</MenuItem>
            <MenuItem onClick={handleClickMenu(handleDemo)}>Play Demo</MenuItem>
        </Menu>
    </>
}

export default inject('analysis')(observer(SystemMenu));
