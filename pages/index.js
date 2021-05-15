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
let SIZE_HEIGHT = 50;
let GRID_STEPS = 70;
let GRID_SIZE_WIDTH;
let GRID_SIZE_HEIGHT;

const setup = (p5, canvasParentRef) => {
  SIZE_WIDTH = window.innerWidth > 500 ? 300 : window.innerWidth;
  SIZE_HEIGHT = SIZE_WIDTH / 2
   GRID_SIZE_WIDTH = SIZE_WIDTH / GRID_STEPS;
   GRID_SIZE_HEIGHT = SIZE_HEIGHT / GRID_STEPS;
  
  graphic = p5.createGraphics(SIZE_WIDTH, SIZE_HEIGHT);
  graphic.textFont(myFont);
  graphic.textAlign(p5.CENTER);
  graphic.textSize(SIZE_WIDTH > 600 ? 90 : 50);
  graphic.fill('#65e590');
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
    
    const tags = ['react','angular','vue','node', 'styled-components', 'redux','hooks','redux-saga','typescript','next','vuex','wordpress', 'nuxt', 'vercel', 'react-native', 'ecommerce', 'threejs', 'pixijs', 'd3']
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
      <title>polbac / INDEPENDENT DEVELOPER, TEACHER & CONSULTER</title>

      <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap" rel="stylesheet" />

    </Head>

    <main>

      <div className="tags">
        {process.browser && tags.map((tag, index) => <div className='tag' style={{
          transform: `rotate(${tagsPositions[index].angle * 360}deg) translate(${(tagsPositions[index].y * screen.height).toFixed(2)+'px'}, ${(tagsPositions[index].x * screen.width).toFixed(2)+'px'})`
        }}>
        {tag}
          </div>
        )}

      </div>

      {Sketch &&<Sketch ref={canvasRef} key="bla" setup={setup} draw={draw} preload={preload} />}
        

      
      <h3 className='title'>INDEPENDENT DEVELOPER, TEACHER & CONSULTER.</h3>
      <p className="description">
      
      Oriented on visual projects for the web & mobile.<br/><br/>
      Loving <svg height="20" width="20" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	 viewBox="0 0 512 512" >
<path fill="blue" d="M256,482.164c-3.526,0-7.052-1.238-9.88-3.713l-0.655-0.574
	c-21.813-19.085-42.302-36.544-62.115-53.429c-53.171-45.309-99.088-84.437-131.005-122.397C16.633,259.578,0,219.954,0,177.351
	c0-39.138,13.267-75.746,37.355-103.08C62.609,45.616,97.642,29.836,136,29.836c53.948,0,88.103,32.22,107.255,59.25
	c4.97,7.014,9.196,14.047,12.745,20.665c3.549-6.618,7.776-13.651,12.745-20.665c19.152-27.029,53.307-59.25,107.255-59.25
	c38.358,0,73.391,15.781,98.644,44.435C498.733,101.605,512,138.213,512,177.351c0,42.603-16.633,82.228-52.345,124.7
	c-31.917,37.96-77.834,77.088-131.002,122.395c-19.816,16.887-40.305,34.346-62.118,53.431l-0.655,0.574
	C263.052,480.927,259.526,482.164,256,482.164z M136,59.836c-29.621,0-56.66,12.171-76.138,34.271
	C40.605,115.957,30,145.521,30,177.351c0,77.007,68.745,135.588,172.804,224.261c17.083,14.557,34.662,29.537,53.196,45.648
	c18.535-16.112,36.113-31.091,53.193-45.646C413.255,312.939,482,254.358,482,177.351c0-31.83-10.605-61.394-29.863-83.245
	C432.66,72.007,405.621,59.836,376,59.836c-41.129,0-67.716,25.338-82.776,46.594c-13.509,19.065-20.558,38.282-22.962,45.66
	c-2.011,6.175-7.768,10.354-14.262,10.354s-12.251-4.179-14.262-10.354c-2.404-7.377-9.453-26.595-22.962-45.659
	C203.716,85.174,177.129,59.836,136,59.836z"/>

</svg> Experimental UIs, performance, SSR & SSG, test build & deploy.<br/><br/>
      Lets get in touch via <a href='mailto:polbac@gmail.com'>email</a>, <a href='https://www.linkedin.com/in/polbac/'>linkedin</a> or <a href='https://www.instagram.com/polbac_______/'>instagram</a>.

        
      </p>

      <h3 className='title white'>some projects.</h3>

      




      <a className="project" href="https://www.hicetnunc.xyz/objkt/65374    " target="_blank">
        <div className="project-left">CARCOSA [nft]</div>
        <div className="project-center">www.hicetnunc.xyz/objkt/65374</div>
        <div className="project-right"><img height="50" src="car.png" /></div>
        <img />
      </a>
      
      <a className="project" href="https://kestius.com/" target="_blank">
        <div className="project-left">KESTIUS</div>
        <div className="project-center">kestius.com</div>
        <div className="project-right"><img height="50" src="k.png" /></div>
        <img />
      </a>

      <a className="project" href="http://lecube.tv/" target="_blank">
        <div className="project-left">LECUBE</div>
        <div className="project-center">lecube.tv</div>
        <div className="project-right"><img height="50" src="l.png" /></div>
        <img />
      </a>

      <a className="project" href="https://www.nanasch.com.ar/" target="_blank">
        <div className="project-left">NANA SCHLEZ</div>
        <div className="project-center">nanasch.com.ar</div>
        <div className="project-right"><img height="50" src="n.png" /></div>
        <img />
      </a>

      

      <a className="project" href="http://www.matiasduville.com/" target="_blank">
        <div className="project-left">MATIAS DUVILLE</div>
        <div className="project-center">matiasduville.com</div>
        <div className="project-right"><img height="50" src="d.png" /></div>
        <img />
      </a>

      

      

      <a className="project " href="http://bandidoguapo.tv/" target="_blank">
        <div className="project-left">BANDIDO GUAPO</div>
        <div className="project-center">bandidoguapo.tv</div>
        <div className="project-right"><img height="50" src="b.png" /></div>
        <img />
      </a>

      <a className="project " href="https://www.almatrends.net/" target="_blank">
        <div className="project-left">ALMA TRENDS</div>
        <div className="project-center">almatrends.net</div>
        <div className="project-right"><img height="50" src="a.png" /></div>
        <img />
      </a>

      <a className="project " href="https://www.atlantico.tv/" target="_blank">
        <div className="project-left">ATLANTICO</div>
        <div className="project-center">atlantico.tv</div>
        <div className="project-right"><img height="50" src="at.png" /></div>
        <img />
      </a>

      

      <a className="project last" href="http://www.hernansalamanco.com/" target="_blank">
        <div className="project-left">HERNÁN SALAMANCO</div>
        <div className="project-center">hernansalamanco.com</div>
        <div className="project-right"><img height="50" src="h.png" /></div>
        <img />
      </a>
      <div className='line-container'>
      ◖ᵔᴥᵔ◗


      </div>
      <h3 className='title white'>some technologies.</h3>
      <br/>
      <br/>

      <div className="item">
        <h3>FRONT-END</h3>
        <p>react, angular, vue, svelte, redux, styled-components, apollo, typescript</p>
      </div>

      <div className="item">
        <h3>MOBILE</h3>
        <p>react-native, detox</p>
      </div>

      <div className="item">
        <h3>CMS</h3>
        <p>prismic, wordpress, expression engine</p>
      </div>

      <div className="item">
        <h3>EXPERIMENTAL</h3>
        <p>threejs, pixijs</p>
      </div>

      <div className="item">
        <h3>E-COMMERCE</h3>
        <p>woocommerce, stripe</p>
      </div>

      <div className="item">
        <h3>BACKEND</h3>
        <p>nodejs, express, strapi, typeorm</p>
      </div>

      <div className="item">
        <h3>INFRASTRUCTURE</h3>
        <p>vercel, heroku   </p>
      </div>

      <div className='line-container'>
      (◠﹏◠) 

      </div>

      <h3 className='title white'>lets grow.</h3>
      <br/>
      <br/>

      <div className="item">
        <p>A/B test, collect data, segmentation, attribution</p>
      </div>

      <div className='line-container'>
      (๑•́ ₃ •̀๑) 


      </div>

      <h3 className='title white'>some posts.</h3>
      <br/>
      <br/>
        
        {posts && posts.map(post => (
          <a className="project post" href={post.link} target="_blank">
          <div className="project-left" dangerouslySetInnerHTML={{ __html:post.title}}></div>
          <div className="project-center">{moment(post.pubDate).fromNow()}</div>
          <div className="project-right"><img height="50" src={post.thumbnail} /></div>
        </a>
        ))}
      
<br/>
<br/>
<div className='line-container'>
(ᵔᴥᵔ)
      </div>



      <img width="200" id="image" src="polbac.jpeg" alt=""/>
      <br/>
      <br/>
      <br/>
<br/>

      
       

      
    </main>


    <style jsx>{`

    .line-container{
       margin-top: 50px;

    }

    #image:hover{
      filter: hue-rotate(0) contrast(100)
    }
    #image{
      transition: 1s all;
      filter: hue-rotate(-167deg) contrast(21);
    }

    .item{
      margin: auto;
      text-align: center;
      max-width: 900px;
      width: 100%;
      color: #383cef;
      font-size: 1.5rem;
      margin-bottom: 50px;
    }

    .item h3{
      padding: 0;
      margin: 0;
      color: blue;
    }

    .item p{
      padding: 0;
      margin: 0;
      color: white;
    }

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
  z-index: 999999;
  bottom: 15px;
  color: white;
  text-align: center;
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
        
      }

      .mediumlink{
        display: block;
        max-width: 400px;
        margin-bottom: 30px;
      }
      .project img{
        filter: grayscale(100%);
      }

      .project:hover img{
        filter: grayscale(0%);
      }

      .project:hover{
        color: #65e590;
        
      }
      .project{
        display: flex;
        justify-content: space-between;
        color: #fff;
        margin: auto;
        width: 100%;
        max-width: 900px;
        font-size: 1.5rem;
        border-bottom: 1px solid blue;
        padding-bottom: 15px;
        padding-top: 15px;
        text-align: left;
      }
      .project.last{
        border: 0;
      }
      .project div{
        flex: 2;
      }

      .project.post .project-left{
        flex: 3;
      }
      .project.post .project-center,
      .project.post .project-right{
        flex: 1;
      }

      .project .project-right{
        text-align: right;
flex: 1;
      }
      .project-title{
        color: white;
        font-size: 3em;
        text-align: left;
      }

      .mediumlink img{    
          width: 80%;
          display: block;
          margin: auto;
          margin-bottom: 10px;
      }

      main {
        padding: 10px;
        margin: auto;
        
        text-align: center;
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
      .title.white{
        margin-top: 45px;
        color: blue;
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
        line-height: 2.5rem;
        font-size: 2rem;
        text-align: center;
        color: #fff;
        margin-bottom: 20px;
        margin-top: 0px;
      }


      .description{
        width: 100%;
        max-width: 1200px;
        margin: auto;
        font-size: 2rem;
      }
      .title{
        font-size: 5rem;
        line-height: 4.5rem;
      }
      .description {
        font-size: 2rem;
        line-height: 1.5rem;
        margin-top: 70px;
        margin-bottom: 100px;
        text-align: left;
        color: #383cef;
        text-align: center;
      }
      .description a{
        text-decoration: underline;
      }
      .description a:hover{
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
      h3{
        font-family: "Dela Gothic One";
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
        border-radius: 50%;
        
    z-index: 99;
      }
      #image:hover{
        
        
      }

    `}</style>

    <style jsx global>{`
      
      html,
      body {
        overflow-x: hidden;
        background: black;
background-size: 400% 400%;

-webkit-animation: AnimationName 9s ease infinite;
-moz-animation: AnimationName 9s ease infinite;
-o-animation: AnimationName 9s ease infinite;
animation: AnimationName 9s ease infinite;

        padding: 0;
        margin: 0;
        font-family: Helvetica Neue, sans-serif;
        color: blue;
      }

      * {
        box-sizing: border-box;
      }

      body:after{
        content:"";
        border: 50px solid white;
        position: fixed;
        width: 100vw; 
        height: 100vh; 
        overflow-y: scroll;
      }

      #image{
        max-width: 300px;
        margin-top: 30px;
        

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
  main{
    margin-left: 10px;
    margin-right: 10px;
  }
  .project img{
    display: none !important;
  }
  .project{
    display: block !important;
  }
  #frontend{
    display: none;
  }
  #frontend-mobile{
    display: block;
    
  }
  .title{
    font-size: 2rem !important;
    line-height: 2.5rem  !important;
  }
  .description{
    font-size: 2rem !important;
    line-height: 1.9rem  !important;
  }
}


.tags .tag{
  position: absolute;
  font-size: 20px;
  border: 1px solid #65e590;
  padding-left: 10px;
  padding-right: 10px;
  color: #65e590;
}

    `}</style>

    
  </div>)
}
