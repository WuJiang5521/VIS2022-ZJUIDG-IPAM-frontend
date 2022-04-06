/**
 * Created by Jiang Wu on 2022/1/27
 */

import {inject, observer} from "mobx-react";
import {Box} from "@mui/material";
import Point from "./Point";
import winRate2color from "../../utils/winRate2color";
import {useRef, useState} from "react";
import {useSize} from "../../utils/useSize";
import scale from "../../utils/scale";
import tacticSorter, {SortTypes} from "../../utils/tacticSort";
import ProjectViewToolbar from "./Toolbar";
import Axis from "./Axis";
import {Tactic} from "../TacticView/Tactic";

const ProjectView = inject('analysis')(observer(({analysis, minSize = 5, maxSize = 20, sizeEncoding}) => {
    const tactics = analysis.sortedTactics;
    const isPreviewing = analysis.isPreviewing;
    const [previewTactics, indexOfDeleteTactics, indexOfNewTactics] = analysis.previewTactics;

    const sortedTactics = tactics.map((t, tid) => ({
        idxInTacticView: tid,
        ...t,
    })).sort(tacticSorter[sizeEncoding === 'freq' ? SortTypes.UsageDown : SortTypes.ImportanceDown]);
    const [minVal, maxVal] = tactics.length <= 0 ? [0, 0] :
        sizeEncoding === 'freq' ? [0, tactics[0].globalStat.usage] :
            [tactics[0].globalStat.minImp, tactics[0].globalStat.importance];

    const containerRef = useRef(null);
    const {width, height} = useSize(containerRef);

    const scaleSize = scale(
        [minVal, maxVal],
        [minSize, maxSize]
    );

    return <Box width={'100%'} height={'100%'} p={1}>
        <Box ref={containerRef}
             width={'100%'} height={'100%'}
             overflow={'hidden'} position={'relative'}>
            <Axis/>
            {isPreviewing ? (() => {
                    const tactics = previewTactics.map((t, tId) => {
                        const isSelected = analysis.selectedTactics.includes(t.fixId);
                        const r = scaleSize(sizeEncoding === 'freq' ? t.usage_count : t.stat.importance);
                        const dir = t.x * Math.PI * 2, dis = Math.pow(t.y, 0.5) / 2 * 0.8;
                        const cx = width / 2 + dis * width * Math.cos(dir),
                            cy = height / 2 + dis * height * Math.sin(dir);
                        return [
                            (tId < indexOfDeleteTactics) ? 1 : ((tId < indexOfNewTactics) ? 2 : 0),
                            tId,
                            <Point key={t.id}
                                   id={(t.newSortedIndex === -1 ? t.sortedIndex : t.newSortedIndex) + 1}
                                   fixId={t.fixId}
                                   t={t}
                                   cx={cx}
                                   cy={cy}
                                   r={r}
                                   color={winRate2color(t.stat.winRate0)}
                                   isHovered={analysis.hoveredTactic === t.fixId}
                                   onHover={analysis.hoverTactic}
                                   isSelected={isSelected}
                                   isDeleting={tId < indexOfDeleteTactics}
                                   isCache={tId >= indexOfDeleteTactics && tId < indexOfNewTactics}
                                   isFavorite={analysis.favoriteTactics.includes(t.fixId)}/>
                        ]
                    });
                    tactics.sort(([a0, a1], [b0, b1]) => (a0 === b0) ? (a1 - b1) : (a0 - b0));
                    return tactics.map(x => x[2]);
                })() :
                sortedTactics.map(t => {
                    const isSelected = analysis.selectedTactics.includes(t.fixId);
                    const r = scaleSize(sizeEncoding === 'freq' ? t.usage_count : t.stat.importance);
                    const dir = t.x * Math.PI * 2, dis = Math.pow(t.y, 0.5) / 2 * 0.8;
                    const cx = width / 2 + dis * width * Math.cos(dir),
                        cy = height / 2 + dis * height * Math.sin(dir);
                    return <Point key={t.id}
                                  id={t.idxInTacticView + 1}
                                  fixId={t.fixId}
                                  t={t}
                                  cx={cx}
                                  cy={cy}
                                  r={r}
                                  color={winRate2color(t.stat.winRate0)}
                                  isHovered={analysis.hoveredTactic === t.fixId}
                                  isSelected={isSelected}
                                  isFavorite={analysis.favoriteTactics.includes(t.fixId)}
                                  isCache={false}
                                  onSelect={() => analysis.selectTactic(t.fixId, !isSelected)}
                                  onHover={analysis.hoverTactic}/>
                })}
        </Box>
    </Box>;
}));

export default function useProjectView() {
    const [sizeEncoding, setSizeEncoding] = useState('imp');
    return {
        view: <ProjectView sizeEncoding={sizeEncoding}/>,
        toolbar: <ProjectViewToolbar sizeEncoding={sizeEncoding} setSizeEncoding={setSizeEncoding}/>,
    }
}
