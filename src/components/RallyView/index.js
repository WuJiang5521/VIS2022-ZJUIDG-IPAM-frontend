/**
 * Created by Jiang Wu on 2022/1/27
 */

import {inject, observer} from "mobx-react";
import {Box, Stack} from "@mui/material";
import TacticDistribution from "./TacticDistribution";
import RallyList from "./RallyList";
import VideoPlayer from "./VideoPlayer";

const RallyView = inject('analysis')(observer(({analysis}) => {
    const rallies = analysis.ralliesOfSelectedTactics;
    return <Stack width={'100%'} height={'100%'}
                  p={1}>
        <Box mb={1} flex={'0 0 150px'} overflow={'hidden'}>
            <TacticDistribution rallies={rallies}/>
        </Box>
        <Box mb={1} flex={'1 0 0%'} overflow={'hidden'}>
            <RallyList/>
        </Box>
        <Box mb={1} flex={'1 0 0%'} overflow={'hidden'}>
            <RallyList/>
        </Box>
        <Box flex={'0 0 auto'} overflow={'hidden'}>
            <VideoPlayer/>
        </Box>
    </Stack>;
}));

const RallyViewToolbar = inject()(observer(({}) => {
    return null;
}));

export default function useRallyView() {
    return {
        view: <RallyView/>,
        toolbar: <RallyViewToolbar/>,
    }
}
