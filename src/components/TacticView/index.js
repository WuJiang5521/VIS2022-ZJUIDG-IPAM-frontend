/**
 * Created by Jiang Wu on 2022/1/27
 */

import {inject, observer} from "mobx-react";
import {Table, TableBody, TableContainer, TableHead, TableRow} from "@mui/material";
import {Tactic} from "./Tactic";
import useTacticSort, {SortTypes} from "./useTacticSort";
import useTacticStat from "./useTacticStat";
import {useTheme} from "@mui/styles";
import {HeadCell} from "./TableCell";
import {useSize} from "../../utils/useSize";
import {useRef} from "react";

const sortTypes = {
    usage: [SortTypes.UsageDown, SortTypes.UsageUp],
    winRate: [SortTypes.WinRateDown, SortTypes.WinRateUp],
    majority: [SortTypes.MajorityDown, SortTypes.MajorityUp],
}

const TacticView = inject('analysis')(observer(({analysis}) => {
    const tactics = analysis.state.tactics;
    const tacticStats = useTacticStat(tactics);
    const {sortedTactics, sortType, setSortType} = useTacticSort(tacticStats);
    const handleSort = types => selection => setSortType(types[selection]);

    const containerRef = useRef(null);
    const {width} = useSize(containerRef);

    const theme = useTheme();

    return <TableContainer ref={containerRef}
                           sx={{
                               width: `calc(100% - ${theme.spacing(2)})`,
                               height: `calc(100% - ${theme.spacing(2)})`,
                               margin: 1
                           }}>
        <Table stickyHeader sx={{tableLayout: 'fixed'}}>
            <TableHead>
                <TableRow>
                    <HeadCell label={'No.'} width={67}/>
                    <HeadCell label={'Tactic'}/>
                    <HeadCell label={'Usage'} width={120}
                              onSort={handleSort(sortTypes.usage)}
                              sort={sortTypes.usage.indexOf(sortType)}/>
                    <HeadCell label={'Win Rate'} width={120}
                              onSort={handleSort(sortTypes.winRate)}
                              sort={sortTypes.winRate.indexOf(sortType)}/>
                    <HeadCell label={'Majority'} width={120}
                              onSort={handleSort(sortTypes.majority)}
                              sort={sortTypes.majority.indexOf(sortType)}/>
                    <HeadCell label={'Pref.'} width={60} noDivider/>
                </TableRow>
            </TableHead>
            <TableBody>
                {sortedTactics.map((tactic, tId) => (
                    <Tactic key={tId}
                            tactic={tactic}
                            tId={tId}
                            selected={analysis.selectedTactics.includes(tactic.id)}
                            onSelect={selected => analysis.selectTactic(tactic.id, selected)}
                            favorite={analysis.favoriteTactics.includes(tactic.id)}
                            onFavorite={favorite => analysis.favoriteTactic(tactic.id, favorite)}/>
                ))}
            </TableBody>
        </Table>
    </TableContainer>;
}));

const TacticViewToolbar = inject()(observer(({}) => {
    return null;
}));

export default function useTacticView() {
    return {
        view: <TacticView/>,
        toolbar: <TacticViewToolbar/>,
    }
}
