import {ListenerInterface} from '../model/listener.interface';
import {ArrowState, BallState, StateInterface} from '../model/state.interface';
import {GameInterface, GameState} from '../model/game.interface';
import {ControlInterface} from '../model/control.interface';
import {RulesInterface} from '../model/rules.interface';

import messages from '../data/messages';

export default class ListenerService implements ListenerInterface {

  constructor(
    private state: StateInterface,
    private gameInfo: GameInterface,
    private directionHandler: ControlInterface,
  ) {
  }

  /**
   * Подписки на события
   */
  toListen(): void {
    // Подписка на изменение стейта
    this.state.subscribeState<GameState>('gameState', (state) => {
      this.gameInfo.show(state)
    })

    // Подписка на нажатие пробела
    this.directionHandler.handle(' ', (res) => {
      if (res.isDown) {
        const gameState = this.state.get<GameState>('gameState')
        let state = {
          message: messages.game,
          showStartMenu: false,
          isGame: true,
        } as GameState
        if (gameState.isGameOver) {
          state = {
            ...state,
            isGameOver: false,
            lives: 3,
            score: 0,
          }
        }
        this.state.update<GameState>('gameState', state)
      }
    })

    // Подписка на нажатие клавиши "G"
    this.directionHandler.handle('g', (res) => {
      if (res.isDown) {
        this.state.updateByField<RulesInterface>('rules', 'godMode', !this.state.get<RulesInterface>('rules').godMode)
      }
    })

    // Продписка на нажатие стрелки вверх
    this.directionHandler.arrowUp((isDown) => {
      const gameState = this.state.get<GameState>('gameState')
      if (isDown && !gameState.showStartMenu) {
        this.state.updateByField<BallState>('ball', 'isFlying', true)
      }
    })

    // Продписка на нажатие стрелки влево
    this.directionHandler.arrowLeft((isDown) => {
      this.state.updateByField<ArrowState>('arrows', 'left', isDown)
    })

    // Продписка на нажатие стрелки вправо
    this.directionHandler.arrowRight((isDown) => {
      this.state.updateByField<ArrowState>('arrows', 'right', isDown)
    })
  }
}
