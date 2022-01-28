/**
 * Created by Jiang Wu on 2022/1/27
 */

import {inject, observer} from "mobx-react";

const QueryView = inject()(observer(({}) => {
    return null;
}));

const QueryViewToolbar = inject()(observer(({}) => {
    return null;
}));

export default function useQueryView() {
    return {
        view: <QueryView/>,
        toolbar: <QueryViewToolbar/>,
    }
}
