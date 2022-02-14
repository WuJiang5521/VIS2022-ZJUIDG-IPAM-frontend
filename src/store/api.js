import Store from "./store";

const url = uri => `http://127.0.0.1:8000${uri}`;

class API {
    token = null;
    headers = new Headers();

    confirmToken = () => new Promise((resolve, reject) => {
        if (this.token !== null) resolve();
        this.init().catch(reject).then(resolve);
    });

    fetch = (a, b) => this.confirmToken()
        .then(() => fetch(a, {headers: this.headers, ...(b || {})}))
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

    getDatasets = () => this.fetch(url('/datasets'))
        .then(res => res.json())

    setDataset = (dataset, player, opponents) => this.fetch(
        url('/dataset'),
        {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({dataset, player, opponents})
        })
        .then(res => res.json())
}

const api = new API();

export default api;
