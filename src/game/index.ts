import {ControlInterface} from '../model/control.interface'
import {ViewInterface} from '../model/view.interface'
import {BallInterface, BrickInterface, ElementInterface, PlatformInterface} from '../model/element.interface'
import {ArrowState, BallState, StateInterface} from '../model/state.interface'
import {RulesInterface} from '../model/rules.interface';
import {GameInterface, GameState} from '../model/game.interface'

import levels from '../data/levels'
import messages from '../data/messages'
import rules from '../main/game_config';

export interface IGame {
  init(): void
}

export class Game implements IGame {

  private gameState = {
    currentLevel: 0,
    showStartMenu: true,
    showLevel: true,
    lives: 3,
    score: 0,
    lastScore: 0,
    bestScore: 0,
    isMusicOn: false,
    isGameOver: false,
    isGame: false,
    isRestart: false,
    isLevelChanged: false,
    message: messages.start,
  }

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
    this.initState()
    this.init()
  }

  init(): void {
    this.handleEvents()
    const center = this.view.getWidth() / 2
    this.ballService.create(center, this.view.getHeight() - 41)
    this.platformService.create(center, this.view.getHeight() - 20)
    const gameState = this.state.get<GameState>('gameState')

    this.createLevel(gameState.currentLevel)

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
        this.gameOverHandler()
      }

      if (gameState.showStartMenu) {
        this.shadowScreen()
      }
    })
  }

  initState(): void {
    this.state.create('arrows', {
      left: false,
      right: false,
    })
    this.state.create('ball', {
      isFlying: false
    })
    this.state.create('rules', rules)

    this.state.create<GameState>('gameState', this.gameState)
    this.gameInfo.show(this.gameState)

    this.state.subscribeState<GameState>('gameState', (state) => {
      this.gameInfo.show(state)
    })
  }

  createLevel(level: number): void {
    levels[level].forEach((row, rowIndex) => {
      row.forEach((el, elIndex) => {
        if (el === 1) {
          this.brickService.create(elIndex * 64 + 32, rowIndex * 32 + 15, `${rowIndex}${elIndex}`)
        }
      })
    })
  }

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
    this.directionHandler.handle(' ', (res) => {
      if (res.isDown) {
        const gameState = this.state.get<GameState>('gameState')
        let state = {
          message: messages.game,
          showStartMenu: false,
          isGame: true,
        } as GameState
        if (gameState.isGameOver) {
          this.createLevel(gameState.currentLevel)
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

    this.directionHandler.handle('g', (res) => {
      if (res.isDown) {
        this.state.updateByField<RulesInterface>('rules', 'godMode', !this.state.get<RulesInterface>('rules').godMode)
      }
    })

    this.directionHandler.arrowUp((isDown) => {
      const gameState = this.state.get<GameState>('gameState')
      if (isDown && !gameState.showStartMenu) {
        this.state.updateByField<BallState>('ball', 'isFlying', true)
      }
    })

    this.directionHandler.arrowLeft((isDown) => {
      this.state.updateByField<ArrowState>('arrows', 'left', isDown)
    })

    this.directionHandler.arrowRight((isDown) => {
      this.state.updateByField<ArrowState>('arrows', 'right', isDown)
    })
  }

  shadowScreen(): void {
    this.view.fillRect(0, 0, this.view.getWidth(), this.view.getHeight(), 'rgba(0, 0, 0, 0.8)')
  }

  gameOverHandler(): void {
    const gameState = this.state.get<GameState>('gameState')
    const state = {
      message: messages.gameOver,
      showLevel: false,
      isGame: false,
      showStartMenu: false,
      isGameOver: true,
    } as GameState

    if (gameState.bestScore < gameState.score) {
      state.bestScore = gameState.score
    }

    this.state.update<GameState>('gameState', state)

    this.shadowScreen()
  }

}
