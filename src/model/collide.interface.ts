import {BasicElementInterface} from "./element.interface";

export type Velocity = [xVelocity: number, yVelocity: number]

export interface CollideInterface {
  collisionBallWithBorder(ball: BasicElementInterface): Velocity
  collisionBallWithPlatform(ball: BasicElementInterface): Velocity
  collisionBallWithBrick(ball: BasicElementInterface): Velocity
}
