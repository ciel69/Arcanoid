import {DIContainer} from '@wessberg/di';

import KeyboardControl from '../engine/keyboard.control';
import CanvasView from '../engine/canvas.view';
import Element from '../engine/element';
import State from '../engine/state';

import {ControlInterface} from '../model/control.interface';
import {ViewInterface} from '../model/view.interface';
import {BallInterface, BrickInterface, ElementInterface, PlatformInterface} from '../model/element.interface';
import {StateInterface} from '../model/state.interface';
import {CollideInterface} from '../model/collide.interface';
import {GameInterface, GameState} from '../model/game.interface';
import {ListenerInterface} from '../model/listener.interface';

import {Game, IGame} from '../game';

import BallService from '../services/ball.service';
import PlatformService from '../services/platform.service';
import BrickService from '../services/brick.service';
import CollideService from '../services/collide.service';
import GameService from '../services/game.service';
import ListenerService from '../services/listener.service';

import messages from '../data/messages';
import rules from "../main/game_config";

const gameState = {
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

const container = new DIContainer();

// Внешний слой (взаимодействие с внешними сервисами)
container.registerSingleton<ControlInterface, KeyboardControl>();
container.registerSingleton<ViewInterface, CanvasView>();
container.registerSingleton<ElementInterface, Element>();
container.registerSingleton<StateInterface, State>();

// Доменный слой (ядро)
container.registerSingleton<BallInterface, BallService>();
container.registerSingleton<PlatformInterface, PlatformService>();
container.registerSingleton<BrickInterface, BrickService>();
container.registerSingleton<CollideInterface, CollideService>();
container.registerSingleton<GameInterface, GameService>();

const state = container.get<StateInterface>()

state.create('arrows', {
  left: false,
  right: false,
})

state.create('ball', {
  isFlying: false
})

state.create<GameState>('gameState', gameState)

state.create('rules', rules)

// Прикладной слой (описание юзкейсов, событий и тд)
container.registerSingleton<ListenerInterface, ListenerService>();
container.registerSingleton<IGame, Game>();

setTimeout(() => container.get<IGame>())
