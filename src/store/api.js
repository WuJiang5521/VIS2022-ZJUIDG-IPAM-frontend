const url = uri => `http://127.0.0.1:8000${uri}`;

const api = {
    getDatasets: () => fetch(url('/datasets'))
        .then(res => res.json()),
    setDataset: (dataset, player, opponents) => fetch(
        url('/dataset'),
        {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({dataset, player, opponents})
        })
        .then(res => res.json()),
}

export default api;