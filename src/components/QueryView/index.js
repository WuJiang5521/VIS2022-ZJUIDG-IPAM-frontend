/**
 * Created by Jiang Wu on 2022/1/27
 */

import {inject, observer} from "mobx-react";
import {useState} from "react";
import {Box, Button, Stack, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {Check, DataObject, Preview, Textsms} from "@mui/icons-material";
import NLQuery from "./NLQuery";
import FormQuery from "./FormQuery";
import QueryHistory from "./QueryHistory";
import {useQueryParams} from "./useQueryParams";
import {useTranslation} from "react-i18next";
import strings from "../../static/strings";

const QueryView = inject()(observer(({
                                         inputMethod,
                                         queryParams,
                                     }) => {

    return <Stack width={'100%'}
                  height={'100%'}>
        <Box margin={1}
             flex={'0 0 auto'}>
            <Box>
                {inputMethod === 'form' && <FormQuery {...queryParams}/>}
                {inputMethod === 'nlp' && <NLQuery {...queryParams}/>}
            </Box>
        </Box>
        <Box margin={1}
             marginTop={0}
             flex={1}
             overflow={'hidden'}>
            <QueryHistory/>
        </Box>
    </Stack>;
}));

const QueryViewToolbar = inject()(observer(({
                                                inputMethod, setInputMethod,
                                                applicable,
                                            }) => {
    const {t} = useTranslation();
    return <Box display={'flex'}
                justifyContent={'right'}
                alignItems={'center'}>
        {/*<ToggleButtonGroup value={inputMethod}*/}
        {/*                   exclusive*/}
        {/*                   onChange={(_, newVal) => {*/}
        {/*                       if (newVal) setInputMethod(newVal)*/}
        {/*                   }}*/}
        {/*                   sx={{marginLeft: 1, marginRight: 1}}>*/}
        {/*    <ToggleButton value={'nlp'}*/}
        {/*                  sx={{padding: '2px'}}>*/}
        {/*        <Textsms/>*/}
        {/*    </ToggleButton>*/}
        {/*    <ToggleButton value={'form'}*/}
        {/*                  sx={{padding: '2px'}}>*/}
        {/*        <DataObject/>*/}
        {/*    </ToggleButton>*/}
        {/*</ToggleButtonGroup>*/}

        <Button size={"small"}
                disabled={!applicable}
                sx={{paddingTop: '3px', paddingBottom: '3px'}}>
            <Preview/>
            {t(strings.PreviewChange)}
        </Button>
        <Button size={"small"}
                disabled={!applicable}
                sx={{paddingTop: '3px', paddingBottom: '3px'}}>
            <Check/>
            {t(strings.ApplyChange)}
        </Button>
    </Box>;
}));

export default function useQueryView() {
    const [inputMethod, setInputMethod] = useState('form');
    const queryParams = useQueryParams();

    return {
        view: <QueryView inputMethod={inputMethod} queryParams={queryParams}/>,
        toolbar: <QueryViewToolbar
            inputMethod={inputMethod} setInputMethod={setInputMethod}
            applicable={queryParams.isApplicable()}/>,
    }
}
