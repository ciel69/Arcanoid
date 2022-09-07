import '../styles/main.css';
import '../assets/fonts/kongtext.ttf';
import './init';

/** Находим элемент с нашим приложением */
const app = document.getElementById('app');

app!.innerHTML = `
  <header>
    <h1>
    <span style="color: red;">a</span>
    <span style="color: orange;">r</span>
    <span style="color: yellow;">c</span>
    <span style="color: green;">a</span>
    <span style="color: lightblue;">n</span>
    <span style="color: blue; letter-spacing: -1em"">o</span>
    <span style="color: purple; letter-spacing: -1em">i</span>
    <span style="color: red;">d</span>
    </h1>
  </header>
  
  <main>
    <div id="gameContainer">
      <canvas style="font-family: 'kongtext', Arial, sans-serif" id="canvas" width="960" height="600"></canvas>
      <div id="results">
        <h2>Results</h2>
      </div>
    </div>  
  </main>
`;