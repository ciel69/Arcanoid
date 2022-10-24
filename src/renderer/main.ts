import {DIContainer} from '@wessberg/di';

import KeyboardControl from '../engine/keyboard.control';
import CanvasView from '../engine/canvas.view';
import Element from '../engine/element';
import State from '../engine/state';

import {ControlInterface} from '../model/control.interface';
import {ViewInterface} from '../model/view.interface';
import {ElementInterface} from '../model/element.interface';
import {StateInterface} from '../model/state.interface';

import {Game, IGame} from '../game';

const container = new DIContainer();
container.registerSingleton<ControlInterface, KeyboardControl>();
container.registerSingleton<ViewInterface, CanvasView>();
container.registerSingleton<ElementInterface, Element>();
container.registerSingleton<StateInterface, State>();
container.registerSingleton<IGame, Game>();

setTimeout(() => container.get<IGame>())
