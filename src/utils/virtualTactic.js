import uuid4 from "./uuid4";
import randomInt from "./randomInt";

export default function genVirtualTactic() {
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
