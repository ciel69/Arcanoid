import {BehaviorSubject, fromEvent} from 'rxjs';

import {createValueControl, filterByKey} from '../utils';
import {CallbackFn, ControlInterface, EventControl} from '../model/control.interface';

/**
 * Класс инкапсулирует логику подписки нажатия на различные клавиши клавиатуры
 * для использования достаточноп одписаться на события класса.
 *
 * К примеру:
 *   Control.arrowLeft$.subscribe((isDown) => {
 *     // логика реагирование на это событие
 *   })
 *
 * Так-же есть возможность подписки на любую произвольную клавишу
 * Control.handle$.pipe(filterByKey(['s', 'w'])).subscribe((ev: EventControl) => {
 *   // логика реагирование на это событие
 * })
 *
 * В обоих случаях событие срабатывает джавжы, первый раз при нажатии, тогда isDown или ev.isDown
 * будет true, второй раз когда клавиша отжимается и тогда у isDown будет значение false
 */
export default class KeyboardControl implements ControlInterface {

  private handle$ = new BehaviorSubject<EventControl>(createValueControl());

  private arrowLeft$ = new BehaviorSubject<boolean>(false);

  private arrowRight$ = new BehaviorSubject<boolean>(false);

  private arrowUp$ = new BehaviorSubject<boolean>(false);

  constructor() {
    /**
     * Подписка на нажитие клавиши
     */
    fromEvent<KeyboardEvent>(window, 'keydown').subscribe(x => {
      this.handle$.next(createValueControl(x, true))
      this.initHandlers(x.key, true)
    });
    /**
     * Подписка на отпускание клавиши
     */
    fromEvent<KeyboardEvent>(window, 'keyup').subscribe(x => {
      this.handle$.next(createValueControl(x))
      this.initHandlers(x.key, false)
    });
  }

  /**
   * Вызов функций для нажатия определённых клавиш
   * @param key
   * @param isDown
   * @private
   */
  private initHandlers(key: string, isDown: boolean): void {
    if (key === 'ArrowLeft') {
      this.arrowLeft$.next(isDown)
    }
    if (key === 'ArrowRight') {
      this.arrowRight$.next(isDown)
    }
    if (key === 'ArrowUp') {
      this.arrowUp$.next(isDown)
    }
  }

  arrowLeft(fn: CallbackFn<boolean>): void {
    this.arrowLeft$.subscribe(res => fn(res))
  }

  arrowRight(fn: CallbackFn<boolean>): void {
    this.arrowRight$.subscribe(res => fn(res))
  }

  arrowUp(fn: CallbackFn<boolean>): void {
    this.arrowUp$.subscribe(res => fn(res))
  }

  handle(key: string|string[], fn: (data: EventControl) => void): void {
    this.handle$
      .pipe(filterByKey(key))
      .subscribe((res) => fn(res))
  }

}

