/**
 * Created by Jiang Wu on 2022/1/25
 */

import React from 'react';
import {Box, MenuItem, TextField, Typography} from "@mui/material";

function Select({label, options, value, onChange, sx, multiple}) {
    return <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
        <Typography sx={sx && sx.label}>
            {label}:
        </Typography>
        <Box sx={{ marginRight: 1 }}/>
        <TextField select
                   SelectProps={{multiple}}
                   size={"small"}
                   sx={sx && sx.select}
                   value={value}
                   onChange={onChange}
                   variant={'standard'}>
            {options.map(item => {
                const value = item.value || item;
                const label = item.label || item.value || item;
                return <MenuItem key={value}
                                 value={value}>{label}</MenuItem>
            })}
        </TextField>
    </Box>;
}

export default React.memo(Select);
