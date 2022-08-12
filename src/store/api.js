import Store from "./store";
import VirtualData, {values, virtualRally} from "../utils/virtualData";
import {rallyTransformerR, tacticTransformer, tacticTransformerR} from "../utils/dataTransformer";

const url = uri => `http://127.0.0.1:8000${uri}`;

class BaseAPI {
    token = null;
    headers = new Headers();

    constructor() {
        this.headers.set('Content-type', 'application/json')
    }

    confirmToken = () => new Promise((resolve, reject) => {
        if (this.token !== null) resolve();
        else this.init().catch(reject).then(resolve);
    });

    fetch = (a, b) => this.confirmToken()
        .then(() => {
            const headers = new Headers(this.headers);
            b && b.headers && Object.entries(b.headers).forEach(([key, value]) => headers.set(key, value));
            return fetch(a, {
                headers: headers,
                ...(b || {})
            })
        })
        .catch(err => {
            console.error(err);
            Store.getStores().system.setNetwork(false);
        })
        .then(res => {
            Store.getStores().system.setNetwork(true);
            return res;
        });

    init = () => fetch(url('/token'))
        .catch(() => Store.getStores().system.setNetwork(false))
        .then(res => res.json())
        .then(res => {
            this.token = res;
            this.headers.set('Token', res);
            Store.getStores().system.setNetwork(true);
        });

    _data = null;
    useData = d => this._data = d;
    cursor = 0;
    getCursorData = (type, params) => this._data && new Promise(resolve => {
        this.cursor += (type === 1);

        const cursor = this._data[this.cursor];
        let data, timeout;
        if (type === 0) {
            data = {
                tactics: cursor.tactics.map(tacticTransformerR),
                desc_len: cursor.desc_len,
            };
            timeout = (!cursor.query || [
                'LimitIndex',
                'LimitLength',
                'SetExistence',
                'SetImportance',
            ].includes(cursor.query.type)) ? (Math.random() * 5 + 5) : (Math.random() * 0.1);
        } else if (type === 1) {
            data = cursor.query;
            timeout = 0;
        } else if (type === 2) {
            data = cursor.sequences[params].map(r => rallyTransformerR(r, params));
            timeout = 0;
        }
        setTimeout(() => resolve(data), timeout * 1000);
    })
}

class API extends BaseAPI {
    getDatasets = () => this.fetch(url('/datasets'))
        .then(res => res.json())

    setDataset = (dataset, player, opponents) => {
        return this.fetch(
        url('/dataset'),
        {
            method: 'POST',
            body: JSON.stringify({dataset, player, opponents})
        })
        .then(res => res.json())}

    runAlg = () => this.getCursorData(0) || this.fetch(
        url('/tactic'),
        {method: 'POST'}
    ).then(res => res.json())

    getTacticSequences = tac_id => this.getCursorData(2, tac_id) || this.fetch(
        url(`/rally/${tac_id}`)
    ).then(res => res.json())

    processText = text => this.getCursorData(1) || this.fetch(
        url(`/text/${text}`)
    ).then(res => res.json())

    modify = (type, params) => this.getCursorData(0) || this.fetch(
        url('/modification'),
        {method: 'POST', body: JSON.stringify({type, params})}
    ).then(res => res.json())

    processAudio = audio => new Promise(resolve => {
        resolve('');
    })

    undo = () => this.fetch(
        url('/modification'),
        {method: 'DELETE'}
    ).then(res => res.json())

    fixTactic = (tac_id, isFix) => this.fetch(
        url(`/tactic/preference/${tac_id}`),
        {method: 'PUT', body: JSON.stringify(isFix)},
    ).then(res => res.json())

    videoSrc = videoName => url(`/video/${videoName}`)
}

class VirtualAPI extends BaseAPI {
    lastTacticSet = null;

    getDatasets = () => new Promise(resolve => {
        resolve(['Badminton', 'Tennis', 'Table Tennis'].map(sport => ['Female', 'Male'].map(gender => ({
            name: `${sport} (${gender})`,
            matches: [
                {
                    name: '',
                    players: ['a', 'b'],
                    sequenceCount: 100,
                }
            ],
            attrs: Object.keys(values[sport]),
        }))).flat())
    })

    setDataset = (dataset, player, opponents) => this.fetch(
        url('/dataset'),
        {
            method: 'POST',
            body: JSON.stringify({dataset, player, opponents})
        })
        .then(res => res.json())

    runAlg = () => new Promise(resolve => {
        this.lastTacticSet = VirtualData.tacticsSet(null);
        resolve(this.lastTacticSet)
    })

    getTacticSequences = tac_id => new Promise(resolve => {
        const t = this.lastTacticSet.tactics.find(t => t.id === tac_id);
        resolve([...Array(t.usage_count)].map(() => virtualRally(tac_id, t.tactic.length, t.user)))
    })

    processText = text => new Promise(resolve => {
        resolve({
            type: 'LimitIndex',
            params: {
                min: 1,
                max: 3,
            }
        })
    })

    processAudio = audio => new Promise(resolve => {
        resolve('Hello World');
    })

    modify = (type, params) => new Promise(resolve => {
        this.lastTacticSet = VirtualData.tacticsSet(this.lastTacticSet);
        resolve(this.lastTacticSet)
    })

    undo = () => new Promise(resolve => resolve(true))

    fixTactic = (tac_id, isFix) => new Promise(resolve => resolve(true))

    videoSrc = videoName => './video.mp4'
}

const api = window.is_dev() ? new VirtualAPI() : new API();

export default api;
