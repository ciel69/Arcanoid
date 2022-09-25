import '../styles/main.css';
import '../assets/fonts/kongtext.ttf';
import './init';

/** Находим элемент с нашим приложением */
const app = document.getElementById('app');

app!.innerHTML = `
  <header>
    <h1>
    <span>a</span>
    <span>r</span>
    <span>c</span>
    <span>a</span>
    <span>n</span>
    <span>o</span>
    <span>i</span>
    <span>d</span>
    </h1>
  </header>
  
  <main>
    <div id="gameContainer">
      <canvas style="font-family: 'kongtext', Arial, sans-serif" id="canvas" width="960" height="600"></canvas>
      <aside id="results">
        <h2>Results</h2>
        <ul class="game-info__list">
          <li class="game-info__item"><span>Level: </span><span id="level"></span></li>
          <li class="game-info__item"><span>Lives: </span><span id="lives"></span></li>
          <li class="game-info__item"><span>Score: </span><span id="score"></span></li>          
          <li class="game-info__item"><span>Best score: </span><span id="bestScore"></span></li>          
        </ul>
        <div class="message__container">
          <span id="message"></span>
        </div>
      </aside>
    </div>  
  </main>
`;