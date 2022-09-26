import arrr from '../assets/sound/arrr.wav'
import blockBounce from '../assets/sound/blockBounce.wav'
import track1 from '../assets/music/track1.mp3'
import track2 from '../assets/music/track2.mp3'
import wallBounce from '../assets/sound/wallBounce.wav'

export class Sound {
  sound: HTMLAudioElement

  constructor(src: any, loop: boolean = false) {
    this.sound = document.createElement("audio") as HTMLAudioElement;
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.loop = loop
    document.body.appendChild(this.sound);
  }

  play(){
    this.sound.play();
  }

  stop(){
    this.sound.pause();
  }
}

/** Звук */
const sound = {
  track1: new Sound(track1, true),
  track2: new Sound(track2, true),

  arr: new Sound(arrr),
  wallBounce: new Sound(wallBounce),
  blockBounce: new Sound(blockBounce),
}

export default sound