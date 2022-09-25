import Rules from '../main/game_config'
import sound from './Sound'
import GameState from '../types/GameState'

export default class Music {
  private state: GameState

  constructor(state: GameState) {
    this.state = state
  }

  on(): void {
    if (!this.state.isMusicOn) {
      Rules.music && this.state.showStartMenu && sound.track1.play()
      Rules.music && !this.state.showStartMenu && sound.track2.play()
    }

    this.state.isMusicOn = true
  }
}