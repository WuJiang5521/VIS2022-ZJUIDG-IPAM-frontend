import React, {useRef} from 'react';
import {inject, observer} from "mobx-react";
import styled from "@emotion/styled";
import {transition} from "../../static/theme";
import {useSize} from "../../utils/useSize";
import Hit from "./Hit";

function TacticDetail({open, tactic, tacticAddition, usageCount, user}) {
    const ref = useRef();
    const {width} = useSize(ref);
    const cellWidth = Math.min(width / 5 - 1, 100);
    const fullWidth = tactic.length * cellWidth;
    const fullHeight = cellWidth * 2;
    const height = open ? fullHeight : cellWidth;

    const player = hId => (hId + user) % 2;

    return <Container ref={ref} style={{height}}>
        <svg width={fullWidth} height={fullHeight} viewBox={`0 0 ${fullWidth} ${fullHeight}`}>
            {tactic.map((hit, hId) => <g key={hId}
                                         transform={`translate(${cellWidth * hId}, ${0})`}>
                <Hit size={cellWidth} maxHeight={fullHeight}
                     hit={hit} hitAdditional={tacticAddition[hId]}
                     player={player(hId)}
                     freq={usageCount}
                     open={open}/>
            </g>)}
        </svg>
    </Container>
}

const Container = styled('div')({
    width: '100%',
    transition: transition('height'),
    overflow: 'auto hidden',
    position: 'relative',
})

export default inject()(observer(TacticDetail));
