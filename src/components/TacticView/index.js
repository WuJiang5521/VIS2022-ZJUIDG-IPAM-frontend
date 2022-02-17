/**
 * Created by Jiang Wu on 2022/1/27
 */

import {inject, observer} from "mobx-react";
import {Table, TableBody, TableContainer, TableHead, TableRow} from "@mui/material";
import {Tactic} from "./Tactic";
import {SortTypes} from "../../utils/tacticSort";
import {useTheme} from "@mui/styles";
import {HeadCell} from "./TableCell";

const sortTypes = {
    usage: [SortTypes.UsageDown, SortTypes.UsageUp],
    winRate: [SortTypes.WinRateDown, SortTypes.WinRateUp],
    majority: [SortTypes.MajorityDown, SortTypes.MajorityUp],
}

const TacticView = inject('analysis')(observer(({analysis}) => {
    const sortType = analysis.sortType;
    const setSortType = analysis.setSortType;
    const sortedTactics = analysis.sortedTactics;
    const handleSort = types => selection => setSortType(types[selection]);

    const theme = useTheme();

    return <TableContainer id={'tactic-table'}
                           sx={{
                               width: `calc(100% - ${theme.spacing(2)})`,
                               height: `calc(100% - ${theme.spacing(2)})`,
                               m: 1,
                               pr: 1,
                           }}
                           onScroll={console.log}>
        <Table stickyHeader sx={{tableLayout: 'fixed'}}>
            <TableHead>
                <TableRow>
                    <HeadCell label={'No.'} width={67}/>
                    <HeadCell label={'Tactic'}/>
                    <HeadCell label={'Freq.'} width={120}
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
                            selected={analysis.selectedTactics.includes(tactic.fixId)}
                            onSelect={selected => analysis.selectTactic(tactic.fixId, selected)}
                            favorite={analysis.favoriteTactics.includes(tactic.fixId)}
                            onFavorite={favorite => analysis.favoriteTactic(tactic.fixId, favorite)}/>
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
