import {inject, observer} from "mobx-react";
import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import strings from "../../static/strings";
import TitleBarSelect from "./TitleBarSelect";

function TitleBar({data, analysis}) {
    const {t} = useTranslation();

    return <AppBar sx={{height: 40}}>
        <Toolbar sx={{height: 40, minHeight: '0 !important'}}>
            <Typography sx={{flexGrow: 1}}>{t(strings.SystemName)}</Typography>
            <TitleBarSelect label={t(strings.Dataset)}
                            options={data.datasets.map(ds => ({
                                value: ds.name,
                                label: t(strings.DatasetName, ds.name)
                            }))}
                            value={analysis.dataset}
                            onChange={e => analysis.setDataset(e.target.value)}/>
            <Box sx={{marginRight: 3}}/>
            <TitleBarSelect label={t(strings.Player)}
                            options={analysis.players.map(p => ({
                                value: p,
                                label: t(strings.PlayerName, p)
                            }))}
                            value={analysis.player}
                            onChange={e => analysis.setPlayer(e.target.value)}/>
            <Box sx={{marginRight: 3}}/>
            <TitleBarSelect label={t(strings.Opponents)}
                            multiple
                            options={analysis.availableOpponents.map(p => ({
                                value: p,
                                label: t(strings.OpponentName, p)
                            }))}
                            value={analysis.opponents}
                            onChange={e => analysis.setOpponents(e.target.value)}/>
            <Box sx={{marginRight: 3}}/>
            <Typography>{t(strings.SeqCount)}: {analysis.sequenceCount}</Typography>
        </Toolbar>
    </AppBar>
}

export default inject('data', 'analysis')(observer(TitleBar));
