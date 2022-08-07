import '../styles/main.css';
import '../assets/fonts/kongtext.ttf';
import './init';

/** Находим элемент с нашим приложением */
const app = document.getElementById('app');

app!.innerHTML = `
  <header>
    <h1>arcanoid</h1>
  </header>
  
  <main>
    <div id="gameContainer">
      <canvas id="canvas" width="960" height="540"></canvas>
      <div id="results">
        <h2>Results</h2>
      </div>
    </div>  
  </main>
`;