import {ControlInterface} from '../model/control.interface'
import {ViewInterface} from '../model/view.interface'
import {ElementInterface} from '../model/element.interface'
import {ArrowState, BallState, StateInterface} from '../model/state.interface'

import {filterByKey} from '../utils'

import BallService from './ball.service'
import PlatformService from './platform.service'

export interface IGame {
  init(): void
}

export class Game implements IGame {

  ballService: BallService
  platformService: PlatformService

  constructor(
    private directionHandler: ControlInterface,
    private view: ViewInterface,
    private elementService: ElementInterface,
    private state: StateInterface,
  ) {

    // Конфигурируем холст
    view.configure(
      {
        idContainer: 'canvas',
        width: 960,
        height: 600
      })

    this.ballService = new BallService(
      view,
      elementService
    )
    this.platformService = new PlatformService(
      view,
      elementService,
      state
    )

    state.create('arrows', {
      left: false,
      right: false,
    })
    state.create('ball', {
      isFlying: false
    })

    this.init()
  }

  init(): void {
    this.handleEvents()
    const center = this.view.getWidth() / 2
    this.ballService.create(center, this.view.getHeight() - 41)
    this.platformService.create(center, this.view.getHeight() - 20)

    const gameElements = this.elementService.getElements()
    this.view.ticker$.subscribe(() => {

      this.state.get<BallState>('ball').isFlying && this.ballService.fly()
      this.platformService.handleMove()

      this.view.addChildren(gameElements)
    })
  }

  /**
   * Подписки на события (в текущей реализации только клавиатуры)
   */
  handleEvents(): void {
    this.directionHandler.handle$
      .pipe(filterByKey(['s', 'w']))
      .subscribe((res) => {
        console.log('handle$', res)
      })
    this.directionHandler.handle$
      .pipe(filterByKey(' '))
      .subscribe((res) => {
        if (res.isDown) {
          this.state.update<BallState>('ball', 'isFlying', true)
        }
      })

    this.directionHandler.arrowLeft$.subscribe((isDown) => {
      this.state.update<ArrowState>('arrows', 'left', isDown)
    })

    this.directionHandler.arrowRight$.subscribe((isDown) => {
      this.state.update<ArrowState>('arrows', 'right', isDown)
    })
  }

  /**
   * Перемещение мячика по холсту
   */
  moveBall(): void {
    const stateBall = this.state.get<BallState>('ball')
    const ball = this.elementService.getElement('ball')!
    if (!stateBall.isFlying) {
      return
    }
    ball.rotate && ball.rotate()

    // if (ball.x <= this.view.getWidth()) {
    //   ball.move(1)
    // } else if (ball.x >= 0) {
    //   ball.move(-1)
    // }
  }

}
