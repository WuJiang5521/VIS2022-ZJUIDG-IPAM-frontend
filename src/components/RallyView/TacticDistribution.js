import React, {useRef} from 'react';
import {inject, observer} from "mobx-react";
import {Layer, Stage} from "react-konva";
import {useSize} from "../../utils/useSize";
import {Box} from "@mui/material";

function TacticDistribution({rallies}) {
    const stat = useTacticDistributionStat(rallies);
    const containerRef = useRef(null);
    const size = useSize(containerRef);
    return <Box ref={containerRef} width={'100%'} height={'100%'} overflow={'hidden'}>
        <Stage {...size}>
            <Layer>

            </Layer>
        </Stage>
    </Box>
}

function useTacticDistributionStat(rallies) {
    return {

    }
}

export default inject()(observer(TacticDistribution));
