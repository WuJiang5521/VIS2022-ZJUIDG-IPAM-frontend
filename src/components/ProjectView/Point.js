/**
 * Created by Jiang Wu on 2022/2/15
 */

import {memo} from 'react';
import {Box} from "@mui/material";

function Point({
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
                transform={`translate(${cx}px, ${cy}px)`}
                borderRadius={`${r}px`}
                width={r * 2}
                height={r * 2}
                bgcolor={color}/>;
}

export default memo(Point);
