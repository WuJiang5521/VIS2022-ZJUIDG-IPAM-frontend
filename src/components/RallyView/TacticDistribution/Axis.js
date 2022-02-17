import React, {memo} from "react";
import {useTranslation} from "react-i18next";
import {useTheme} from "@mui/styles";
import strings from "../../../static/strings";

const Arrow = memo(({x1, x2, y1, y2, size, style, arrowStyle}) => {
    size = size || [10, 10];
    style = style || {stroke: 'black', strokeWidth: 1, fill: 'none'};
    arrowStyle = arrowStyle || style;
    const path = `M${-size[0] / 2} ${-size[1]}L0 0L${size[0] / 2} ${-size[1]}`;
    const deg = Math.atan((y2 - y1) / (x2 - x1)) / Math.PI * 180
        + ((y2 - y1) * (x2 - x1) < 0 ? 180 : 0)
        - 90;
    return <React.Fragment>
        <line x1={x1} y1={y1}
              x2={x2} y2={y2}
              style={style}/>
        <path d={path}
              transform={`translate(${x2}, ${y2}) rotate(${deg})`}
              style={arrowStyle}/>
    </React.Fragment>;
})

const Axis = memo(({
                       maxX,
                       styleControl,
                   }) => {
    const {t} = useTranslation();
    const {
        width,
        height,
        ox,
        oy,
        arrowSize,
        fontSize,
        textPadding,
        sideBarWidth,
        barStartX,
        hintLines,
        unitHeight
    } = styleControl;
    const theme = useTheme();
    const mainAxisStyle = {
        stroke: theme.palette.getContrastText(theme.palette.background.paper),
        strokeWidth: 1,
        fill: 'none',
    }
    const hintLineStyle = {
        stroke: theme.palette.background.default,
        strokeWidth: 1,
        strokeDasharray: [2, 2],
    }
    const textStyle = {
        fontSize: fontSize,
    }
    return <g>
        {/* axis x */}
        <g transform={`translate(${0}, ${oy})`}
           style={{transition: 'transform .3s ease'}}>
            <Arrow x1={0} y1={0}
                   x2={width} y2={0}
                   size={arrowSize}
                   style={mainAxisStyle}/>
            <text x={width} y={-textPadding - arrowSize[0] / 2}
                  textAnchor={'end'} alignmentBaseline={"baseline"}
                  style={textStyle}>
                {t(strings.Index)}
            </text>
        </g>

        {/* axis y */}
        <g transform={`translate(${sideBarWidth}, ${0})`}
           style={{transition: 'transform .3s ease'}}>
            <Arrow x1={0} y1={height}
                   x2={0} y2={0}
                   size={arrowSize}
                   style={mainAxisStyle}/>
            <text x={textPadding + arrowSize[0] / 2} y={0}
                  textAnchor={'start'} alignmentBaseline={"hanging"}
                  style={textStyle}>
                {t(strings.Frequency)}
            </text>
        </g>

        {/* label x */}
        <g transform={`translate(${ox}, ${oy})`}
           style={{transition: 'transform .3s ease'}}>
            {[...new Array(maxX)].map((_, i) => (
                <text key={i}
                      transform={`translate(${barStartX(i) - ox}, 3)`}
                      textAnchor={'middle'} alignmentBaseline={'hanging'}
                      style={{transition: 'transform .3s ease', ...textStyle}}>
                    {i + 1}
                </text>
            ))}
        </g>

        {/* label y */}
        <g transform={`translate(${ox}, ${oy})`}
           style={{transition: 'transform .3s ease'}}>
            {hintLines.map((h, hId) => (
                <g key={h}
                   transform={`translate(0, -${h * unitHeight})`}
                   style={{transition: 'transform .3s ease'}}>
                    <line x1={0} y1={0}
                          x2={width - sideBarWidth} y2={0}
                          style={hintLineStyle}/>
                    <text x={-3} y={0}
                          textAnchor={'end'} alignmentBaseline={'middle'}
                          style={textStyle}>
                        {h}
                    </text>
                </g>
            ))}
        </g>
    </g>;
});

export default Axis;
