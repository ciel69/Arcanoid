import {BehaviorSubject, filter} from 'rxjs';

import {StateInterface} from '../model/state.interface';

export default class State implements StateInterface {
    private changeState$ =  new BehaviorSubject<string>('')

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

    update<T>(key: string, value: T): void {
        this.state[key] = {
            ...this.state[key],
            ...value
        }
        this.changeState$.next(key)
    }

    updateByField<T>(key: string, field: keyof T, value: any) {
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
