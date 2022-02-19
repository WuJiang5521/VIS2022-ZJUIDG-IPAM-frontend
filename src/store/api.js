import Store from "./store";

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
}

class API extends BaseAPI {
    getDatasets = () => this.fetch(url('/datasets'))
        .then(res => res.json())

    setDataset = (dataset, player, opponents) => this.fetch(
        url('/dataset'),
        {
            method: 'POST',
            body: JSON.stringify({dataset, player, opponents})
        })
        .then(res => res.json())

    runAlg = () => this.fetch(
        url('/tactic'),
        {method: 'POST'}
    ).then(res => res.json())

    getTacticSequences = tac_id => this.fetch(
        url(`/rally/${tac_id}`)
    ).then(res => res.json())

    processText = text => this.fetch(
        url(`/text/${text}`)
    ).then(res => res.json())

    modify = (type, params) => this.fetch(
        url('/modification'),
        {method: 'POST', body: JSON.stringify({type, params})}
    ).then(res => res.json())

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

class VirtualAPI {

}

const api = new API();

export default api;
