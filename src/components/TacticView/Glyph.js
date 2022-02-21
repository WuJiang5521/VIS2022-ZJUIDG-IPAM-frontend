import React from 'react';
import {inject, observer} from "mobx-react";
import GlyphSet from "./GlyphSets";

function Glyph({hit, hitAdditional, size, analysis, freq}) {
    const glyphSet = GlyphSet.dataset(analysis.dataset);
    return <React.Fragment>
        <rect x={-size / 2} y={-size / 2} width={size} height={size} strokeWidth={1} stroke={'black'} fill={'none'}/>
        {analysis.attrs.map((attrKey, aId) => {
            const renderer = glyphSet
                .attr(attrKey)
                .size(size);
            let value = hit[aId], opacity = 1;
            if (!value) {
                const optVal = Object.entries(hitAdditional[aId]).sort((v1, v2) => v2[1] - v1[1]);
                value = optVal[0][0];
                opacity = optVal[0][1] / freq;
            }
            return <g key={attrKey}
                      opacity={opacity}>
                {renderer.render(value)}
            </g>
        })}
    </React.Fragment>
}

export default inject('analysis')(observer(Glyph));
