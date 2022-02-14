import {Box, Checkbox, FormControlLabel, IconButton, TableRow} from "@mui/material";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import {BodyCell} from "./TableCell";

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
            <Box height={20}
                 width={`${tactic.usage_count / tactic.globalStat.usage * 100}%`}
                 bgcolor={'primary.main'}/>
        </BodyCell>
        <BodyCell>

        </BodyCell>
        <BodyCell>
            <Box height={20}
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
