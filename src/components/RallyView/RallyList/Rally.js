import React, {memo, useRef} from 'react';
import {inject, observer} from "mobx-react";
import {IconButton, Typography} from "@mui/material";
import {PlayArrow, Visibility} from "@mui/icons-material";
import useHover from "../../../utils/useHover";
import useRallyHeight from "./useRallyHeight";
import {useTheme} from "@mui/styles";
import {playerColors, transition} from "../../../static/theme";
import useClick from "../../../utils/useClick";
import styled from "@emotion/styled";

const actionProps = ({
                         visible = false, highlight = false
                     }) => ({
    className: 'action',
    size: 'small',
    sx: {
        transition: 'opacity .1s linear',
        opacity: (highlight || visible) ? 1 : 0,
        color: highlight ? 'error.main' : 'text.primaryText',
    }
})

function Rally({rally, isPlaying, onPlay, isExpand, onExpand, analysis}) {
    const theme = useTheme();

    const rootRef = useRef(null);
    const visible = useHover(rootRef);

    const handleViewDetail = e => {
        e.stopPropagation();
        onExpand(rally);
    }

    const handlePlay = e => {
        e.stopPropagation();
        onPlay(rally);
    }

    const {handleClick, handleDoubleClick} = useClick({
        onClick: handleViewDetail,
        onDoubleClick: handlePlay,
    });

    const {rallyHeight, headHeight, attrHeight, m} = useRallyHeight(analysis.attrs.length);
    const rh = rallyHeight(isExpand), mh = m(isExpand);
    return <Container ref={rootRef}
                      style={{
                          height: rh,
                      }}>
        <Tb style={{margin: [mh, 0]}}>
            <Tr style={{height: headHeight}}
                onClick={handleClick}
                onDoubleClick={handleDoubleClick}>
                <Th style={{maxWidth: isExpand ? 100 : headHeight * 2}}>
                    <IconButton {...actionProps({visible, highlight: isExpand})}
                                onClick={handleViewDetail}>
                        <Visibility/>
                    </IconButton>
                    <IconButton {...actionProps({visible, highlight: isPlaying})}
                                onClick={handlePlay}>
                        <PlayArrow/>
                    </IconButton>
                </Th>

                {rally.rally.map((hit, hId) => {
                    const isTactic = (rally.tacticPos[0] <= hId) && (hId < rally.tacticPos[1]);
                    const color = playerColors[(hId + (rally.is_server ? 0 : 1)) % 2]
                    const bgcolor = isTactic ? color : theme.palette.background.paper;
                    return <Td key={hId}
                        style={{
                            maxWidth: isExpand ? 100 : headHeight,
                            marginLeft: (hId === 0) && (isExpand ? 100 : headHeight * 2),
                        }}>
                        <Hit style={{
                            backgroundColor: bgcolor,
                            color: theme.palette.getContrastText(bgcolor),
                            borderColor: color,
                        }}>{hId + 1}</Hit>
                    </Td>
                })}
            </Tr>
            {analysis.attrs.map((attr, aId) => (
                <Tr key={aId}
                    style={{height: attrHeight}}>
                    <Th style={{maxWidth: isExpand ? 100 : headHeight * 2}}>
                        <Typography variant={'body2'} fontWeight={"bold"}>{attr}</Typography>
                    </Th>

                    {rally.rally.map((hit, hId) => (
                        <Td key={hId}
                            style={{
                                maxWidth: isExpand ? 100 : headHeight,
                                borderTop: `1px solid ${theme.palette.background.default}`,
                                marginLeft: (hId === 0) && (isExpand ? 100 : headHeight * 2),
                            }}>
                            <Typography variant={'body2'}>{hit[aId]}</Typography>
                        </Td>
                    ))}
                </Tr>
            ))}
            {isExpand && <Head style={{
                top: mh,
                height: rh - mh * 4,
                left: isExpand ? 100 : headHeight * 2
            }}/>}
        </Tb>
    </Container>
}

const Container = styled('div')(({theme}) => ({
    transition: transition('height'),
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.background.default,
    overflow: 'hidden',
    position: 'relative',
}))
const Head = styled('div')(({theme}) => ({
    position: 'absolute',
    left: 100,
    transition: transition('left'),
    width: 0,
    borderRight: `1px solid ${theme.palette.background.default}`,
}));
const Tb = styled('div')({
    height: 'fit-content',
    overflow: 'auto hidden',
})
const Tr = styled('div')({
    display: 'flex',
    flexWrap: 'nowrap',
})
const Td = styled('div')(({theme}) => ({
    transition: transition('all'),
    padding: theme.spacing(0, 0.5),
    flex: '0 0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    width: 100,
}))
const Th = styled('div')(({theme}) => ({
    position: 'absolute',
    background: theme.palette.background.paper,
    transition: transition('all'),
    padding: theme.spacing(0, 0.5),
    flex: '0 0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    width: 100,
}));
const Hit = styled('div')({
    borderRadius: '50%',
    width: 21,
    height: 21,
    border: '1px solid',
    lineHeight: '21px',
    textAlign: 'center',
})


export default memo(inject('analysis')(observer(Rally)));
