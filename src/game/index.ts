import {ControlInterface} from '../model/control.interface';
import {ViewInterface} from '../model/view.interface';

import {filterByKey} from '../utils';

export class Game {
  constructor(
    private directionHandler: ControlInterface,
    private view: ViewInterface,
  ) {
    this.init()
  }

  init(): void {
    this.directionHandler.arrowLeft$.subscribe((isDown) => {
      console.log('arrowLeft$', isDown);
    })
    this.directionHandler.handle$
      .pipe(filterByKey(['s', 'w']))
      .subscribe((res) => {
        console.log('handle$', res.source);
      })
    console.log('view', this.view)
  }
}
