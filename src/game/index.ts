import {ControlInterface} from '../model/control.interface'
import {ViewInterface} from '../model/view.interface'
import {BallInterface, BrickInterface, ElementInterface, PlatformInterface} from '../model/element.interface'
import {ArrowState, BallState, StateInterface} from '../model/state.interface'
import {RulesInterface} from '../model/rules.interface';
import {GameInterface, GameState} from '../model/game.interface'

import levels from '../data/levels'
import messages from '../data/messages'

export interface IGame {
  init(): void
}

export class Game implements IGame {

  constructor(
    private directionHandler: ControlInterface,
    private view: ViewInterface,
    private elementService: ElementInterface,
    private state: StateInterface,
    private ballService: BallInterface,
    private platformService: PlatformInterface,
    private brickService: BrickInterface,
    private gameInfo: GameInterface,
  ) {

    // Конфигурируем холст
    view.configure(
      {
        idContainer: 'canvas',
        width: 960,
        height: 600
      })
    this.init()

    const gameState = state.get<GameState>('gameState')
    this.gameInfo.show(gameState)
  }

  init(): void {
    this.handleEvents()
    const center = this.view.getWidth() / 2
    this.ballService.create(center, this.view.getHeight() - 41)
    this.platformService.create(center, this.view.getHeight() - 20)
    const gameState = this.state.get<GameState>('gameState')

    this.createLevel(gameState.currentLevel)

    // Основная логика игры вызываемая на каждый тик анимации
    this.view.ticker(() => {
      const gameState = this.state.get<GameState>('gameState')
      if (gameState.isGameOver) {
        return
      }
      const gameElements = this.elementService.getElements()

      if (!gameState.showStartMenu && gameState.isGame) {
        this.state.get<BallState>('ball').isFlying && this.ballService.move()
        this.platformService.move()
      }

      if (!gameState.showStartMenu && gameState.isGame && this.brickService.isEmpty()) {
        this.nextLevel()
      }

      this.view.addChildren(gameElements)

      if (gameState.lives === 0) {
        this.gameOver()
      }

      if (gameState.showStartMenu) {
        this.shadowScreen()
      }
    })
  }

  /**
   * Построение кирпичиков на уровне
   * @param level
   */
  createLevel(level: number): void {
    levels[level].forEach((row, rowIndex) => {
      row.forEach((el, elIndex) => {
        if (el === 1) {
          this.brickService.create(elIndex * 64 + 32, rowIndex * 32 + 15, `${rowIndex}${elIndex}`)
        }
      })
    })
  }

  /**
   * Переход на следующий уровеннь
   */
  nextLevel(): void {
    const gameState = this.state.get<GameState>('gameState')
    const localLevel = gameState.currentLevel + 1
    this.state.updateByField<BallState>('ball', 'isFlying', false)
    this.state.updateByField<GameState>('gameState', 'currentLevel', localLevel)
    this.ballService.resetAll()
    this.createLevel(localLevel)
  }

  /**
   * Подписки на события (в текущей реализации только клавиатуры)
   */
  handleEvents(): void {
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

  /**
   * Затемнение игрового поля
   */
  shadowScreen(): void {
    this.view.fillRect(0, 0, this.view.getWidth(), this.view.getHeight(), 'rgba(0, 0, 0, 0.8)')
  }

  /**
   * Алгоритм вызываемый при проигрыше
   */
  gameOver(): void {
    const gameState = this.state.get<GameState>('gameState')
    const state = {
      message: messages.gameOver,
      currentLevel: 0,
      showLevel: false,
      isGame: false,
      showStartMenu: false,
      isGameOver: true,
    } as GameState

    if (gameState.bestScore < gameState.score) {
      state.bestScore = gameState.score
    }
    this.ballService.resetAll()
    this.brickService.deleteAll()

    this.state.update<GameState>('gameState', state)

    this.createLevel(state.currentLevel)
    this.shadowScreen()
  }

}
