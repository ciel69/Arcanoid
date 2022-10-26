import {CollideInterface, Velocity} from '../model/collide.interface';
import {BallInterface, BasicElementInterface, BrickInterface, ElementInterface} from '../model/element.interface';
import {ViewInterface} from '../model/view.interface';
import {BallState, StateInterface} from '../model/state.interface';
import {RulesInterface} from '../model/rules.interface';
import {GameState} from '../model/game.interface';

export default class CollideService implements CollideInterface {

  constructor(
    private view: ViewInterface,
    private elementService: ElementInterface,
    private brickService: BrickInterface,
    private state: StateInterface,
    private ballService: BallInterface,
  ) {
  }

  collisionBallWithBorder(ball: BasicElementInterface): Velocity {
    const rules = this.state.get<RulesInterface>('rules')
    const radius = ball.width! / 2
    const velocity: Velocity = [ball.xVelocity, ball.yVelocity]

    /** Отскок от левой или правой стенки */
    if (
      ball.x + ball.xVelocity < radius ||
      ball.x + ball.xVelocity > this.view.getWidth() - Math.abs(ball.xVelocity) - radius
    ) {
      velocity[0] = -ball.xVelocity
    }

    /** Отскок от верхней стенки */
    if (rules.godMode) {
      if (
        ball.y + ball.yVelocity < radius ||
        ball.y + ball.yVelocity > this.view.getHeight() - Math.abs(ball.yVelocity) - radius
      ) {
        velocity[1] = -ball.yVelocity
      }
    } else {
      if (
        ball.y + ball.yVelocity < radius
      ) {
        velocity[1] = -ball.yVelocity
      }
    }

    if (ball.y + ball.yVelocity > this.view.getHeight() + 20 - Math.abs(ball.yVelocity) - radius && !ball.destroyed) {
      ball.destroyed = true
      const gameState = this.state.get<GameState>('gameState')
      if (gameState.lives > 0) {
        this.state.updateByField<GameState>('gameState', 'lives', --gameState.lives)
        this.state.updateByField<BallState>('ball', 'isFlying', false)
        this.ballService.reset!(ball)
      }
    }

    return velocity
  }

  /** Было ли столкновение с платформой */
  collisionBallWithPlatform(ball: BasicElementInterface): Velocity {
    const velocity: Velocity = [ball.xVelocity, ball.yVelocity]
    const platform = this.elementService.getElement('platform')!
    const x = ball.x + ball.xVelocity
    const y = ball.y + ball.yVelocity
    const radius = ball.width! / 2
    const halfWidthPlatform = platform.width! / 2
    const halfHeightPlatform = platform.height! / 2

    if (
      platform.x - halfWidthPlatform < x + radius && // Заходит за левую сторону кирпичика
      platform.x + halfWidthPlatform > x - radius && // Заходит за правую сторону кирпичика
      platform.y - halfHeightPlatform < y + radius && // Заходит за верхнюю часть кирпичика
      platform.y + halfHeightPlatform > y - radius // Заходит за нижнюю сторону кирпичика
    ) {
      velocity[1] = -ball.yVelocity
    }
    return velocity
  }

  collisionBallWithBrick(ball: BasicElementInterface): Velocity {
    const radius = ball.width! / 2
    let bricks = this.brickService.bricks;
    let velocity: Velocity = [ball.xVelocity, ball.yVelocity]
    let isCollide = false
    /** Переворачивем массив кирпичиков, если шарик летит справа налево */
    bricks = ball.xVelocity > 0 ? bricks : bricks.reverse()

    bricks.forEach(el => {
      if (el.destroyed || isCollide) {
        return
      }

      const x = ball.x + ball.xVelocity
      const y = ball.y + ball.yVelocity

      if (
        el.x < x + radius && // Заходит за левую сторону кирпичика
        el.x + el.width! > x - radius && // Заходит за правую сторону кирпичика
        el.y < y + radius && // Заходит за верхнюю часть кирпичика
        el.y + el.height! > y - radius // Заходит за нижнюю сторону кирпичика
      ) {
        const score = this.state.get<GameState>('gameState').score + 10
        this.state.updateByField<GameState>('gameState', 'score',  score)
        /** Прячем сбитый кирпичик */
        el.destroyed = true

        this.brickService.delete(el)
        ball.setVelocity(...this.getBounceDirection(x, y, ball, el))
      }
    })

    this.brickService.bricks = ball.xVelocity > 0 ? bricks : bricks.reverse()
    return velocity
  }


  /** Определяем направление отскока от кирпичика */
  private getBounceDirection(x: number, y: number, ball: BasicElementInterface, brick: BasicElementInterface): Velocity {
    const velocity: Velocity = [ball.xVelocity, ball.yVelocity]
    const radius = ball.width! / 2
    /** Шарик летит слева снизу */
    if (ball.xVelocity > 0 && ball.yVelocity < 0)
      if (
        Math.abs(x + radius - brick.x) >
        Math.abs(brick.y + brick.height! - (y - radius))
      ) {
        velocity[1] = -ball.yVelocity
      } else velocity[0] = -ball.xVelocity

    /** Шарик летит слева сверху */
    if (ball.xVelocity > 0 && ball.yVelocity > 0)
      if (
        Math.abs(x + radius - brick.x) >
        Math.abs(y + radius - brick.y)
      ) {
        velocity[1] = -ball.yVelocity
      } else velocity[0] = -ball.xVelocity

    /** Шарик летит справа снизу */
    if (ball.xVelocity < 0 && ball.yVelocity < 0)
      if (
        Math.abs(brick.x + brick.width! - (x - radius)) >
        Math.abs(brick.y + brick.height! - (y - radius))
      ) {
        velocity[1] = -ball.yVelocity
      } else velocity[0] = -ball.xVelocity

    /** Шарик летит справа сверху */
    if (ball.xVelocity < 0 && ball.yVelocity > 0)
      if (
        Math.abs(brick.x + brick.width! - (x - radius)) >
        Math.abs(brick.y - (y + radius))
      ) {
        velocity[1] = -ball.yVelocity
      } else velocity[0] = -ball.xVelocity

    return velocity
  }

}
