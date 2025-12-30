"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

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
let SIZE_HEIGHT = 20;
let GRID_STEPS = 50;
let GRID_SIZE_WIDTH;
let GRID_SIZE_HEIGHT;

const setup = (p5, canvasParentRef) => {
    SIZE_WIDTH = 250;
    SIZE_HEIGHT = SIZE_WIDTH / 2
    GRID_SIZE_WIDTH = SIZE_WIDTH / GRID_STEPS;
    GRID_SIZE_HEIGHT = SIZE_HEIGHT / GRID_STEPS;

    graphic = p5.createGraphics(SIZE_WIDTH, SIZE_HEIGHT);
    graphic.textFont(myFont);
    graphic.textAlign(p5.CENTER);
    graphic.textSize(40);
    graphic.fill('#000000');
    graphic.text('polbac', 140, 75);

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
                GRID_SIZE_WIDTH,
                GRID_SIZE_HEIGHT
            )
        }
    }

};


export default function Header() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    let canvasRef = useRef(null);
    return (
        <header>
            <nav>
                <h1>{mounted && Sketch && <Sketch ref={canvasRef} key="logo" setup={setup} draw={draw} preload={preload} />}</h1>
                <ul>
                    <li><Link href="/">Work</Link></li>
                    <li><Link href="/music">Music</Link></li>


                </ul>
            </nav>
        </header>
    )
}   