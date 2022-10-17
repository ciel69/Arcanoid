import {BehaviorSubject, fromEvent} from 'rxjs';

import {EventControl} from '../types/Direction';
import {createValueControl} from '../utils';
import {ControlInterface} from '../model/control.interface';

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

  handle$ = new BehaviorSubject<EventControl>(createValueControl());

  arrowLeft$ = new BehaviorSubject<boolean>(false);

  arrowRight$ = new BehaviorSubject<boolean>(false);

  arrowUp$ = new BehaviorSubject<boolean>(false);

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
    this.arrowLeft(key, isDown)
    this.arrowRight(key, isDown)
    this.arrowUp(key, isDown)
  }

  /**
   * Триггреим событие нажатия на стрелку влево
   * @param key
   * @param isDown
   * @private
   */
  private arrowLeft(key: string, isDown: boolean): void {
    if (key === 'ArrowLeft') {
      this.arrowLeft$.next(isDown)
    }
  }

  /**
   * Триггерим событие нажатия на стрелку вправо
   * @param key
   * @param isDown
   * @private
   */
  private arrowRight(key: string, isDown: boolean): void {
    if (key === 'ArrowRight') {
      this.arrowRight$.next(isDown)
    }
  }

  /**
   * Триггерим событие нажатия на стрелку вверх
   * @param key
   * @param isDown
   * @private
   */
  private arrowUp(key: string, isDown: boolean): void {
    if (key === 'ArrowUp') {
      this.arrowUp$.next(isDown)
    }
  }

}

