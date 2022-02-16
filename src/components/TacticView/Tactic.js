import {Checkbox, FormControlLabel, IconButton, TableRow} from "@mui/material";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import {BodyCell} from "./TableCell";
import {playerColors} from "../../static/theme";
import Bar from "./Bar";
import TacticDetail from "./TacticDetail";

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
    return <TableRow>
        <BodyCell>
            <FormControlLabel checked={selected}
                              onChange={() => onSelect(!selected)}
                              control={<Checkbox/>}
                              label={tId + 1}/>
        </BodyCell>
        <BodyCell>
            <TacticDetail tactic={tactic.tactic}/>
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
                 value={tactic.stat.majority / tactic.globalStat.majority}
                 label={tactic.stat.majority}/>
        </BodyCell>
        <BodyCell>
            <IconButton onClick={() => onFavorite(!favorite)}>
                {favorite ? <Favorite color={'error'}/> : <FavoriteBorder/>}
            </IconButton>
        </BodyCell>
    </TableRow>
}
