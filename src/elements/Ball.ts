export class Ball {

  x: number = 0
  y: number = 0
  rotateSpeed: number = 5

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
}