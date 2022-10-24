import {BasicElementInterface, ElementInterface} from '../model/element.interface';
import {ViewInterface} from '../model/view.interface';
import {ArrowState, BallState, StateInterface} from '../model/state.interface';

import platformImage from '../assets/images/platformG96.png';

export default class PlatformService {

  constructor(
    private view: ViewInterface,
    private elementService: ElementInterface,
    private state: StateInterface,
  ) {
  }

  /**
   * Создаём платформу
   * @param x
   * @param y
   */
  create(x: number = 0, y: number = 0): BasicElementInterface {
    const platform = this.elementService.createElement('platform', platformImage)
    platform.setVelocity(3)
    platform.x = x
    platform.y = y
    platform.width = 96
    platform.height = 16
    return platform
  }

  /**
   * Логика передвижения платформы с коллизией на края холста
   */
  handleMove(): void {
    const stateArrow = this.state.get<ArrowState>('arrows')
    const platform = this.elementService.getElement('platform')!
    const ball = this.elementService.getElement('ball')!
    const halfWidth = platform.width! / 2
    if (stateArrow.right && platform.x + platform.xVelocity <= (this.view.getWidth() - halfWidth)) {
      platform.move(1)
      !this.state.get<BallState>('ball').isFlying && ball.move(1)
    }
    if (stateArrow.left && platform.x - platform.xVelocity >= halfWidth) {
      platform.move(-1)
      !this.state.get<BallState>('ball').isFlying && ball.move(-1)
    }
  }

}
