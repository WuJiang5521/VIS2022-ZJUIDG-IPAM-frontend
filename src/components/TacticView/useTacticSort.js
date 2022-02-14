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
    [SortTypes.MajorityDown]: (t1, t2) => t2.stat.majority - t1.stat.majority,
    [SortTypes.MajorityUp]: (t1, t2) => t1.stat.majority - t2.stat.majority,
    [SortTypes.UsageDown]: (t1, t2) => t2.usage_count - t1.usage_count,
    [SortTypes.UsageUp]: (t1, t2) => t1.usage_count - t2.usage_count,
    [SortTypes.WinRateDown]: (t1, t2) => t2.stat.winRate0 - t1.stat.winRate0,
    [SortTypes.WinRateUp]: (t1, t2) => t1.stat.winRate0 - t2.stat.winRate0,
}

export default function useTacticSort(tactics) {
    const [sortType, setSortType] = useState('MajorityDown');
    return {
        sortType,
        setSortType,
        sortedTactics: tactics.map(t => t).sort(tacticSorter[sortType]),
    }
}
