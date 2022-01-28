/**
 * Created by Jiang Wu on 2022/1/27
 */

import {inject, observer} from "mobx-react";

const ProjectView = inject()(observer(({}) => {
    return null;
}));

const ProjectViewToolbar = inject()(observer(({}) => {
    return null;
}));

export default function useProjectView() {
    return {
        view: <ProjectView/>,
        toolbar: <ProjectViewToolbar/>,
    }
}
