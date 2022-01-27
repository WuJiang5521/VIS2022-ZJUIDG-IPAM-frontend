import {makeAutoObservable} from "mobx";
import Store from "./store";

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
    get players() {
        const dataStore = Store.getStores().data;
        return dataStore.getPlayers(this.dataset);
    }
    get availableOpponents() {
        const dataStore = Store.getStores().data;
        return dataStore.getPlayers(this.dataset)
            .filter(player => player !== this.player);
    }
    get sequenceCount() {
        const dataStore = Store.getStores().data;
        return dataStore.getMatches(this.dataset, this.player, this.opponents)
            .reduce((p, c) => c.sequenceCount + p, 0);
    }



    constructor() {
        makeAutoObservable(this);
        Store.register('analysis', this);
    }

    init = () => new Promise((resolve, reject) => {
        resolve();
    });
}
