import {Checkbox, FormControlLabel, IconButton, TableRow} from "@mui/material";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import {BodyCell} from "./TableCell";
import {playerColors} from "../../static/theme";
import Bar from "./Bar";
import TacticDetail from "./TacticDetail";
import {useState} from "react";

const barType = 'Overlap';
// const barType = 'Left';
// const barType = 'Top';
const barHeight = 30;
const showBorder = false;
const doubleAlign = 'left';
// const doubleAlign = 'center';
const trackColor = 'rgb(244,244,244)';
// const trackColor = 'background.paper';

export function Tactic({tactic, tId, selected, onSelect, favorite, onFavorite}) {
    const [viewDetail, setViewDetail] = useState(false);

    const handleSelect = e => {
        e.stopPropagation();
        onSelect(!selected);
    }

    const handleFavorite = e => {
        e.stopPropagation();
        onFavorite(!favorite)
    }

    return <TableRow onClick={() => setViewDetail(a => !a)}>
        <BodyCell>
            <FormControlLabel checked={selected}
                              onClick={handleSelect}
                              control={<Checkbox/>}
                              label={tId + 1}/>
        </BodyCell>
        <BodyCell>
            <TacticDetail open={viewDetail}
                          tactic={tactic.tactic}
                          user={tactic.user}
                          tacticAddition={tactic.tactic_surrounding}
                          usageCount={tactic.usage_count}/>
        </BodyCell>
        <BodyCell>
            <Bar variant={`Single${barType}`}
                 height={barHeight}
                 showBorder={showBorder}
                 textWidth={26}
                 trackColor={trackColor}
                 value={tactic.usage_count / tactic.globalStat.usage}
                 label={tactic.usage_count}/>
        </BodyCell>
        <BodyCell>
            {
                doubleAlign !== 'center' ?
                    <Bar variant={`Single${barType}`}
                         height={barHeight}
                         showBorder={false}
                         value={tactic.stat.winRate0}
                         textWidth={41}
                         barColor={playerColors[0]}
                         trackColor={playerColors[1]}
                         label={`${(tactic.stat.winRate0 * 100).toFixed(1)}%`}/> :
                    <Bar variant={`Double${barType}`}
                         height={barHeight}
                         showBorder={false}
                         value={[tactic.stat.winRate0, tactic.stat.winRate1]}
                         barColor={playerColors}
                         trackColor={trackColor}
                         doubleAlign={doubleAlign}
                         label={[
                             `${(tactic.stat.winRate0 * 100).toFixed(1)}%`,
                             `${(tactic.stat.winRate1 * 100).toFixed(1)}%`
                         ]}/>
            }
        </BodyCell>
        <BodyCell>
            <Bar variant={`Single${barType}`}
                 height={barHeight}
                 showBorder={showBorder}
                 textWidth={34}
                 trackColor={trackColor}
                 value={tactic.stat.importance / tactic.globalStat.importance}
                 label={tactic.stat.importance}/>
        </BodyCell>
        <BodyCell>
            <IconButton onClick={handleFavorite}>
                {favorite ? <Favorite color={'error'}/> : <FavoriteBorder/>}
            </IconButton>
        </BodyCell>
    </TableRow>
}
