/**
 * Created by Jiang Wu on 2022/2/15
 */

import {memo} from 'react';
import {Typography} from "@mui/material";
import styled from "@emotion/styled";

const hoverStyle = {
    border: '1px solid grey',
}

const oriStyle = {
    border: '1px solid black',
}

const newStyle = {
    border: '1px dashed black',
}

function Point({
                   id,
                   fixId,
                   t,
                   cx,
                   cy,
                   r,
                   color,
                   isHovered,
                   isSelected,
                   isFavorite,
                   isDeleting,
                   isCache,
                   onSelect,
                   onHover,
               }) {
    const handleMouseEnter = () => onHover(fixId, true);
    const handleMouseLeave = () => onHover(fixId, false);

    return <Pos style={{transform: `translate(${cx}px, ${cy}px)`}}>
        <P style={{
            width: r * 2,
            height: r * 2,
            borderRadius: `${r}px`,
            backgroundColor: color,
            lineHeight: `${r * 2}px`,
            transform: `translate(-${r}px, -${r}px)`,
            ...((isHovered || isSelected) && hoverStyle),
            ...((isDeleting) && oriStyle),
            ...((isCache) && newStyle),
        }} onMouseEnter={handleMouseEnter}
           onMouseLeave={handleMouseLeave}>
            {(!isDeleting) && (id < 10 || isHovered) && <Typography variant={'caption'}>{id}</Typography>}
            {isDeleting && <Typography>-</Typography>}
            {/*{isCache && <Typography>+</Typography>}*/}
        </P>
    </Pos>;
}

const Pos = styled('div')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    overflow: 'visible',
});

const P = styled('div')({
    fontSize: '0.75rem',
    fontWeight: 400,
    letterSpacing: '0.03333em',
    textAlign: 'center',
    cursor: 'pointer',
})

export default memo(Point);
