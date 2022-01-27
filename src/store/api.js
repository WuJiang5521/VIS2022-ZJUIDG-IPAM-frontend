const url = uri => `http://127.0.0.1:8000${uri}`;

const api = {
    getDatasets: () => fetch(url('/datasets'))
        .then(res => res.json()),
    getDataset: () => fetch(url('/dataset/0'))
        .then(res => console.log(res)),
}

export default api;