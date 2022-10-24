import {BehaviorSubject} from 'rxjs';

import {StateInterface} from '../model/state.interface';

export default class State implements StateInterface{
    private _state$ =  new BehaviorSubject<number>(0)

    readonly state$ = this._state$.asObservable()

    state: any = {}

    create(key: string, value: any): void {
        this.state = {
            ...this.state,
            [key]: value
        }
    }

    get(key: string) {
        return this.state[key]
    }

    update<T>(key: string, field: T, value: any) {
        this.state[key] = {
            ...this.state[key],
            // @ts-ignore
            [field]: value
        }
    }
}
