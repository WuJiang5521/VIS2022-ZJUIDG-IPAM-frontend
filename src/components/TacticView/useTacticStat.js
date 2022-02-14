import randomInt from "../../utils/randomInt";

function genTacticStat(tactic=null) {
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

function mergeStat(globalStat, stat) {
    Object.keys(globalStat)
        .forEach(key => globalStat[key] = Math.max(globalStat[key], stat[key]));
}

export default function useTacticStat(tactics) {
    const globalStat = genTacticStat();
    return tactics.map(tactic => {
        const stat = genTacticStat(tactic);
        mergeStat(globalStat, stat);
        return {
            ...tactic,
            stat,
            globalStat,
        }
    })
}
