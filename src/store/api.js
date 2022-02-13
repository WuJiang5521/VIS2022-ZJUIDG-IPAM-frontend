const url = uri => `http://127.0.0.1:8000${uri}`;

class API {
    token = null;
    headers = new Headers();

    fetch = (a, b) => fetch(a, {headers: this.headers, ...(b || {})})
        .catch(console.error)

    init = () => fetch(url('/token'))
        .then(res => res.json())
        .then(res => {
            this.token = res;
            this.headers.set('Token', res);
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