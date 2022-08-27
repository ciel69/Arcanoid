export class Ball {

  x = 0
  y = 0
  dx = 0
  dy = 0
  rotateSpeed = 0
  xVelocity = 4
  yVelocity = 3
  isFlying = false
  radius = 12
  collisions = 0

  private _ballAngle = 0

  constructor(x: number, y: number, rotateSpeed: number) {
    this.x = x
    this.y = y
    this.rotateSpeed = rotateSpeed
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

    this.isBorderCollision()

    this.x += this.dx
    this.y += this.dy
  }

  /** Было ли столкновение с краями экрана? */
  private isBorderCollision(): void {
    if (this.x + this.dx < 0 || this.x + this.dx > 960 - Math.abs(this.xVelocity) - this.radius * 2) {
      this.xVelocity = -this.xVelocity
      this.rotateSpeed = -this.rotateSpeed
      this.collisions += 1
    }

    if (this.y + this.dy < 0 || this.y + this.dy > 540 - Math.abs(this.yVelocity) - this.radius * 2) {
      this.yVelocity = -this.yVelocity
      this.rotateSpeed = -this.rotateSpeed
      this.collisions += 1
    }
  }
}