import {BehaviorSubject} from 'rxjs';

import {EventControl} from '../types/Direction';

export type CallbackFn<T> = (data: T) => void

export interface ControlInterface {
  /**
   * Стрим реагирующий на нажатие любой клавиши клавиатуры
   */
  handle$: BehaviorSubject<EventControl>

  /**
   * Стрим нажатия на стрелку влево
   */
  arrowLeft$: BehaviorSubject<boolean>

  /**
   * Стрим нажатия на стрелку вправо
   */
  arrowRight$: BehaviorSubject<boolean>

  /**
   * Стрим нажатия на стрелку вверх
   */
  arrowUp$: BehaviorSubject<boolean>

  handle(key: string|string[], fn: CallbackFn<EventControl>): void
  arrowLeft(fn: CallbackFn<boolean>): void
  arrowRight(fn: CallbackFn<boolean>): void
  arrowUp(fn: CallbackFn<boolean>): void
}
