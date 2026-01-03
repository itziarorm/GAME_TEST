import globals from "./globals.js";
import { Game, SpriteID, State, FPS } from "./constants.js";
import Sprite from "./Sprite.js";
import ImageSet from "./ImageSet.js";
import Frames from "./Frames.js";
import { Level, level1 } from "./Levels.js";
import Timer from "./Timer.js";
import Physics from "./Physics.js";
import { Pirate } from "./Sprite.js";
import { keydownHandler, keyupHandler } from "./events.js";

function initHTMLelements(){

    globals.canvas = document.getElementById('gameScreen');
    globals.ctx = globals.canvas.getContext('2d');

    globals.canvasHUD = document.getElementById('gameHUD');
    globals.ctxHUD = globals.canvasHUD.getContext('2d');

    globals.ctx.imageSmoothingEnabled = false;

    globals.txtPruebas = document.getElementById('txtPruebas');
}

function initVars(){

    globals.previousCycleMilliseconds = 0;
    globals.deltaTime = 0;
    globals.frameTimeObj = 1 / FPS;

    //initialize game countdown time
    globals.gameTime = 0;

    globals.gameState = Game.LOADING;

    //initialize action states
    globals.action = {
        
        moveLeft: false,
        moveRight: false,
        moveUp: false,
        moveDown: false
    }

}

function initEvents(){

    //keyboard events
    window.addEventListener("keydown", keydownHandler, false);
    window.addEventListener("keyup", keyupHandler, false);
}

function loadAssets(){

    let tileSet;

    //Load the spritesheet image
    tileSet = new Image();
    tileSet.addEventListener("load", loadHandler, false);
    tileSet.src = "./images/spritesheet.png";
    globals.tileSets.push(tileSet);
    globals.assetsToLoad.push(tileSet);

    //Load the brick image
    tileSet = new Image();
    tileSet.addEventListener("load", loadHandler, false);
    tileSet.src = "./images/bricks.png";
    globals.tileSets.push(tileSet);
    globals.assetsToLoad.push(tileSet);
}

function loadHandler(){

    globals.assetsLoaded++;

    if(globals.assetsLoaded === globals.assetsToLoad.length){

        for(let i = 0; i < globals.tileSets.length; ++i){

            globals.tileSets[i].removeEventListener("load", loadHandler, false);
        }
        
        console.log("Assets finished loading");

        globals.gameState = Game.PLAYING;

    }
}

function initTimers(){
    
    //create level timer: 200 seconds, change every 0.5 second
    globals.levelTime = new Timer(200, 0.5);
}

function initSprites(){
    
    initPlayer();
    initPirate();
}

function initPlayer(){

    //create image set: initFill, initCol, spriteWidth, spriteHeight, offsetX, offsetY, gridSize
    const imageSet = new ImageSet(0, 0, 44, 57, 10, 6, 64);

    //create frames data: 8 frames, animation speed 5 frames/second
    const frames = new Frames(8, 5);

    //physics with vlimit =  40 pixels/seconds
    const physics = new Physics(40);

    //create player sprite
    const player = new Sprite(SpriteID.PLAYER, State.STILL_RIGHT, 30, 40, imageSet, frames, physics);
   
    //add player to sprites array
    globals.sprites.push(player);
}

function initPirate(){

    //create image set: initFill, initCol, spriteWidth, spriteHeight, offsetX, offsetY, sheetWidth
    const imageSet = new ImageSet(9, 0, 32, 47, 17, 16, 64);
    
    //create frames data: 8 frames, animation speed 5 frames/second
    const frames = new Frames(8, 5);

    //physics with vlimit =  40 pixels/seconds
    const physics = new Physics(40); // Max velocity 40 p/s

    const initTimeToChangeDirection = Math.floor(Math.random() * 3) + 1;

    //create pirate sprite
    const pirate = new Pirate(SpriteID.PIRATE, State.RIGHT_2, 100, 100, imageSet, frames, physics, initTimeToChangeDirection);
    
    //add pirate to sprites array
    globals.sprites.push(pirate);
}

function initLevel(){

    const imageSet = new ImageSet(0, 0, 32, 32, 0, 0, 32);
    globals.level = new Level(level1, imageSet);
}

export {
    initHTMLelements,
    initVars,
    loadAssets,
    initSprites,
    initLevel,
    initTimers,
    initEvents
}