/**
 * Created by Jiang Wu on 2022/2/14
 */

import React, {useCallback, useRef} from 'react';
import {alpha, Box, Chip, darken, lighten, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {inject, observer} from "mobx-react";
import {useTheme} from "@mui/styles";
import formatTime from "../../utils/formatTime";
import {ArrowDownward, ArrowUpward, Remove} from "@mui/icons-material";
import {useHover} from "ahooks";
import {transition} from "../../static/theme";

function Offset({val, offset, label}) {
    const captionStyle = {
        sx: {
            fontSize: '0.75rem',
            lineHeight: 1.66,
            letterSpacing: '0.033333em',
            fontWeight: 400,
            verticalAlign: 'middle',
        }
    }

    return <Typography {...captionStyle}>
        {label}:
        {val}
        <Box component={'span'}
             ml={0.5}
             sx={{
                 color: offset > 0 ? 'error.main' :
                     (offset === 0 ? 'text.default' :
                         'success.main')
             }}>
            {offset > 0 && <ArrowUpward {...captionStyle}/>}
            {offset === 0 && <Remove {...captionStyle}/>}
            {offset < 0 && <ArrowDownward {...captionStyle}/>}
            {Math.abs(offset)}
        </Box>
    </Typography>
}

function ItemBox({idx, type, text, params, selected, onSelect, time, dl, dlOffset, tc, tcOffset}) {
    const {t} = useTranslation();
    const theme = useTheme();
    const bgcolor = lighten(theme.palette.background.default, 0.6);
    const color = selected ? darken(bgcolor, 0) : bgcolor;
    const borderColor = selected ? darken(bgcolor, 0.7) : bgcolor;
    const tColor = theme.palette.getContrastText(color);
    const captionStyle = {
        sx: {
            fontSize: '0.75rem',
            lineHeight: 1.66,
            letterSpacing: '0.033333em',
            fontWeight: 400,
            verticalAlign: 'middle',
        }
    }
    const ref = useRef(null);
    const isHovered = useHover(ref);

    const showDetail = isHovered || selected;

    return <Box ref={ref}
                bgcolor={color}
                border={'2px solid'}
                borderColor={borderColor}
                borderRadius={1}
                mt={0} mr={1} mb={1} ml={1}
                pt={1} pr={2} pb={1} pl={2}
                onClick={onSelect}
                overflow={'hidden'}
                sx={{
                    height: showDetail ? 100 : 24 + parseInt(theme.spacing(2)),
                    cursor: 'pointer',
                    transition: transition('all'),
                    '&:hover': {
                        bgcolor: darken(bgcolor, 0.1),
                    },
                }}>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={"center"}>
            <Typography {...captionStyle}>{formatTime(time)}</Typography>
            <Typography color={tColor}>{text}</Typography>
        </Box>

        <Box display={'flex'} justifyContent={'space-between'} alignItems={"center"}>
            <Typography color={tColor}>{t(type)}</Typography>
            <Offset val={tc} label={'Tac. Num'} offset={tcOffset}/>
        </Box>

        <Box display={'flex'} justifyContent={'space-between'} alignItems={"center"}>
            <Box flex={1}>
                {Object.entries(params || {})
                    .map(([key, val]) => (
                        <Chip key={key}
                              size={"small"}
                              label={`${key}: ${val}`}
                              sx={{
                                  m: 0.5,
                                  background: alpha(tColor, 0.18),
                                  color: tColor,
                              }}/>
                    ))}
            </Box>
            <Offset val={dl} label={'Score'} offset={dlOffset}/>
        </Box>
    </Box>
}

function HistoryItem({query, analysis, idx, ...props}) {
    const handleSelect = useCallback(() => analysis.viewHistory(idx), [analysis, idx]);
    const itemBoxProps = {
        idx,
        params: query?.params,
        selected: analysis.currentViewHistory === idx,
        onSelect: handleSelect,
        ...props,
    }
    return (query === null) ?
        <ItemBox type={'Init'}
                 text={'Initially mine tactics.'}
                 {...itemBoxProps}/> :
        <ItemBox type={query.type}
                 text={query.text}
                 {...itemBoxProps}/>;
}

export default inject('analysis')(observer(HistoryItem));
