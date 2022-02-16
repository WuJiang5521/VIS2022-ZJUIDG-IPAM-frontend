/**
 * Created by Jiang Wu on 2022/2/15
 */

import {memo} from 'react';
import {Box, Typography} from "@mui/material";

function Point({
                   id,
                   t,
                   cx,
                   cy,
                   r,
                   color,
                   isHovered,
                   isSelected,
                   isFavorite,
                   isCache,
                   onSelect,
               }) {
    return <Box position={'absolute'}
                sx={{transform: `translate(${cx}px, ${cy}px)`}}
                width={0}
                height={0}
                overflow={'visible'}>
        <Box width={r * 2}
             height={r * 2}
             borderRadius={`${r}px`}
             bgcolor={color}
             textAlign={'center'}
             lineHeight={`${r * 2}px`}
             sx={{
                 fontSize: '0.75rem',
                 fontWeight: 400,
                 letterSpacing: '0.03333em',
                 transform: `translate(-${r}px, -${r}px)`,
                 cursor: 'pointer',
                 '&:hover': {
                     outline: '-webkit-focus-ring-color auto 1px'
                 }
             }}>
            <Typography variant={'caption'}>{id}</Typography>
        </Box>
    </Box>;
}

export default memo(Point);
