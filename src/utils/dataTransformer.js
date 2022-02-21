export function tacticTransformer(t, tId) {
    return {
        ...t,
        fixId: tId,
        fix: false,
    }
}
