import {BehaviorSubject} from 'rxjs';

export interface StateInterface {

  changeState$: BehaviorSubject<string>

  create<T>(key: string, value: T): void
  update<T>(key: string, field: keyof T, value: any): void
  get<T>(key: string): T
  subscribeState<T>(key: string, fn: (data: T) => void): void
}

export interface BallState {
  isFlying: boolean
}

export interface ArrowState {
  left: boolean
  right: boolean
}
