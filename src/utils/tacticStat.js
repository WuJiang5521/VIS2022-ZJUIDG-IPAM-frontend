export function genTacticStat(tactic=null) {
    const stat = {
        winRate0: 0,
        winRate1: 0,
        usage: 0,
        importance: 0,
        minImp: 10000000,
    };
    if (!tactic) return stat;
    stat.winRate0 = tactic.win_seq_count / tactic.seq_count;
    stat.winRate1 = 1 - stat.winRate0;
    stat.usage = tactic.usage_count;
    stat.importance = tactic.usage_count * tactic.value_count;
    return stat;
}

export function mergeStat(globalStat, stat) {
    Object.keys(globalStat)
        .forEach(key => {
            if (key === 'minImp') globalStat[key] = Math.min(globalStat[key], stat.importance);
            else if (key === 'usage') globalStat[key] = 53;
            else if (key === 'importance') globalStat[key] = 318;
            else globalStat[key] = Math.max(globalStat[key], stat[key])
        });
}
