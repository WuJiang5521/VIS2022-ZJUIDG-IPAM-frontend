import {makeAutoObservable} from "mobx";
import Store from "./store";
import api from "./api";
import {virtualRally, virtualTactic} from "../utils/virtualData";
import randomInt from "../utils/randomInt";
import tacticSorter, {SortTypes} from "../utils/tacticSort";
import {genTacticStat, mergeStat} from "../utils/tacticStat";

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

    get attrs() {
        const datasets = Store.getStores().data.datasets;
        for (const ds of datasets) {
            if (ds.name === this.dataset)
                return ds.attrs;
        }
        return [];
    }

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
    undo = () => {
        api.undo()
            .then(this.popHistory)
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

    get statTactics() {
        const globalStat = genTacticStat();
        return this.state.tactics.map(tactic => {
            const stat = genTacticStat(tactic);
            mergeStat(globalStat, stat);
            return {
                ...tactic,
                stat,
                globalStat,
            }
        })
    }

    sortType = SortTypes.MajorityDown;
    setSortType = newSortType => this.sortType = newSortType;
    get sortedTactics() {
        return this.statTactics.map(t => t).sort(tacticSorter[this.sortType])
    }

    get ralliesOfSelectedTactics() {
        const rallies = [];

        const tactics = this.state.tactics;
        const sequences = this.state.sequences;
        this.selectedTactics.forEach(id => {
            const tactic = tactics[id];
            const seqs = sequences[tactic.id] || [];
            rallies.push(...seqs.map(seq => ({
                ...seq,
                tacticPos: [seq.index, seq.index + tactic.tactic.length]
            })))
        })

        return rallies;
    }

    constructor() {
        makeAutoObservable(this);
        Store.register('analysis', this);
    }

    init = () => new Promise((resolve, reject) => {
        let lastUpdate = new Date();
        this.pushHistory({
            lastUpdate,
            desc_len: 200,
            query: null,
            tactics: [],
            sequences: {},
        });

        if (window.is_dev()) {
            let lastDescriptionLength = 200;
            for (let i = 0; i < 13; i++) {
                lastUpdate = new Date(lastUpdate);
                lastUpdate.setMinutes(lastUpdate.getMinutes() + randomInt(3, 6));
                lastDescriptionLength += randomInt(-5, 10);

                const tactics = [...new Array(30)].map((_, i) => ({
                    ...virtualTactic(),
                    fix: false,
                    fixId: i,
                }));
                const sequences = {};
                tactics.forEach(t => sequences[t.id] = [...Array(t.usage_count)].map(() => {
                    const rally = virtualRally(t.id, t.tactic.length);
                    rally.index = rally.index[0][1];
                    return rally;
                }));

                this.pushHistory({
                    lastUpdate: lastUpdate,
                    desc_len: lastDescriptionLength,
                    query: {
                        type: 'LimitIndex',
                        params: {
                            min: 1,
                            max: 3,
                        }
                    },
                    tactics,
                    sequences,
                });
            }
        }

        resolve();
    });
}
