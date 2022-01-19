import {makeAutoObservable} from "mobx";
import Store from "./store";

export default class DataStore {
    constructor() {
        makeAutoObservable(this);
        Store.register('data', this);
    }

    init() {

    }
}
