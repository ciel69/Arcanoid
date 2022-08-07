import '../styles/main.css';
import '../assets/fonts/kongtext.ttf';
import './game';

/** Находим элемент с нашим приложением */
const app = document.getElementById('app');

app!.innerHTML = `
  <header>
    <h1>arcanoid</h1>
  </header>
  
  <main>
    <div id="gameContainer">
      <canvas id="canvas" width="1000" height="600"></canvas>
      <div id="results">
        <h2>Results</h2>
      </div>
    </div>  
  </main>
`;