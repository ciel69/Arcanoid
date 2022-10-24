export type CallbackFn<T> = (data: T) => void

export interface EventControl {
  source: KeyboardEvent
  isDown: boolean
}

export interface ControlInterface {
  /**
   * Подписка на нажатие произвольных клавиш
   * @param key
   * @param fn
   */
  handle(key: string|string[], fn: CallbackFn<EventControl>): void

  /**
   * Подписка на нажатие клавиши влево
   * @param fn
   */
  arrowLeft(fn: CallbackFn<boolean>): void

  /**
   * Подписка на нажатие клавиши вправо
   * @param fn
   */
  arrowRight(fn: CallbackFn<boolean>): void

  /**
   * Подписка на нажатие клавиши вверх
   * @param fn
   */
  arrowUp(fn: CallbackFn<boolean>): void
}
