/**
 * Created by Jiang Wu on 2022/1/29
 */

import {inject, observer} from "mobx-react";
import {Box} from "@mui/material";
import HistoryItem from "./HistoryItem";

function QueryHistory({analysis}) {
    return <Box width={'100%'} height={'100%'} overflow={'hidden scroll'}>
        {analysis.history
            .map(h => ({
                query: h.query,
                desc_len: h.desc_len,
                lastUpdate: h.lastUpdate,
            }))
            .map((query, qId, arr) => (
                <HistoryItem key={qId}
                             query={query.query}
                             time={query.lastUpdate}
                             dl={query.desc_len}
                             dlOffset={qId === 0 ? 0 : query.desc_len - arr[qId - 1].desc_len}
                             idx={qId}/>
            ))
            .reverse()}
    </Box>;
}

export default inject('analysis')(observer(QueryHistory));
