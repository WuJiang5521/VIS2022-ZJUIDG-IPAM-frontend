import {makeAutoObservable} from "mobx";
import Store from "./store";
import api from "./api";

export default class DataStore {
    datasets = []
    setDatasets = (newDatasets) => {
        this.datasets = newDatasets;
    }
    getPlayers = (datasetName) => {
        const players = [];
        this.datasets.forEach(ds => {
            if (ds.name !== datasetName) return;

            ds.matches.forEach(match => {
                match.players.forEach(player => {
                    if (!players.includes(player))
                        players.push(player);
                })
            })
        })
        return players;
    }
    getMatches = (datasetName, player, opponents) => {
        const matches = [];
        this.datasets.forEach(ds => {
            if (ds.name !== datasetName) return;

            ds.matches.forEach(match => {
                const idx = match.players.indexOf(player);
                if (idx === -1) return;

                if (opponents.includes(match.players[1 - idx]))
                    matches.push(match);
            })
        })
        return matches;
    }

    getVideoSrc = videoName =>
        (videoName && videoName.endsWith('mp4')) ?
            api.videoSrc(videoName) :
            null;
    processText = api.processText;
    processAudio = api.processAudio;

    constructor() {
        makeAutoObservable(this);
        Store.register('data', this);
    }

    init = () => new Promise((resolve, reject) => {
        api.getDatasets()
            .then(this.setDatasets)
            .then(resolve)
    })
}
