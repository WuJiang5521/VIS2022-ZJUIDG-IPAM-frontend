import {makeAutoObservable} from "mobx";
import Store from "./store";
import api from "./api";
import genVirtualTactic from "../utils/virtualTactic";

export default class AnalysisStore {
    dataset = '';
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

    history = [];
    pushHistory = state => {
        this.history.push(state);
        this.viewHistory(this.history.length - 1);
    }
    popHistory = () => {
        this.history.pop();
        this.viewHistory(this.history.length - 1);
    }

    cacheState = {
        query: {},
        tactics: [],
        sequences: {},
    }
    currentViewHistory = -1;
    viewHistory = idx => this.currentViewHistory = idx;
    get stateEditable() {
        return this.history.length - 1 === this.currentViewHistory;
    }
    get state() {
        return this.history[this.currentViewHistory];
    }

    selectedTactics = [];
    selectTactic = (id, selected) => {
        if (selected && !this.selectedTactics.includes(id)) this.selectedTactics.push(id);
        if (!selected) {
            const idx = this.selectedTactics.indexOf(id);
            if (idx > -1) this.selectedTactics.splice(idx, 1);
        }
    }

    favoriteTactics = [];
    favoriteTactic = (id, favor) => {
        if (favor && !this.favoriteTactics.includes(id)) this.favoriteTactics.push(id);
        if (!favor) {
            const idx = this.favoriteTactics.indexOf(id);
            if (idx > -1) this.favoriteTactics.splice(idx, 1);
        }
    }

    hoveredTactic = null;
    hoverTactic = (id, hover) => {
        if (hover) this.hoveredTactic = id;
        else if (this.hoveredTactic === id) this.hoveredTactic = null;
    }

    get ralliesOfSelectedTactics() {
        const rallies = [];

    }

    constructor() {
        makeAutoObservable(this);
        Store.register('analysis', this);
    }

    init = () => new Promise((resolve, reject) => {
        this.pushHistory({
            query: null,
            tactics: [],
            sequences: {},
        });

        if (window.is_dev())
            for (let i = 0; i < 13; i++)
                this.pushHistory({
                    query: {
                        type: 'LimitIndex',
                        params: {
                            min: 1,
                            max: 3,
                        }
                    },
                    tactics: [...new Array(30)].map((_, i) => ({
                        ...genVirtualTactic(),
                        fixId: i,
                    })),
                    sequences: {},
                });

        resolve();
    });
}
