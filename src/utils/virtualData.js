import uuid4 from "./uuid4";
import randomInt from "./randomInt";
import Store from "../store/store";

const values = {
    'Ball Height': ['Very low', 'Low', 'Medium', 'High'],
    'Ball Position': ['Backcourt Left', 'Backcourt Right', 'Midfield Left', 'Midfield Right', 'Forecourt Left', 'Forecourt Right'],
    'Hit Technique': ['Net service', 'Backcourt service', 'Smash', 'Drive', 'Lift', 'High clear', 'Hook', 'Shot', 'Net shot', 'Drop', 'Push', 'Block', 'Other', 'Score'],
}

function genValue(attrKey, count = 1) {
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

function genHit([single, multi], count = 1, attrs = []) {
    return attrs.map(attrKey => {
        if (Math.random() < single / (single + multi)) return genValue(attrKey, count);
        else return genValue(attrKey, count)
    })
}

export function virtualTactic(attrs) {
    if (!attrs)
        attrs = Store.getStores().analysis.attrs;

    const seq_count = randomInt(50, 100);
    const win_seq_count = randomInt(10, seq_count);
    const double_usage_count = randomInt(5, seq_count);
    const double_usage_win_seq_count = randomInt(Math.min(win_seq_count, double_usage_count));
    const usage_count = seq_count + double_usage_count;

    const tactic = [...new Array(randomInt(2, 7))].map(() => genHit([0.6, 0.4], usage_count, attrs))

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

export function virtualRally(tacticId, tacticLen, attrs) {
    const is_server = randomInt(2) === 0;
    const hit_count = randomInt(tacticLen + (is_server ? 0 : 1), 10);
    const start_time = Math.random() * (duration - 5);

    return {
        id: uuid4(),
        win: randomInt(2) === 0,
        is_server,
        hit_count,

        index: [[tacticId, Math.floor(randomInt(hit_count - tacticLen) / 2) * 2 + (is_server ? 0 : 1)]],
        rally: [...new Array(hit_count)].map(() => genHit([1, 0], 1, attrs)),

        match_name: '',
        video_name: '',
        start_time,
        end_time: Math.random() * 5 + start_time,
    }
}

export default class VirtualData {
    static tacticsSet = (oldSet = null) => {
        if (oldSet === null)
            return {
                desc_len: randomInt(150, 250),
                tactics: [...new Array(randomInt(17, 24))].map((_, i) => virtualTactic()),
            }
        else {
            const tactics = JSON.parse(JSON.stringify(oldSet.tactics));
            const modType = randomInt(3);

            if (modType === 0) {
                const oldId = randomInt(tactics.length);
                // const oldT = tactics[oldId];
                tactics.splice(oldId, 1);
                const newT = [...new Array(randomInt(2, 5))].map((_, i) => virtualTactic());
                tactics.push(...newT);
            } else if (modType === 1) {
                const oldId = randomInt(tactics.length);
                // const oldT = tactics[oldId];
                tactics.splice(oldId, 1);
                const newT = virtualTactic();
                tactics.push(newT);
            } else {
                // const oldT = [];
                for (let i = randomInt(2, Math.min(tactics.length, 5)); i--;) {
                    let oldId = randomInt(tactics.length);
                    // oldT.push(tactics[oldId]);
                    tactics.splice(oldId, 1);
                }
                const newT = virtualTactic();
                tactics.push(newT);
            }

            return {
                desc_len: oldSet.desc_len + randomInt(-10, 10),
                tactics,
            }
        }
    }
}
