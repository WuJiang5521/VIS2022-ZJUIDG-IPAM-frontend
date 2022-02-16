/**
 * Created by Jiang Wu on 2022/2/14
 */

import React, {useCallback} from 'react';
import {alpha, Box, Chip, darken, lighten, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {inject, observer} from "mobx-react";
import {useTheme} from "@mui/styles";
import formatTime from "../../utils/formatTime";
import {ArrowDownward, ArrowUpward, Remove} from "@mui/icons-material";

function ItemBox({idx, type, params, selected, onSelect, time, dl, dlOffset}) {
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

    return <Box bgcolor={color}
                border={'2px solid'}
                borderColor={borderColor}
                borderRadius={1}
                mt={0} mr={1} mb={1} ml={1}
                pt={1} pr={2} pb={1} pl={2}
                transition={'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;'}
                onClick={onSelect}
                sx={{
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: darken(bgcolor, 0.1)
                    },
                }}>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={"center"}>
            <Typography color={tColor}>{idx}. {t(type)}</Typography>
            <Typography {...captionStyle}>{formatTime(time)}</Typography>
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
            <Typography {...captionStyle}>
                {dl}
                <Box component={'span'}
                     ml={0.5}
                     sx={{
                         color: dlOffset > 0 ? 'error.main' :
                             (dlOffset === 0 ? tColor :
                                 'success.main')
                     }}>
                    {dlOffset > 0 && <ArrowUpward {...captionStyle}/>}
                    {dlOffset === 0 && <Remove {...captionStyle}/>}
                    {dlOffset < 0 && <ArrowDownward {...captionStyle}/>}
                    {Math.abs(dlOffset)}
                </Box>
            </Typography>
        </Box>
    </Box>
}

function HistoryItem({query, analysis, idx, time, dl, dlOffset}) {
    const handleSelect = useCallback(() => analysis.viewHistory(idx), [analysis, idx]);
    return query === null ?
        <ItemBox idx={idx}
                 type={'Init'}
                 selected={analysis.currentViewHistory === idx}
                 onSelect={handleSelect}
                 time={time}
                 dl={dl}
                 dlOffset={dlOffset}
        /> :
        <ItemBox idx={idx}
                 type={query.type}
                 params={query.params}
                 selected={analysis.currentViewHistory === idx}
                 onSelect={handleSelect}
                 time={time}
                 dl={dl}
                 dlOffset={dlOffset}
        />;
}

export default inject('analysis')(observer(HistoryItem));
