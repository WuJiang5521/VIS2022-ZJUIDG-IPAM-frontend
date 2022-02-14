/**
 * Created by Jiang Wu on 2022/2/14
 */

import React, {useCallback} from 'react';
import {alpha, Box, Chip, darken, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {inject, observer} from "mobx-react";
import {useTheme} from "@mui/styles";

function ItemBox({type, params, selected, onSelect}) {
    const {t} = useTranslation();
    const theme = useTheme();
    const color = selected ? darken(theme.palette.background.default, 0) : theme.palette.background.default;
    const borderColor = selected ? darken(theme.palette.background.default, 0.7) : theme.palette.background.default;
    const tColor = theme.palette.getContrastText(color);
    return <Box bgcolor={color}
                border={'2px solid'}
                borderColor={borderColor}
                borderRadius={1}
                mt={0} mr={1} mb={1} ml={1}
                pt={1} pr={2} pb={1} pl={2}
                cursor={'pointer'}
                transition={'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;'}
                onClick={onSelect}>
        <Typography color={tColor}>{t(type)}</Typography>
        <Box>
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
    </Box>
}

function HistoryItem({query, analysis, idx}) {
    const handleSelect = useCallback(() => analysis.viewHistory(idx), [analysis, idx]);
    return query === null ?
        <ItemBox type={'Init'}
                 selected={analysis.currentViewHistory === idx}
                 onSelect={handleSelect}
        /> :
        <ItemBox type={query.type}
                 params={query.params}
                 selected={analysis.currentViewHistory === idx}
                 onSelect={handleSelect}
        />;
}

export default inject('analysis')(observer(HistoryItem));
