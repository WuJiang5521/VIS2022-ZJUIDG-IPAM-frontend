import React, {useRef} from 'react';
import {Observer} from "mobx-react";
import {useSize} from "../../../utils/useSize";
import {Box} from "@mui/material";
import {playerColors} from "../../../static/theme";
import {useTheme} from "@mui/styles";
import useMouseOffset from "../../../utils/useMouseOffset";
import useStyleControl from "./useStyleControl";
import HintLine from "./HintLine";
import StackBar from "./StackBar";
import Axis from "./Axis";

function TacticDistribution({rallies}) {
    const theme = useTheme();
    const stat = tacticDistributionStat(rallies);
    const containerRef = useRef(null);
    const renderRef = useRef(null);
    const size = useSize(containerRef);

    const styleControl = useStyleControl(size, stat.stat);
    const {y: offsetY} = useMouseOffset(renderRef);

    return <Observer>
        {() => <Box ref={containerRef} width={'100%'} height={'100%'} overflow={'hidden'}>
            <svg ref={renderRef}
                 width={size.width} height={size.height}
                 style={{position: 'relative'}}
                 viewBox={`0 0 ${size.width + 4} ${size.height + 4}`}>
                <g transform={`translate(2, 2)`}>
                    <Axis maxX={stat.stat.maxX} maxY={stat.stat.maxY}
                          {...size}
                          styleControl={styleControl}/>
                    {stat.distribution.map((bar, bId) => (
                        <StackBar key={bId}
                                  idx={bId} totalCount={stat.distribution.length}
                                  {...size}
                                  value={bar} color={playerColors}
                                  styleControl={styleControl}/>
                    ))}
                    {offsetY !== null && <HintLine y={offsetY}
                                                   color={theme.palette.primary.main}
                                                   bgColor={theme.palette.primary.paper}
                                                   styleControl={styleControl}/>}
                </g>
            </svg>
        </Box>}
    </Observer>
}

const insert = (distribution, idx, win) => {
    while (distribution.length <= idx + 1) distribution.push([0, 0]);
    distribution[idx][win ? 0 : 1] += 1;
    return distribution[idx];
}

function tacticDistributionStat(rallies) {
    const distribution = [];
    let maxX = 0, maxY = 0;
    rallies.forEach(rally => {
        const bar = insert(distribution, rally.index, rally.win)
        maxX = Math.max(distribution.length, maxX);
        maxY = Math.max(bar[0] + bar[1], maxY);
    });
    return {
        stat: {
            maxX,
            maxY,
        },
        distribution,
    };
}

export default TacticDistribution;
