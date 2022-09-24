// import { sound } from './sound'

// import { KeyDelayStatus } from '../types/KeyDelayStatus'
// import Rules from './game_config'
// import { sound } from './sound'

/** Обработка нажатий на клавиатуру */
export default class Control {
//   keyDelayStatus: KeyDelayStatus
//
//   constructor(
//       keyDelayStatus: KeyDelayStatus
//   ) {
//     this.keyDelayStatus = keyDelayStatus
//   }
//
//   handleKeyPressed(key: string, status: boolean): void {
//     if (key === ' ') {
//       this.keyWithDelayPressed(key)
//     }
//
//     if (key === 's') {
//       this.keyWithDelayPressed(key)
//     }
//
//     if (!this.showStartMenu && !this.isGameOver) {
//       if (key === 'ArrowUp') {
//         /** Если шарик в полёте - блокируем стрелку вверх */
//         this.arrowsState.ArrowUp = this.ball.isFlying ? false : status
//       }
//
//       if (key === 'ArrowLeft') {
//         this.arrowsState.ArrowLeft = status
//       }
//
//       if (key === 'ArrowRight') {
//         this.arrowsState.ArrowRight = status
//       }
//     }
//   }
//
//   keyWithDelayPressed(key: string): void {
//     if (!this.keyDelayStatus.delayInProgress[key] && !this.keyDelayStatus.keyDelay[key]) {
//       this.keyDelayStatus.delayInProgress[key] = true
//       setTimeout(() => {
//         this.keyDelayStatus.delayInProgress[key] = false
//         this.keyDelayStatus.keyDelay[key] = false
//       }, 400)
//     }
//
//     if (!this.keyDelayStatus.keyDelay[key]) {
//       switch (key) {
//         case ('s'): Rules.systemInfo = !Rules.systemInfo; break
//         case (' '): this.spacePressed(); break
//       }
//       this.keyDelayStatus.keyDelay[key] = true
//     }
//   }
//
//   spacePressed():void {
//     if (this.showStartMenu && this.isMusicOn) {
//       sound.track1.stop()
//       this.isMusicOn = false
//       this.showStartMenu = false
//     }
//
//     if (this.isGameOver) {
//       this.ball.lives = this.lives
//       this.isMusicOn = false
//       this.showStartMenu = true
//       this.isGameOver = false
//       this.showLevel = true
//       // this.newGameIsCreating = true
//       this.restart()
//     }
//   }
//
//   control(): void {
//     if (this.arrowsState.ArrowLeft) {
//       this.platform.move(0)
//       /** Если мячик не в полёте - он движется вместе с платформой */
//       if (!this.ball.isFlying) {
//         this.ball.x = this.platform.x + this.platform.width / 2
//       }
//       this.platformDirection = 'left'
//     }
//
//     if (this.arrowsState.ArrowRight) {
//       this.platform.move(1)
//       /** Если мячик не в полёте - он движется вместе с платформой */
//       if (!this.ball.isFlying) {
//         this.ball.x = this.platform.x + this.platform.width / 2
//       }
//       this.platformDirection = 'right'
//     }
//
//     if (this.arrowsState.ArrowUp) {
//       if (!this.ball.isFlying) {
//         if (this.platformDirection === 'right') {
//           this.ball.xVelocity = -4
//           this.ball.rotateSpeed = 6
//         } else {
//           this.ball.xVelocity = 4
//           this.ball.rotateSpeed = -6
//         }
//       }
//       this.ball.isFlying = true
//       this.ball.fly()
//     }
//   }
}