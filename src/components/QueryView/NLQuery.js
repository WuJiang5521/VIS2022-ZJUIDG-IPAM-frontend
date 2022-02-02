/**
 * Created by Jiang Wu on 2022/1/29
 */

import {inject, observer} from "mobx-react";
import {TextField} from "@mui/material";

function NLQuery({queryParams, setQueryParams, clearQueryParams}) {
    return <TextField fullWidth/>;
}

export default inject()(observer(NLQuery));
