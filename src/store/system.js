import {makeAutoObservable} from "mobx";
import Store from "./store";

export default class SystemStore {
    network = true;
    setNetwork = isConnected => this.network = isConnected;

    get blockError() {
        if (!this.network) return 'Cannot connect to the backend!'
        return null;
    }

    constructor() {
        makeAutoObservable(this);
        Store.register('system', this);
    }

    init = () => new Promise((resolve, reject) => {
        resolve();
    })
}
