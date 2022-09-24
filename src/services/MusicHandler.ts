import Rules from '../main/game_config'
import { sound } from '../modules/sound'
import { GameState } from '../types/GameState'

export class MusicHandler {
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