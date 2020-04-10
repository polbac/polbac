import Head from 'next/head'

import { useEffect } from 'react'


const Home = () => {
    var ratio = 150 / 830;
    var count = 0;
    var raf;
    const imageURL = 'polbac.png'
    var canvas;
    const imageRatio = 1186/1200;
    
    useEffect(() => {
      const PIXI = require('pixi.js')
      
      const image = document.getElementById("image");

      var width = window.innerWidth > 800 ? 800 : window.innerWidth;
      var height = width * imageRatio;
      var playground = image;
      

      var renderer = PIXI.autoDetectRenderer(width, height, {transparent:true});
      renderer.backgroundColor = 0x0000FF;
      renderer.autoResize = true;
      var tp, preview;
      var displacementSprite,
        displacementFilter,
        stage;

      playground.appendChild(renderer.view);

      stage = new PIXI.Container();

      tp = PIXI.Texture.from(imageURL);
      preview = new PIXI.Sprite(tp);

      var spriteWidth = width * 0.8;
      var spriteHeight = height * 0.8;
      var spX = 800/2 - spriteWidth/2;
      var spY = 600/2 - spriteHeight/2;
      


      preview.width = spriteWidth;
      preview.height = spriteHeight;
      preview.x = spX;
      preview.y = spY;
  
      displacementSprite = PIXI.Sprite.from('noise.png');
      displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

       displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

      displacementSprite.width = spriteWidth;
      displacementSprite.height = spriteHeight;
      displacementSprite.x = spX;
      displacementSprite.y = spY;


      stage.addChild(displacementSprite);

      stage.addChild(preview);

      animate();

      function animate() {
        raf = requestAnimationFrame(animate);
                
        displacementSprite.x = count*10;
        displacementSprite.y = count*10;
    
        count += 0.15;
    
        stage.filters = [displacementFilter];
    
        renderer.render(stage);
    
        canvas = playground.querySelector('canvas');
    }

  })

  

  return (<div className="container">
    <Head>
      <title>polbac</title>
      <link href="https://fonts.googleapis.com/css?family=Press+Start+2P|Prompt&display=swap" rel="stylesheet" />

    </Head>

    <main>
      <h1 className="title">
      p☯lbac
      </h1>

      <p className="description">
        universal javascript developer
      </p>

      <div id="image">

      </div>

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
        color: black;
        border-color: black;
        font-variation-settings: 'wght' 900;
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
        transform: scale(1.05);
      }
    `}</style>

    <style jsx global>{`
      @font-face{
        font-family: "BandeinsSansVariable";
        src: url('/fonts/variable/BandeinsSansVariableGX.ttf')
      }
      html,
      body {
        color: blue;
        padding: 0;
        margin: 0;
        font-family: "BandeinsSansVariable", Helvetica Neue, sans-serif;
        background: blue;
        color: white;
      }

      * {
        box-sizing: border-box;
      }
      canvas{
  width: 100%;
  height: 100%;
}
    `}</style>
  </div>)
}

export default Home
