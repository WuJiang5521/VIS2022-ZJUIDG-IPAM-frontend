import uuid4 from "./uuid4";
import randomInt from "./randomInt";

const values = [
    ['a', 'b', 'c', 'd', 'e'],
    ['A', 'B', 'C'],
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'],
]

function genValue(attrKey, count=1) {
    const availVal = values[attrKey];
    if (count === 1) return availVal[randomInt(availVal.length)];

    const res = {};
    let remainCount = count;
    while (remainCount !== 0) {
        const c = randomInt(1, remainCount + 1);
        const val = availVal[randomInt(availVal.length)];
        if (!res.hasOwnProperty(val)) res[val] = 0;
        res[val] += c;
        remainCount -= c;
    }
    return res;
}

function genHit([single, multi], count=1) {
    return [0, 1, 2, 3].map(attrKey => {
        if (Math.random() < single / (single + multi)) return genValue(attrKey, count);
        else return genValue(attrKey, count)
    })
}

export function virtualTactic() {
    const seq_count = randomInt(50, 100);
    const win_seq_count = randomInt(10, seq_count);
    const double_usage_count = randomInt(5, seq_count);
    const double_usage_win_seq_count = randomInt(Math.min(win_seq_count, double_usage_count));
    const usage_count = seq_count + double_usage_count;

    const tactic = [...new Array(randomInt(2, 7))].map(() => genHit([0.6, 0.4], usage_count))

    return {
        id: uuid4(),

        tactic: tactic.map(hit => hit.map(val => (typeof val === 'string') ? val : null)),
        tactic_surrounding: tactic.map(hit => hit.map(val => (typeof val !== 'string') ? val : null)),

        seq_count,
        win_seq_count,
        usage_count,
        win_usage_count: win_seq_count + double_usage_win_seq_count,

        x: Math.random(),
        y: Math.random(),
    }
}

const duration = randomInt(40 * 60, 90 * 60);

export function virtualRally(tacticId, tacticLen) {
    const is_server = randomInt(2) === 0;
    const hit_count = randomInt(tacticLen, 10);
    const start_time = Math.random() * (duration - 5);

    return {
        id: uuid4(),
        win: randomInt(2) === 0,
        is_server,
        hit_count,

        index: [[tacticId, Math.floor(randomInt(hit_count - tacticLen) / 2) * 2 + (is_server ? 0 : 1)]],
        rally: [...new Array(hit_count)].map(() => genHit([1, 0])),

        match_name: '',
        video_name: '',
        start_time,
        end_time: Math.random() * 5 + start_time,
    }
}
