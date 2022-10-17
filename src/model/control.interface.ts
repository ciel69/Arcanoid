import {BehaviorSubject} from 'rxjs';

import {EventControl} from '../types/Direction';

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
}
