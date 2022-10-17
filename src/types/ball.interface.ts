export interface BallInterface {
  /**
   * Летит ли мячь
   */
  isFlying: boolean

  /**
   * Координаты мяча по оси x
   */
  x: number
  /**
   * Координаты мяча по оси y
   */
  y: number

  /**
   * Скорость по оси x
   */
  xVelocity: number
  /**
   * Скорость по оси y
   */
  yVelocity: number

  /**
   * Скорость вращения
   */
  rotateSpeed: number
}
