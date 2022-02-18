/**
 * Created by Jiang Wu on 2022/1/29
 */

import {inject, observer} from "mobx-react";
import {Box, Divider, IconButton} from "@mui/material";
import FormQuery from "./FormQuery";
import {useCallback, useState} from "react";
import {useTheme} from "@mui/styles";
import {Close, KeyboardVoice} from "@mui/icons-material";
import {transition} from "../../static/theme";
import styled from '@emotion/styled';

const Input = styled('input')({
    border: 'none',
    height: 34,
    width: '100%',
    '&:focus': {
        border: 'none',
    },
    '&:focus-visible': {
        outline: 'none',
    },
    '&:active': {
        border: 'none',
    }
})

function NLQuery({queryParams, setQueryParams, clearQueryParams}) {
    const [focus, setFocus] = useState(false);
    const handleFocus = useCallback(() => setFocus(true), []);
    const handleBlur = useCallback(() => setTimeout(() => setFocus(false), 100), []);

    const [inputForm, setInputForm] = useState(false);
    const handleInputForm = useCallback(() => setInputForm(true), []);
    const handleFinishInput = useCallback(() => setInputForm(false), []);

    const [text, setText] = useState('');
    const handleChangeText = e => setText(e.target.value);
    const handleClear = () => {
        setText('');
        clearQueryParams();
    };
    const handleProcessText = () => {
        console.log(text);
    }

    const expanded = focus || inputForm || queryParams.type !== null;

    const theme = useTheme();
    return <Box borderRadius={1}
                p={1}
                overflow={'hidden'}
                height={expanded ? 68 + parseInt(theme.spacing(4)) : 34 + parseInt(theme.spacing(2))}
                sx={{
                    transition: transition('height'),
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '-internal-light-dark(rgb(118,118,118), rgb(133,133,133))',
                    outline: focus ? '-webkit-focus-ring-color auto 1px' : undefined,
                    outlineOffset: '0px',
                }}>
        <Box display={'flex'}>
            <Input onFocus={handleFocus} onBlur={handleBlur}
                   value={text}
                   onChange={handleChangeText}
                   onKeyDown={e => (e.key === 'Enter') && handleProcessText()}/>
            {(queryParams.type === null && text === '') ?
                <IconButton size={"small"} flex={0}>
                    <KeyboardVoice/>
                </IconButton> :
                <IconButton size={"small"} flex={0}
                            onClick={handleClear}>
                    <Close/>
                </IconButton>}
        </Box>
        <Divider sx={{m: 1}}/>
        <FormQuery queryParams={queryParams}
                   setQueryParams={setQueryParams}
                   clearQueryParams={clearQueryParams}
                   onStart={handleInputForm}
                   onEnd={handleFinishInput}/>
    </Box>;
}

export default inject()(observer(NLQuery));
