/**
 * Created by Jiang Wu on 2022/1/27
 */

import {inject, observer} from "mobx-react";
import {Box} from "@mui/material";
import useTacticStat from "../TacticView/useTacticStat";
import Point from "./Point";
import winRate2color from "../../utils/winRate2color";

const ProjectView = inject('analysis')(observer(({analysis}) => {
    const tacticStat = useTacticStat(analysis.state.tactics);
    const sortedTactics = tacticStat.map(t => t).sort((t1, t2) => 0);

    return <Box>
        {sortedTactics.map(t => {
            const isSelected = analysis.selectedTactics.includes(t.fixId);
            return <Point key={t.id}
                          t={t}
                          cx={t.x}
                          cy={t.y}
                          r={t.usage_count}
                          color={winRate2color(t.stat.winRate0)}
                          isHovered={analysis.hoveredTactic === t.fixId}
                          isSelected={isSelected}
                          isFavorite={analysis.favoriteTactics.includes(t.fixId)}
                          isCache={false}
                          onSelect={() => analysis.selectTactic(t.fixId, !isSelected)}/>
        })}
    </Box>;
}));

const ProjectViewToolbar = inject()(observer(({}) => {
    return null;
}));

export default function useProjectView() {
    return {
        view: <ProjectView/>,
        toolbar: <ProjectViewToolbar/>,
    }
}
