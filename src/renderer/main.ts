import KeyboardControl from '../engine/keyboard.control';
import CanvasView from '../engine/canvas.view';

import {Game} from '../game';

function main() {
  new Game(
    new KeyboardControl(),
    new CanvasView({
      idContainer: 'canvas',
      width: 960,
      height: 600
    })
  )
}
setTimeout(main)
