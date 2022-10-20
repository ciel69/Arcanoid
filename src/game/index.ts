import {ControlInterface} from '../model/control.interface'
import {ViewInterface} from '../model/view.interface'
import {ElementInterface} from '../model/element.interface'

import {filterByKey} from '../utils'

import ballImage from '../assets/images/ball.png'
import platformImage from '../assets/images/platformG96.png'

export class Game {

  state = {
    arrows: {
      left: false,
      right: false,
    },
    ball: {
      isFlying: false
    }
  }

  constructor(
    private directionHandler: ControlInterface,
    private view: ViewInterface,
    private elementService: ElementInterface,
  ) {
    this.init()
  }

  init(): void {
    this.handleEvents()
    const center = this.view.getWidth() / 2
    const ball = this.addBall(center, this.view.getHeight() - 44)
    const platform = this.addPlatform(center, this.view.getHeight() - 20)

    const rotatePlatform = this.view.rotateElement(platform, -3)
    const rotateBall = this.view.rotateElement(ball, 2)

    const gameElements = this.elementService.getElements()
    this.view.ticker$.subscribe(() => {

      this.moveBall()
      this.movePlatform()

      this.view.addChildren(gameElements)
      rotateBall()
      rotatePlatform()
    })
  }

  /**
   * Подписки на события (в текущей реализации только клавиатуры)
   */
  handleEvents() {
    this.directionHandler.handle$
      .pipe(filterByKey(['s', 'w']))
      .subscribe((res) => {
        console.log('handle$', res)
      })

    this.directionHandler.arrowLeft$.subscribe((isDown) => {
      this.state.arrows.left = isDown
    })

    this.directionHandler.arrowRight$.subscribe((isDown) => {
      this.state.arrows.right = isDown
    })
  }

  /**
   * Создаём мячик
   * @param x
   * @param y
   */
  addBall(x: number = 0, y: number = 0) {
    const ball = this.elementService.createElement('ball', ballImage)
    ball.setVelocity(3)
    ball.width = 24
    ball.height = 24
    ball.x = x
    ball.y = y
    return ball
  }

  /**
   * Создаём платформу
   * @param x
   * @param y
   */
  addPlatform(x: number = 0, y: number = 0) {
    const platform = this.elementService.createElement('platform', platformImage)
    platform.setVelocity(3)
    platform.x = x
    platform.y = y
    platform.width = 96
    platform.height = 16
    return platform
  }

  /**
   * Перемещение мячика по холсту
   */
  moveBall() {
    const ball = this.elementService.getElement('ball')!
    if (!this.state.ball.isFlying) {
      return
    }

    if (ball.x <= this.view.getWidth()) {
      ball.move(1)
    } else if (ball.x >= 0) {
      ball.move(-1)
    }
  }

  /**
   * Логика передвижения платформы с коллизией на края холста
   */
  movePlatform() {
    const platform = this.elementService.getElement('platform')!
    const ball = this.elementService.getElement('ball')!
    const halfWidth = platform.width! / 2
    if (this.state.arrows.right && platform.x + platform.xVelocity <= (this.view.getWidth() - halfWidth)) {
      platform.move(1)
      ball.move(1)
    }
    if (this.state.arrows.left && platform.x - platform.xVelocity >= halfWidth) {
      platform.move(-1)
      ball.move(-1)
    }
  }

}
