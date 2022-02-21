/**
 * Created by Jiang Wu on 2022/1/27
 */

import {inject, observer} from "mobx-react";
import {Box} from "@mui/material";
import Point from "./Point";
import winRate2color from "../../utils/winRate2color";
import {useRef} from "react";
import {useSize} from "../../utils/useSize";
import scale from "../../utils/scale";
import tacticSorter, {SortTypes} from "../../utils/tacticSort";
import ProjectViewToolbar from "./Toolbar";

const ProjectView = inject('analysis')(observer(({analysis, minSize = 5, maxSize = 20}) => {
    const tactics = analysis.sortedTactics;
    const sortedTactics = tactics.map((t, tid) => ({
        idxInTacticView: tid,
        ...t,
    })).sort(tacticSorter[SortTypes.UsageDown]);
    const maxUsage = tactics.length > 0 ? tactics[0].globalStat.usage : 0;

    const containerRef = useRef(null);
    const {width, height} = useSize(containerRef);

    const scaleSize = scale(
        [0, maxUsage],
        [minSize, maxSize]
    );

    return <Box width={'100%'} height={'100%'} p={1}>
        <Box ref={containerRef}
             width={'100%'} height={'100%'}
             overflow={'hidden'} position={'relative'}>
            {sortedTactics.map(t => {
                const isSelected = analysis.selectedTactics.includes(t.fixId);
                return <Point key={t.id}
                              id={t.idxInTacticView + 1}
                              t={t}
                              cx={t.x * width}
                              cy={t.y * height}
                              r={scaleSize(t.usage_count)}
                              color={winRate2color(t.stat.winRate0)}
                              isHovered={analysis.hoveredTactic === t.fixId}
                              isSelected={isSelected}
                              isFavorite={analysis.favoriteTactics.includes(t.fixId)}
                              isCache={false}
                              onSelect={() => analysis.selectTactic(t.fixId, !isSelected)}/>
            })}
        </Box>
    </Box>;
}));

export default function useProjectView() {
    return {
        view: <ProjectView/>,
        toolbar: <ProjectViewToolbar/>,
    }
}
