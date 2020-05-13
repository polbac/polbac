import Head from 'next/head'
var moment = require('moment'); // require

import { useEffect, useState, useRef } from 'react'

require('isomorphic-fetch')

let Sketch

if (process.browser) {
  Sketch = require("react-p5")
}

const preload = p5 => {
  myFont = p5.loadFont('Coconat-BoldExt.woff');
}
let myFont;
    let graphic;
let SIZE_WIDTH
let SIZE_HEIGHT = 200;
let GRID_STEPS = 70;
let GRID_SIZE_WIDTH;
let GRID_SIZE_HEIGHT;

const setup = (p5, canvasParentRef) => {
  SIZE_WIDTH = window.innerWidth > 500 ? 500 : window.innerWidth;
  SIZE_HEIGHT = SIZE_WIDTH / 2
   GRID_SIZE_WIDTH = SIZE_WIDTH / GRID_STEPS;
   GRID_SIZE_HEIGHT = SIZE_HEIGHT / GRID_STEPS;
  
  graphic = p5.createGraphics(SIZE_WIDTH, SIZE_HEIGHT);
  graphic.textFont(myFont);
  graphic.textAlign(p5.CENTER);
  graphic.textSize(SIZE_WIDTH > 600 ? 90 : 50);
  graphic.fill('red');
  graphic.text('polbac', SIZE_WIDTH/2, SIZE_HEIGHT/2);

  p5.createCanvas(SIZE_WIDTH, SIZE_HEIGHT).parent(canvasParentRef);
  
};

const draw = p5 => {

  p5.clear()
  const wave = 0.15

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

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function Home() {
    
    const tags = ['react','angular','vue','node','redux','hooks','redux-saga','laravel','typescript','next','nuex','wordpress']
    const [p5Created, setP5Created] = useState(false);
    const [posts, setPosts] = useState([]);
    const [frontendPosition, setFrontendPosition] = useState(0);
    const [tagsPositions, setTagsPositions] = useState(tags.map(tag => ({
      x: Math.random(),
      y: Math.random(),
      angle: Math.random(),
    })));
    let canvasRef = React.createRef();

    useInterval(() => {
      setFrontendPosition(window.scrollY / 10)
      setTagsPositions(tagsPositions.map(position => {
        if (position.y < 0) {
          position.y = 1
          position.x = Math.random()
          position.angle = Math.random()
        } else {
          position.y -= 0.005
          position.angle += 0.001
        }
        return position
      }))
    }, 10)

    
    
    useEffect(async () => {
      const res = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@polbac')
      const data = await res.json()
      setPosts(data.items.filter(item => item.categories.length > 0))
    }, [])

  return (<div className="container">
    <Head>
      <title>polbac</title>

    </Head>

    <main>

      <div className="tags">
        {process.browser && tags.map((tag, index) => <div className='tag' style={{
          top: (tagsPositions[index].y * screen.height).toFixed(2)+'px',
          left:(tagsPositions[index].x * screen.width).toFixed(2)+'px',
          transform: `rotate(${tagsPositions[index].angle * 360}deg)`
        }}>
        {tag}
          </div>
        )}

      </div>

      {Sketch &&<Sketch ref={canvasRef} key="bla" setup={setup} draw={draw} preload={preload} />}
        

      

      <p className="description">
      

        <img style={{top: `${frontendPosition}px`}} className="frontend" id="frontend" src='frontend.png' />
        <img style={{top: `${frontendPosition}px`}} className="frontend" id="frontend-mobile" src='frontend-mobile.png' />

        
      </p>

      <img id="image" src="polbac.png" alt=""/>

      <div className="grid">
        <div className="card">
        
          <h3><a target="_blank" href="polbac-cv.pdf"><img src="icon2.png" alt=""/><br/>
          cv</a></h3>
        </div>

        

        <div  className="card">
        
          <h3><a target="_blank" href="https://github.com/polbac"><img src="icon3.png" alt=""/><br/>github</a></h3>
        </div>

       
        <div  className="card">
        
        <h3><a target="_blank" href="https://www.linkedin.com/in/pablo-gustavo-bacchetta-b780b390/"><img src="icon4.png" alt=""/><br/>linkedin</a></h3>
        </div>


        <div  className="card">
        
        <h3><a target="_blank" href="https://medium.com/@polbac"><img src="icon5.png" alt=""/><br/>medium</a></h3>

        <div>
        {posts && posts.map(post => (
          <article style={{marginBottom: 15}}>
            <a href={post.link} className='mediumlink' >
              <img src={post.thumbnail}></img>
              <div dangerouslySetInnerHTML={{ __html:post.title}} />
              <p style={{fontSize: 11}}>{moment(post.pubDate).fromNow()}</p>
              </a>
            
            <br/>
          </article>
        ))}
      </div>

      </div>


      
       
      </div>

      <div className="contact">
        <a href="mailto:polbac@gmail.com">contact me</a>
      </div>
    </main>


    <style jsx>{`
    .contact:hover{
      box-shadow: 15px 15px 15px black;
      background: black;
    }
.contact{
  box-shadow: 10px 10px 10px black;
  border-radius: 50%;
  background: red;
  position: fixed;
  width: 90px;
  height: 90px;
  line-height: 90px;
  display: block;
  position: fixed;
  right: 15px;
  bottom: 15px;
  color: white;
  text-align: center;
}
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

      .mediumlink{
        display: block;
        max-width: 400px;
        margin-bottom: 30px;
      }

      .mediumlink img{    
          width: 80%;
          display: block;
          margin: auto;
          margin-bottom: 10px;
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
    
        margin-top: 3rem;
        text-transform: uppercase;
        letter-spacing: 5px;
      }

      .card {
        width: 100%;
        display: block;
        padding: 1.5rem;
        text-align: left;
        color: inherit;
        text-decoration: none;
        border-bottom: 1px solid #eaeaea;
        border-radius: 10px;
        text-align: center;
        transition: all 0.5 ease-in;
        margin-bottom: 30px;
      }

      .card a:hover,
      .card a:focus,
      .card a:active {
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
        box-shadow: 10px 10px 10px black;
        position: relative;
    z-index: 99;
      }
      #image:hover{
        
        
      }

    `}</style>

    <style jsx global>{`
      @font-face{
        font-family: "SpaceGrotesk-Bold";
        src: url('/SpaceGrotesk-Bold.ttf.ttf')
      }
      html,
      body {
        overflow-x: hidden;
        background: linear-gradient(270deg, #fff, #fff);
background-size: 400% 400%;

-webkit-animation: AnimationName 9s ease infinite;
-moz-animation: AnimationName 9s ease infinite;
-o-animation: AnimationName 9s ease infinite;
animation: AnimationName 9s ease infinite;

        padding: 0;
        margin: 0;
        font-family: "SpaceGrotesk-Bold", Helvetica Neue, sans-serif;
        color: blue;
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



@keyframes float {
	0% {
		transform: translatey(0px);
	}
	50% {
		transform: translatey(-20px);
	}
	100% {
		transform: translatey(0px);
	}
}

    canvas{
      width: 100%;

    }
    

.frontend{
  max-width: 900px;
  width: 95%;
  display: block;
  margin: auto;
  display: none;
  transform: translatey(0px);
	animation: float 6s ease-in-out infinite;
}

#frontend{
    display: block;
}

@media (max-width: 600px) {
  #frontend{
    display: none;
  }
  #frontend-mobile{
    display: block;
    
  }
}


.tags .tag{
  position: absolute;
  font-size: 20px;
  border: 1px solid blue;
  padding-left: 10px;
  padding-right: 10px;
}

    `}</style>
  </div>)
}
