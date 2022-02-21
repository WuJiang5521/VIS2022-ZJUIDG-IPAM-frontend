import React, {memo} from 'react';
import Glyph from "./Glyph";
import ValueStat from "./ValueStat";

function Hit({size, maxHeight, hit, hitAdditional, open, freq}) {
    return <React.Fragment>
        {/* itself */}
        <g transform={`translate(${size / 2}, ${size / 2})`}>
            <Glyph hit={hit}
                   hitAdditional={hitAdditional}
                   freq={freq}
                   size={size * 0.8}/>
        </g>
        {/* detail */}
        {open && <g transform={`translate(0, ${size})`}>
            <ValueStat hitAdditional={hitAdditional}
                       freq={freq}
                       width={size}
                       height={maxHeight - size}/>
        </g>}
    </React.Fragment>
}

export default memo(Hit);
