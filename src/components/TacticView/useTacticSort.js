import {useState} from "react";

export const SortTypes = {
    MajorityDown: 'MajorityDown',
    MajorityUp: 'MajorityUp',
    UsageDown: 'UsageDown',
    UsageUp: 'UsageUp',
    WinRateDown: 'WinRateDown',
    WinRateUp: 'WinRateUp',
}

const tacticSorter = {
    [SortTypes.MajorityDown]: (t1, t2) => 0,
    [SortTypes.MajorityUp]: (t1, t2) => 0,
    [SortTypes.UsageDown]: (t1, t2) => 0,
    [SortTypes.UsageUp]: (t1, t2) => 0,
    [SortTypes.WinRateDown]: (t1, t2) => 0,
    [SortTypes.WinRateUp]: (t1, t2) => 0,
}

export default function useTacticSort(tactics) {
    const [sortType, setSortType] = useState('MajorityDown');
    return {
        sortType,
        setSortType,
        sortedTactics: tactics.map(t => t).sort(tacticSorter[sortType]),
    }
}
