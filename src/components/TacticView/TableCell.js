import React from 'react';
import {Box, IconButton, TableCell as MuiTableCell, Typography} from "@mui/material";
import {ArrowDownward, ArrowUpward, Sort} from "@mui/icons-material";

function TableCell({children, width}) {
    return <MuiTableCell sx={{
        bgcolor: 'background.paper',
        pt: 0, pb: 0, pl: 1, pr: 1,
        width,
        height: 40,
    }}>
        {children}
    </MuiTableCell>
}

export function BodyCell({children}) {
    return <TableCell>
        {children}
    </TableCell>
}

export function HeadCell({label, width, onSort, sort, noDivider}) {
    return <TableCell width={width}>
        {onSort && <IconButton size={'small'}
                               onClick={() => onSort((1 - sort) % 2)}
                               sx={{fontSize: '1rem', verticalAlign: 'top'}}>
            {sort === -1 && <Sort/>}
            {sort === 0 && <ArrowDownward/>}
            {sort === 1 && <ArrowUpward/>}
        </IconButton>}
        <Typography sx={{display: 'inline-block', pt: '5px', pb: '5px'}}>{label}</Typography>
        {!noDivider && <Box className={'divider'}
                            position={'absolute'}
                            right={-2}
                            width={4}
                            top={10}
                            bottom={10}
                            bgcolor={'background.default'}/>}
    </TableCell>
}
