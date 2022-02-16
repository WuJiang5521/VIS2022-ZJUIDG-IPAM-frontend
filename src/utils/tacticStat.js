import randomInt from "./randomInt";

export function genTacticStat(tactic=null) {
    const stat = {
        winRate0: 0,
        winRate1: 0,
        usage: 0,
        majority: 0,
    };
    if (!tactic) return stat;
    stat.winRate0 = tactic.win_seq_count / tactic.seq_count;
    stat.winRate1 = 1 - stat.winRate0;
    stat.usage = tactic.usage_count;
    // TODO: remove the randomInt
    stat.majority = tactic.usage_count * randomInt(4, 12);
    return stat;
}

export function mergeStat(globalStat, stat) {
    Object.keys(globalStat)
        .forEach(key => globalStat[key] = Math.max(globalStat[key], stat[key]));
}
