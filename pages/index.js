import Head from 'next/head'

let Sketch

if (process.browser) {
  Sketch = require("react-p5")
}


import { useEffect } from 'react'

const SIZE_WIDTH = 500;
const SIZE_HEIGHT = 200;
const GRID_STEPS = 70;
const GRID_SIZE_WIDTH = SIZE_WIDTH / GRID_STEPS;
const GRID_SIZE_HEIGHT = SIZE_HEIGHT / GRID_STEPS;

const Home = () => {
    let myFont;
    let graphic;
    

    const preload = p5 => {
      myFont = p5.loadFont('SpaceGrotesk-Bold.ttf');
    }

    const setup = (p5, canvasParentRef) => {
      p5.createCanvas(SIZE_WIDTH, SIZE_HEIGHT).parent(canvasParentRef);
      graphic = p5.createGraphics(SIZE_WIDTH, SIZE_HEIGHT);
      graphic.textFont(myFont);
      graphic.textAlign(p5.CENTER);
      graphic.textSize(160);
      graphic.fill('#ff00ff');
      graphic.text('polbac', SIZE_WIDTH/2, SIZE_HEIGHT/2);
      
    };
    
    const draw = p5 => {
      
      p5.background("#0000ff");
      const wave = 0.07


      for (let x = 0; x < GRID_STEPS; x++) {
        for (let y = 0; y < GRID_STEPS; y++) {
          const distorsionX = Math.sin(p5.frameCount * wave + x + y * 0.3) * 2;
          const distorsionY = Math.sin(p5.frameCount * wave + x + y * 0.1) * 2;
          const distanceVector = p5.createVector((x * GRID_SIZE_WIDTH) - p5.mouseX, (y * GRID_SIZE_HEIGHT) - p5.mouseY);
          const distanseDistorsion = distanceVector.mult(5 / distanceVector.mag());

          p5.image(graphic, 
            x * GRID_SIZE_WIDTH, 
            y * GRID_SIZE_HEIGHT, 
            GRID_SIZE_WIDTH, 
            GRID_SIZE_HEIGHT, 
            x * GRID_SIZE_WIDTH + distorsionX + distanseDistorsion.x, 
            y * GRID_SIZE_HEIGHT + distorsionY + distanseDistorsion.y, 
            GRID_SIZE_WIDTH , 
            GRID_SIZE_HEIGHT 
          )
        }
      }
      
    };

  
  

  return (<div className="container">
    <Head>
      <title>polbac</title>
      <link href="https://fonts.googleapis.com/css?family=Press+Start+2P|Prompt&display=swap" rel="stylesheet" />

    </Head>

    <main>
      
      {Sketch && <Sketch setup={setup} draw={draw} preload={preload} />}

      <p className="description">
        
        <marquee>universal javascript developer</marquee>

        
      </p>

        <img id="image" src="polbac.png" alt=""/>

      <div className="grid">
        <a target="_blank" href="pablobacchetta-cv.pdf" className="card">
        
          <h3><span className="emoji">📜</span><br/>cv</h3>
        </a>

        

        <a target="_blank" href="https://github.com/polbac" className="card">
        
          <h3><span className="emoji">🎎</span><br/>github</h3>
        </a>

        <a target="_blank" href="https://medium.com/@polbac" className="card">
        
          <h3><span className="emoji">🖌</span><br/>medium</h3>
        </a>
        <a target="_blank" href="https://www.linkedin.com/in/pablo-gustavo-bacchetta-b780b390/" className="card">
        
          <h3><span className="emoji">🌎</span><br/>linkedin</h3>
        </a>
      </div>
    </main>


    <style jsx>{`

      .title{
        position: sticky;
        top: 20px;
        font-size: 40px; letter-spacing: 50px;
        z-index: 1000;
        }
      .hero{
        width: 90%;
        max-width: 400px;
        margin-top: 50px;
        margin-bottom: 50px;
      }
      .emoji{
        font-size: 40px;
      }
      .container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      main {
        padding: 5rem 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      footer {
        width: 100%;
        height: 100px;
        border-top: 1px solid #eaeaea;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      footer img {
        margin-left: 0.5rem;
      }

      footer a {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      .title a {
        color: #0070f3;
        text-decoration: none;
      }

      .title a:hover,
      .title a:focus,
      .title a:active {
        text-decoration: underline;
      }

      .title {
        margin: 0;
        line-height: 1.15;
        font-size: 3rem;
      }

      .title,
      .description {
        text-align: center;
        letter-spacing: 10px;
      }

      .description {
        line-height: 1.5;
        font-size: 1.5rem;
        width: 100%;
      }

      .description:hover{
        color: #ff00ff;
      }

      code {
        background: #fafafa;
        border-radius: 5px;
        padding: 0.75rem;
        font-size: 1.1rem;
        font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
          DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
      }

      .grid {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;

        max-width: 800px;
        margin-top: 3rem;
        text-transform: uppercase;
        letter-spacing: 5px;
      }

      .card {
        margin: 1rem;
        flex-basis: 45%;
        padding: 1.5rem;
        text-align: left;
        color: inherit;
        text-decoration: none;
        border: 1px solid #eaeaea;
        border-radius: 10px;
        text-align: center;
        transition: all 0.5 ease-in;
      }

      .card:hover,
      .card:focus,
      .card:active {
        filter: blur(5px);
      }

      .card h3 {
        margin: 0 0 1rem 0;
        font-size: 1.5rem;
        line-height:60px;
      }

      .card p {
        margin: 0;
        font-size: 1.25rem;
        line-height: 1.5;
      }

      
      #image{
        text-align: center;
        transition: all 0.5s ease;
      }
      #image:hover{
        
        box-shadow: 10px 10px 10px black;
      }

    `}</style>

    <style jsx global>{`
      @font-face{
        font-family: "SpaceGrotesk-Bold";
        src: url('/SpaceGrotesk-Bold.ttf.ttf')
      }
      html,
      body {
        color: blue;
        padding: 0;
        margin: 0;
        font-family: "SpaceGrotesk-Bold", Helvetica Neue, sans-serif;
        background: blue;
        color: white;
      }

      * {
        box-sizing: border-box;
      }

      body:after{
        content:"";
        border: 50px solid black;
        position: fixed;
        width: 100vw; 
        height: 100vh; 
        overflow-y: scroll;
      }

      #image{
        max-width: 300px;
        margin-top: 30px;
        top: 10px;
        left: 10px;

      }

      @-moz-keyframes spin { 100% { -moz-transform: rotateY(360deg); } }
    @-webkit-keyframes spin { 100% { -webkit-transform: rotateY(360deg); } }
    @keyframes spin { 100% { -webkit-transform: rotateY(360deg); transform:rotateY(360deg); } }


    `}</style>
  </div>)
}

export default Home
