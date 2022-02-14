/**
 * Created by Jiang Wu on 2022/1/29
 */

import {inject, observer} from "mobx-react";
import {Box} from "@mui/material";
import HistoryItem from "./HistoryItem";

function QueryHistory({analysis}) {
    return <Box width={'100%'} height={'100%'} overflow={'hidden scroll'}>
        {analysis.history
            .map(h => h.query)
            .filter((q, i, arr) => Boolean(q) || arr.length > 1)
            .map((query, qId) => (
                <HistoryItem key={qId}
                             query={query}
                             idx={qId}/>
            ))
            .reverse()}
    </Box>;
}

export default inject('analysis')(observer(QueryHistory));
