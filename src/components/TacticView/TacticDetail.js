import React from 'react';
import {inject, observer} from "mobx-react";
import styled from "@emotion/styled";
import {transition} from "../../static/theme";

function TacticDetail({}) {
    return <Container height={80}>

    </Container>
}

const Container = styled('div')({
    width: '100%',
    transition: transition('height'),
})

export default inject()(observer(TacticDetail));
