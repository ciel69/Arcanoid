import {BehaviorSubject} from 'rxjs';
import {BasicElementInterface} from './element.interface';

export interface ViewInterface  {

  ticker$: BehaviorSubject<number>;

  getWidth(): number
  getHeight(): number

  set?(x: number, y: number): void
  addChild(image: BasicElementInterface): void
  addChildren(images: BasicElementInterface[]): void
}
