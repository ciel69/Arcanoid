import { Brick } from './Brick'
import { Platform } from './Platform'
import { BaseGeometry } from '../types/baseGeometry'
import Rules from '../core/Config'
import { sound } from '../core/Sound'

type Direction = 'x' | 'y' | 'both'
type BallSpeed = -6 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 6

export class Ball {
  x = 0
  y = 0
  dx = 0
  dy = 0
  rotateSpeed = 0
  xVelocity: BallSpeed = 0
  yVelocity: BallSpeed = 4
  isFlying = false
  radius = 12
  collisions = 0
  bricks: Brick[]
  platform: Platform
  lives: number
  isBallLost = false

  private _ballAngle = 0

  constructor(
      x: number,
      y: number,
      rotateSpeed: number,
      bricks: Brick[],
      platform: Platform,
      lives: number
  ) {
    this.x = x
    this.y = y
    this.rotateSpeed = rotateSpeed
    this.bricks = bricks
    this.platform = platform
    this.lives = lives
  }

  /** Отдаём угол вращения мяча */
  get ballAngle(): number {
    this._ballAngle += this.rotateSpeed;

    if (this._ballAngle === 360) {
      this._ballAngle = 0
    }

    return +(this._ballAngle * Math.PI / 180)
  }

  /** Движение шарика */
  public fly(): void {
    this.dy = -this.yVelocity
    this.dx = -this.xVelocity

    this.isBorderCollide()
    this.isBrickCollide()
    this.isPlatformCollide()

    this.x += this.dx
    this.y += this.dy
  }

  /** Было ли столкновение с платформой */
  private isPlatformCollide(): void {
    const x = this.x + this.dx
    const y = this.y + this.dy

    if (
        this.platform.x < x + this.radius && // Заходит за левую сторону кирпичика
        this.platform.x + this.platform.width > x - this.radius && // Заходит за правую сторону кирпичика
        this.platform.y < y + this.radius && // Заходит за верхнюю часть кирпичика
        this.platform.y + this.platform.height > y - this.radius // Заходит за нижнюю сторону кирпичика
    ) {
      this.bounce(this.getBounceDirection(x, y, this.platform))
      console.log('Столкновение с платформой')
    }
  }

  /** Было ли столкновение с краями экрана? */
  private isBorderCollide(): void {
    let x = false
    let y = false


    /** Отскок от левой или правой стенки */
    if (
        this.x + this.dx < this.radius ||
        this.x + this.dx > 960 - Math.abs(this.xVelocity) - this.radius
    ) {
      Rules.sound && sound.wallBounce.play()
      x = true
    }

    /** Отскок от верхней стенки */
    if (Rules.godMode) {
      if (
          this.y + this.dy < this.radius ||
          this.y + this.dy > 600 - Math.abs(this.yVelocity) - this.radius
      ) {
        Rules.sound && sound.wallBounce.play()
        y = true
      }
    } else {
      if (
          this.y + this.dy < this.radius
      ) {
        Rules.sound && sound.wallBounce.play()
        y = true
      }
    }

    if (this.y + this.dy > 580   - Math.abs(this.yVelocity) - this.radius) {
      this.handleLostBall()
    }

    /** Определяем направление отскока от стены */
    if (x && !y) {
      this.bounce('x')
    } else if (!x && y) {
      this.bounce('y');
    } else if (x && y) {
      this.bounce('both');
    }
  }

  private handleLostBall(): void {

    /** Включаем флаг потери мяча */
    this.isBallLost = true
    this.lives -= 1
    console.log('Осталось жизней: ', this.lives)

    /** Останавливавем шарик */
    this.xVelocity = 0
    this.rotateSpeed = 0
    this.dx = 0
    this.dy = 0

    /** Возвращаем шарик на платформу */
    this.y = 537
    this.x = this.platform.x + this.platform.width / 2
    this.isFlying = false
  }

  /** Было ли столкновение с кирпичиком */
  private isBrickCollide(): void {
    let isCollide = false
    /** Переворачивем массив кирпичиков, если шарик летит справа налево */
    this.bricks = this.dx > 0 ? this.bricks : this.bricks.reverse()

    this.bricks.forEach(el => {

      if (!el.visible || isCollide) {
        return
      }

      const x = this.x + this.dx
      const y = this.y + this.dy

      if (
          el.x < x + this.radius && // Заходит за левую сторону кирпичика
          el.x + el.width > x - this.radius && // Заходит за правую сторону кирпичика
          el.y < y + this.radius && // Заходит за верхнюю часть кирпичика
          el.y + el.height > y - this.radius // Заходит за нижнюю сторону кирпичика
      ) {
        el.visible = false
        isCollide = true
        Rules.sound && sound.blockBounce.play()
        this.bounce(this.getBounceDirection(x, y, el))
      }
    })

    /** Возвращаем массив с кирпичиками в исходное состояние */
    this.bricks = this.dx > 0 ? this.bricks : this.bricks.reverse()
  }

  /** Определяем направление отскока от кирпичика */
  private getBounceDirection(x: number, y: number, el: BaseGeometry): Direction {
    /** Шарик летит слева снизу */
    if (this.dx > 0 && this.dy < 0)
      if (
          Math.abs(x + this.radius - el.x) >
          Math.abs(el.y + el.height - (y - this.radius))
      ) {
        return 'y'
      } else return 'x'

    /** Шарик летит слева сверху */
    if (this.dx > 0 && this.dy > 0)
      if (
          Math.abs(x + this.radius - el.x) >
          Math.abs(y + this.radius - el.y)
      ) {
        return 'y'
      } else return 'x'

    /** Шарик летит справа снизу */
    if (this.dx < 0 && this.dy < 0)
      if (
          Math.abs(el.x + el.width - (x - this.radius)) >
          Math.abs(el.y + el.height - (y - this.radius))
      ) {
        return 'y'
      } else return 'x'

    /** Шарик летит справа сверху */
    if (this.dx < 0 && this.dy > 0)
      if (
          Math.abs(el.x + el.width - (x - this.radius)) >
          Math.abs(el.y - (y + this.radius))
      ) {
        return 'y'
      } else return 'x'

    return 'both'
  }

  /** Отскок шарика */
  private bounce(direction: Direction): void {
    switch (direction) {
      case 'x':
        this.xVelocity = -this.xVelocity as BallSpeed
        break;
      case 'y':
        this.yVelocity = -this.yVelocity as BallSpeed
        break;
      default:
        this.xVelocity = -this.xVelocity as BallSpeed
        this.yVelocity = -this.yVelocity as BallSpeed
        break
    }

    this.rotateSpeed = -this.rotateSpeed
    this.collisions += 1
  }
}
