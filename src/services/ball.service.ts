import {
  BallInterface,
  BasicElementInterface,
  ElementInterface
} from '../model/element.interface';
import {ViewInterface} from '../model/view.interface';
import {CollideInterface} from '../model/collide.interface';
import {BallState, StateInterface} from '../model/state.interface';

import ballImage from '../assets/images/ball.png';

export default class BallService implements BallInterface {

  private balls: BasicElementInterface[] = []

  constructor(
    private view: ViewInterface,
    private elementService: ElementInterface,
    private collideService: CollideInterface,
    private state: StateInterface,
  ) {
  }

  /**
   * Создаём мячик
   * @param x
   * @param y
   */
  create(x: number = 0, y: number = 0, id = '0'): BasicElementInterface {
    const localId = `ball${id}`
    const ball = this.elementService.createElement(localId, ballImage)
    ball.setVelocity(3)
    ball.width = 24
    ball.height = 24
    ball.x = x
    ball.y = y
    ball.rotate = this.view.rotateElement(ball, 2)
    ball.id = localId
    this.balls.push(ball)
    return ball
  }

  move(x: 0 | 1 | -1 = 1, y: 0 | 1 | -1 = 1): void {
    this.balls.forEach(item => {
      const ball = this.elementService.getElement(item.id!)!
      if (this.state.get<BallState>('ball').isFlying && ball.rotate && !ball.destroyed) {
        ball.setVelocity(...this.collideService.collisionBallWithBorder(ball))
        ball.setVelocity(...this.collideService.collisionBallWithPlatform(ball))
        this.collideService.collisionBallWithBrick(ball)
        ball.rotate()
      }
      ball.move(x, y)
    })
  }

  getBalls(): BasicElementInterface[] {
    return this.balls
  }

  deleteBall(ball: BasicElementInterface): void {
    this.balls = this.balls.filter(item => item.id! !== item.id!)
    this.elementService.deleteElement(ball.id!)
  }

  reset(ball: BasicElementInterface): void {
    const localId = ball.id!
    const platform = this.elementService.getElement('platform')!
    ball.destroyed = true
    this.balls = this.balls.filter(item => !item.destroyed)
    this.create(platform.x, this.view.getHeight() - 41, localId)
  }

  resetAll(): void {
    this.balls.forEach(item => {
      this.reset(this.elementService.getElement(item.id!)!)
    })
  }

}
