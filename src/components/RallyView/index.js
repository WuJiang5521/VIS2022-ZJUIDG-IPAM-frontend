/**
 * Created by Jiang Wu on 2022/1/27
 */

import {inject, observer} from "mobx-react";

const RallyView = inject()(observer(({}) => {
    return null;
}));

const RallyViewToolbar = inject()(observer(({}) => {
    return null;
}));

export default function useRallyView() {
    return {
        view: <RallyView/>,
        toolbar: <RallyViewToolbar/>,
    }
}
