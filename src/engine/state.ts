import {BehaviorSubject, filter} from 'rxjs';

import {StateInterface} from '../model/state.interface';

export default class State implements StateInterface {
    private _state$ =  new BehaviorSubject<number>(0)
    changeState$ =  new BehaviorSubject<string>('')

    readonly state$ = this._state$.asObservable()

    state: any = {}

    create(key: string, value: any): void {
        this.state = {
            ...this.state,
            [key]: value
        }
    }

    get(key: string) {
        return {...this.state[key]}
    }

    update<T>(key: string, field: keyof T, value: any) {
        this.state[key] = {
            ...this.state[key],
            [field]: value
        }
        this.changeState$.next(key)
    }

    subscribeState<T>(key: string, fn: (data: T) => void): void {
        this.changeState$
          .pipe(filter(str => str === key))
          .subscribe(() => fn(this.state[key]))
    }
}
