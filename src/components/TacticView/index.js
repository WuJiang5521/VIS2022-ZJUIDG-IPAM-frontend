/**
 * Created by Jiang Wu on 2022/1/27
 */

import {inject, observer} from "mobx-react";

const TacticView = inject()(observer(({}) => {
    return null;
}));

const TacticViewToolbar = inject()(observer(({}) => {
    return null;
}));

export default function useTacticView() {
    return {
        view: <TacticView/>,
        toolbar: <TacticViewToolbar/>,
    }
}
