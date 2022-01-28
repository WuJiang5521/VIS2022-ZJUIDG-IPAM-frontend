/**
 * Created by Jiang Wu on 2022/1/27
 */

import {inject, observer} from "mobx-react";

const PreviewView = inject()(observer(({}) => {
    return null;
}));

const PreviewViewToolbar = inject()(observer(({}) => {
    return null;
}));

export default function usePreviewView() {
    return {
        view: <PreviewView/>,
        toolbar: <PreviewViewToolbar/>,
    }
}
