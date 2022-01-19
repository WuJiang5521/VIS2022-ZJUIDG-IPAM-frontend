import {makeAutoObservable} from "mobx";
import Store from "./store";

export default class SystemStore {
    constructor() {
        makeAutoObservable(this);
        Store.register('system', this);
    }

    init() {

    }
}
