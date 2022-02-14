import {playerColors} from "../../static/theme";

const parseColor = color => {
    const values = color
        .substring(4, color.length - 1)
        .split(',')
        .map(val => parseInt(val, 10));
    return Object.fromEntries(['r', 'g', 'b'].map((key, i) => [key, values[i]]));
}

const colorScale = [
    parseColor(playerColors[0]),
    {r: 255, g: 255, b: 255},
    parseColor(playerColors[1])
]

function getScaleColor(number, colors) {
    if (number <= 0) return colors[0];
    if (number >= colors.length - 1) return colors[colors.length - 1];
    const idx = Math.floor(number);
    const {r: r1, g: g1, b: b1} = colors[idx];
    const {r: r2, g: g2, b: b2} = colors[idx + 1];
    const ratio = number - idx;
    return `rgb(${r1 * ratio + r2 * (1 - ratio)}, ${g1 * ratio + g2 * (1 - ratio)}, ${b1 * ratio + b2 * (1 - ratio)})`
}

export default function winRate2color(winRate) {
    console.log(colorScale);
    return getScaleColor(
        2 - winRate * 2,
        colorScale,
    )
}