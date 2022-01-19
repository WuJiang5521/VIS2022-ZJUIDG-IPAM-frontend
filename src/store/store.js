const stores = {}

export default class Store {
    static register(name, inst) {
        stores[name] = inst;
    }

    static init() {
        Object.values(stores).forEach(store => store.init());
    }

    static getStores() {
        return stores;
    }
}
