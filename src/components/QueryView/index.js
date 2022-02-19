/**
 * Created by Jiang Wu on 2022/1/27
 */

import {inject, observer} from "mobx-react";
import {Box, Button, Stack} from "@mui/material";
import {Check, Undo, Visibility} from "@mui/icons-material";
import NLQuery from "./NLQuery";
import QueryHistory from "./QueryHistory";
import {useQueryParams} from "./useQueryParams";
import {useTranslation} from "react-i18next";
import strings from "../../static/strings";

const QueryView = inject()(observer(({
                                         queryParams,
                                     }) => {

    return <Stack width={'100%'}
                  height={'100%'}>
        <Box margin={1}
             flex={'0 0 auto'}>
            <NLQuery {...queryParams}/>
        </Box>
        <Box margin={1}
             marginTop={0}
             flex={1}
             overflow={'hidden'}>
            <QueryHistory/>
        </Box>
    </Stack>;
}));

const QueryViewToolbar = inject('analysis')(observer(({
                                                          analysis,
                                                          queryParams,
                                                      }) => {
    const applicable = queryParams.isApplicable();

    const {t} = useTranslation();
    const style = {
        pt: 0.25,
        pb: 0.25,
        mr: 1,
    }
    return <Box display={'flex'}
                height={'100%'}
                justifyContent={'right'}
                alignItems={'center'}>
        {!applicable && <Button size={'small'}
                                disabled={analysis.history.length <= 1}
                                startIcon={<Undo/>}
                                sx={style}
                                onClick={analysis.undo}>
            {t(strings.Undo)}
        </Button>}
        {applicable && <Button size={"small"}
                               startIcon={<Visibility/>}
                               sx={style}
                               onClick={() => analysis.preview(queryParams)}>
            {t(strings.PreviewChange)}
        </Button>}
        {applicable && <Button size={"small"}
                               startIcon={<Check/>}
                               sx={style}
                               onClick={analysis.applyChange}>
            {t(strings.ApplyChange)}
        </Button>}
    </Box>;
}));

export default function useQueryView() {
    const queryParams = useQueryParams();

    return {
        view: <QueryView queryParams={queryParams}/>,
        toolbar: <QueryViewToolbar queryParams={queryParams}/>,
    }
}
