import {Tooltip} from "@mui/material";
import React, {memo} from "react";

export default memo(function StackBar({idx, value, color, styleControl}) {
    const {height, barWidth, barStartX, oy, unitHeight} = styleControl;
    const barStyle = {
        x: -barWidth / 2,
        width: barWidth,
    }
    const startX = barStartX(idx),
        startY = oy;
    return <Tooltip
        title={<table>
            <tbody>
            <tr>
                <td>Sum:</td>
                <td>{value[0] + value[1]}</td>
            </tr>
            <tr>
                <td>Player Wins:</td>
                <td>{value[0]}</td>
            </tr>
            <tr>
                <td>Opponents Wins:</td>
                <td>{value[1]}</td>
            </tr>
            </tbody>
        </table>}>
        <g transform={`translate(${startX},${startY})`} style={{transition: 'transform .3s ease'}}>
            <rect {...barStyle}
                  y={-height}
                  height={height}
                  fillOpacity={0}/>
            <rect {...barStyle}
                  y={-value[0] * unitHeight}
                  height={value[0] * unitHeight}
                  fill={color[0]}
                  style={{transition: 'y .3s ease, height .3s ease'}}/>
            <rect {...barStyle}
                  y={-(value[0] + value[1]) * unitHeight}
                  height={value[1] * unitHeight}
                  fill={color[1]}
                  style={{transition: 'y .3s ease, height .3s ease'}}/>
        </g>
    </Tooltip>;
})
