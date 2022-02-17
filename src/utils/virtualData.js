import uuid4 from "./uuid4";
import randomInt from "./randomInt";

export function virtualTactic() {
    const seq_count = randomInt(50, 100);
    const win_seq_count = randomInt(10, seq_count);
    const double_usage_count = randomInt(5, seq_count);
    const double_usage_win_seq_count = randomInt(Math.min(win_seq_count, double_usage_count));

    return {
        id: uuid4(),

        tactic: {},

        seq_count,
        win_seq_count,
        usage_count: seq_count + double_usage_count,
        win_usage_count: win_seq_count + double_usage_win_seq_count,

        fix: false,

        x: Math.random(),
        y: Math.random(),
    }
}

const duration = randomInt(40 * 60, 90 * 60);
export function virtualRally() {
    const is_server = randomInt(2) === 0;
    const hit_count = randomInt(2, 10);
    const start_time = Math.random() * (duration - 5);

    return {
        id: uuid4(),

        win: randomInt(2) === 0,
        is_server,
        hit_count,
        index: Math.floor(randomInt(hit_count) / 2) * 2 + (is_server ? 0 : 1),

        match_name: '',
        video_name: '',
        start_time,
        end_time: Math.random() * 5 + start_time,
    }
}
