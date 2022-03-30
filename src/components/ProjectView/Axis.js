import {inject, observer} from "mobx-react";
import {useTheme} from "@mui/styles";

const fontSize = 6;
const textR = 50 - fontSize;
const r = textR - 2;
const pad = 1.5 / r * Math.PI;

export default inject('analysis')(observer(function Axis({analysis}) {
    const theme = useTheme();

    const attrs = analysis.attrs;
    const sr = - pad / 2, tr = - Math.PI * 2 / attrs.length + pad / 2;
    const c = theme.palette.text.disabled;
    const path = `M${r * Math.cos(sr)} ${r * Math.sin(sr)}A${r} ${r} 0 0 0 ${r * Math.cos(tr)} ${r * Math.sin(tr)}`;
    const textPath = `M${textR * Math.cos(tr)} ${textR * Math.sin(tr)}A${textR} ${textR} 0 0 1 ${textR * Math.cos(sr)} ${textR * Math.sin(sr)}`;
    return <svg width={'100%'} height={'100%'} viewBox={'0 0 100 100'}>
        <g transform={'translate(50,50)'}>
            {attrs.map((attr, aId) => {
                const pathId = `proj-textpath-${attr}`;
                return <g transform={`rotate(${aId * 360 / attrs.length - 30})`}>
                    <path d={path} fill={'none'} stroke={c}/>
                    <path id={pathId} d={textPath} fill={'none'} stroke={'none'}/>
                    <text fontSize={6} textAnchor={'middle'} fill={c}>
                        <textPath xlinkHref={`#${pathId}`} startOffset={'50%'}>
                            {attr}
                        </textPath>
                    </text>
                </g>;
            })}
        </g>
    </svg>
}));
