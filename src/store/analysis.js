import {makeAutoObservable} from "mobx";
import Store from "./store";
import api from "./api";

export default class AnalysisStore {
    dataset = 'Badminton (Female)';
    player = '';
    opponents = [];
    setDataset = ds => {
        this.dataset = ds;
        this.player = '';
        this.opponents = [];
    }
    setPlayer = p => {
        this.player = p;
        if (this.opponents.includes(p))
            this.opponents = this.opponents.filter(op => op !== p);
    }
    setOpponents = ops => this.opponents = ops;

    restart = () => {
        api.setDataset(this.dataset, this.player, this.opponents)
            .then(res => {
                console.log(res);
            });
    }

    constructor() {
        makeAutoObservable(this);
        Store.register('analysis', this);
    }

    init = () => new Promise((resolve, reject) => {
        resolve();
    });
}
