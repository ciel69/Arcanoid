import {
  BasicElementInterface, BrickInterface,
  ElementInterface
} from '../model/element.interface';

import brickBg from '../assets/images/brick.png'

export default class BrickService implements BrickInterface {

  bricks: BasicElementInterface[] = []

  constructor(
    private elementService: ElementInterface,
  ) {
  }

  /**
   * Создаём мячик
   * @param x
   * @param y
   */
  create(x: number = 0, y: number = 0, id: string = ''): BasicElementInterface {
    const localId = `brick-${id}`
    const brick = this.elementService.createElement(localId, brickBg)
    brick.setVelocity(0)
    brick.width = 64
    brick.height = 32
    brick.destroyed = false
    brick.id = localId
    brick.x = x
    brick.y = y
    this.bricks.push(brick)
    return brick
  }

  isEmpty(): boolean {
    return !this.bricks.filter(item => !item.destroyed).length
  }

  delete(el: BasicElementInterface): void {
    this.bricks = this.bricks.filter(item => item.id! !== item.id!)
    this.elementService.deleteElement(el.id!)
  }

  deleteAll(): void {
    this.bricks.forEach(item => {
      this.delete(item)
    })
    this.bricks = []
  }

  move(): void {

  }
}
