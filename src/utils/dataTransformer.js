export function tacticTransformer(t, tId) {
    return {
        ...t,
        tactic_surrounding: t.tactic_surrounding.slice(1, t.tactic_surrounding.length - 1),
        fixId: tId,
        fix: false,
    }
}

export function rallyTransformer(r, tId) {
    console.log(r);
    return {
        ...r,
        index: r.index[tId][0],
    }
}
