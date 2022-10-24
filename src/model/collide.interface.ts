import {BasicElementInterface} from "./element.interface";

export type Velocity = [xVelocity: number, yVelocity: number]

export interface CollideInterface {
  /**
   * Проверко столкнулся ли шарик с краем холста
   * @param ball
   */
  collisionBallWithBorder(ball: BasicElementInterface): Velocity

  /**
   * Проверка столкнулся ли шарик с платформой
   * @param ball
   */
  collisionBallWithPlatform(ball: BasicElementInterface): Velocity

  /**
   * Проверока столкнулся ли шарик с кирпичиком
   * @param ball
   */
  collisionBallWithBrick(ball: BasicElementInterface): Velocity
}
