import {Box, Checkbox, FormControlLabel, IconButton, TableRow} from "@mui/material";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import {BodyCell} from "./TableCell";
import {playerColors} from "../../static/theme";

export function Tactic({tactic, tId, selected, onSelect, favorite, onFavorite}) {

    return <TableRow>
        <BodyCell>
            <FormControlLabel checked={selected}
                              onChange={() => onSelect(!selected)}
                              control={<Checkbox/>}
                              label={tId + 1}/>
        </BodyCell>
        <BodyCell>

        </BodyCell>
        <BodyCell>
            <Box height={15}
                 width={`${tactic.usage_count / tactic.globalStat.usage * 100}%`}
                 bgcolor={'primary.main'}/>
        </BodyCell>
        <BodyCell>
            <Box height={15}
                 marginLeft={`${(tactic.stat.winRate1) * 50}%`}
                 width={`${tactic.stat.winRate0 * 50}%`}
                 bgcolor={playerColors[0]}
                 display={'inline-block'}/>
            <Box height={15}
                 width={`${tactic.stat.winRate1 * 50}%`}
                 bgcolor={playerColors[1]}
                 display={'inline-block'}/>
        </BodyCell>
        <BodyCell>
            <Box height={15}
                 width={`${tactic.stat.majority / tactic.globalStat.majority * 100}%`}
                 bgcolor={'primary.main'}/>
        </BodyCell>
        <BodyCell>
            <IconButton onClick={() => onFavorite(!favorite)}>
                {favorite ? <Favorite color={'error'}/> : <FavoriteBorder/>}
            </IconButton>
        </BodyCell>
    </TableRow>
}
