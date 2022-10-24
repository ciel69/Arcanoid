import {BasicElementInterface, ElementInterface} from '../model/element.interface';
import {ViewInterface} from '../model/view.interface';

import ballImage from '../assets/images/ball.png';
import rules from '../main/game_config';
// import sound from '../services/Sound';

export default class BallService {

  constructor(
    private view: ViewInterface,
    private elementService: ElementInterface,
  ) {
    // rules.godMode = true
  }

  /**
   * Создаём мячик
   * @param x
   * @param y
   */
  create(x: number = 0, y: number = 0): BasicElementInterface {
    const ball = this.elementService.createElement('ball', ballImage)
    ball.setVelocity(3)
    ball.width = 24
    ball.height = 24
    ball.x = x
    ball.y = y
    ball.rotate = this.view.rotateElement(ball, 2)
    return ball
  }

  fly(): void {
    const ball = this.elementService.getElement('ball')!
    this.isBorderCollide()
    this.isPlatformCollide()
    ball.rotate && ball.rotate()
    ball.move(1, 1)
  }

  /**
   * Определяем была ли коллизия с краями холста
   * @private
   */
  private isBorderCollide(): void {
    const ball = this.elementService.getElement('ball')!
    const radius = ball.width! / 2

    /** Отскок от левой или правой стенки */
    if (
      ball.x + ball.xVelocity < radius ||
      ball.x + ball.xVelocity > this.view.getWidth() - Math.abs(ball.xVelocity) - radius
    ) {
      // rules.sound && sound.wallBounce.play()
      ball.xVelocity = -ball.xVelocity
    }

    /** Отскок от верхней стенки */
    if (rules.godMode) {
      if (
        ball.y + ball.yVelocity < radius ||
        ball.y + ball.yVelocity > this.view.getHeight() - Math.abs(ball.yVelocity) - radius
      ) {
        ball.yVelocity = -ball.yVelocity
        // rules.sound && sound.wallBounce.play()
      }
    } else {
      if (
        ball.y + ball.yVelocity < radius
      ) {
        ball.yVelocity = -ball.yVelocity
        // rules.sound && sound.wallBounce.play()
      }
    }

    if (ball.y + ball.yVelocity > this.view.getHeight() - Math.abs(ball.yVelocity) - radius) {
      console.log('handleLostBall');
    }
  }

  /** Было ли столкновение с платформой */
  private isPlatformCollide(): void {
    const ball = this.elementService.getElement('ball')!
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
      ball.yVelocity = -ball.yVelocity
    }
  }
}
