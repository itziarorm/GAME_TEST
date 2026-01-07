import globals from "./globals.js";
import { Game, SpriteID, State, FPS } from "./constants.js";
import Sprite from "./Sprite.js";
import ImageSet from "./ImageSet.js";
import Frames from "./Frames.js";
import { Level, level1 } from "./Levels.js";
import Timer from "./Timer.js";
import Physics from "./Physics.js";
import { Ghost } from "./Sprite.js";
import { keydownHandler, keyupHandler } from "./events.js";
import { FreePhysics } from "./Physics.js";
import { GhostBlue } from "./Sprite.js";

function initHTMLelements(){

    globals.canvas = document.getElementById('gameScreen');
    globals.ctx = globals.canvas.getContext('2d');

    globals.canvasHUD = document.getElementById('gameHUD');
    globals.ctxHUD = globals.canvasHUD.getContext('2d');

    globals.canvasHUD_RIGHT = document.getElementById('gameHUD_RIGHT');
    globals.ctxHUD_RIGHT = globals.canvasHUD_RIGHT.getContext('2d');

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
        moveDown: false,
        throwCard: false
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
    tileSet.src = "./images/sprite2.png";
    globals.tileSets.push(tileSet);
    globals.assetsToLoad.push(tileSet);

    //Load the brick image
    tileSet = new Image();
    tileSet.addEventListener("load", loadHandler, false);
    tileSet.src = "./images/blocks.png";
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
    initGhost();
    initGhostYellow();
    initGhostOrange();
    initGhostBlue();
    initPotionVelocity();
    initPotionParalize();
    initPotionInverted();
    initCards();
    initPoints();
    initDoor();
    initKey();
    initCardPrint();
}

function initPlayer(){

    //create image set: initFill, initCol, spriteWidth, spriteHeight, offsetX, offsetY, gridSize
    const imageSet = new ImageSet(0, 0, 16, 16, 0, 0, 16);

    //create frames data: 4 frames, animation speed 5 frames/second
    const frames = new Frames(4, 4);

    //physics with vlimit =  40 pixels/seconds
    const physics = new Physics(40);

    //create player sprite
    const player = new Sprite(SpriteID.PLAYER, State.STILL_RIGHT, 100, 155, imageSet, frames, physics);
   
    //add player to sprites array
    globals.sprites.push(player);
}

function initCardPrint(x, y, direction){
    
    //create image set: initFill, initCol, spriteWidth, spriteHeight, offsetX, offsetY, gridSize
    const imageSet = new ImageSet(20, 0, 16, 16, 0, 0, 16);

    //create frames data: 4 frames, animation speed 5 frames/second
    const frames = new Frames(1, 1);

    //physics with vlimit =  40 pixels/seconds
    const physics = new Physics(20);
    
    if (direction === State.LEFT) physics.vx = -physics.vLimit;
    else if (direction === State.RIGHT) physics.vx = physics.vLimit;
    else if (direction === State.UP) physics.vy = -physics.vLimit;
    else if (direction === State.DOWN) physics.vy = physics.vLimit;

    return new Sprite(SpriteID.CARD, direction, x, y, imageSet, frames, physics);
}

function initGhost(){

    //create image set: initFill, initCol, spriteWidth, spriteHeight, offsetX, offsetY, sheetWidth
    const imageSet = new ImageSet(12, 0, 16, 16, 0, 0, 16);

    //create frames data: 4 frames, animation speed 5 frames/second
    const frames = new Frames(2, 5);

    //physics with vlimit =  40 pixels/seconds
    const physics = new Physics(40); // Max velocity 40 p/s

    const initTimeToChangeDirection = Math.floor(Math.random() * 3) + 1;

    //create ghost sprite
    const ghost = new Ghost(SpriteID.GHOST, State.RIGHT_2, 100, 100, imageSet, frames, physics, initTimeToChangeDirection);
    
    //add ghost to sprites array
    globals.sprites.push(ghost);
}

function initGhostYellow(){

    //create image set: initFill, initCol, spriteWidth, spriteHeight, offsetX, offsetY, sheetWidth
    const imageSet = new ImageSet(8, 0, 16, 16, 0, 0, 16);

    //create frames data: 4 frames, animation speed 5 frames/second
    const frames = new Frames(1, 5);

    //physics with vlimit =  40 pixels/seconds
    const physics = new Physics(60); // Max velocity 40 p/s

    const initTimeToChangeDirection = Math.floor(Math.random() * 2) + 1;

    //create ghost sprite
    const ghost = new Ghost(SpriteID.YELLOW, State.DOWN_3, 100, 100, imageSet, frames, physics, initTimeToChangeDirection);
    
    //add ghost to sprites array
    globals.sprites.push(ghost);
}

function initGhostOrange(){

    //create image set: initFill, initCol, spriteWidth, spriteHeight, offsetX, offsetY, sheetWidth
    const imageSet = new ImageSet(9, 0, 16, 16, 0, 0, 16);

    //create frames data: 4 frames, animation speed 5 frames/second
    const frames = new Frames(1, 5);

    const velsX = [30, 40, 0, -40, -30, 0];
    const velsY = [38, -10, 10, -10, 10, -30];
    const velChangeValue = 2;

    //physics with vlimit =  40 pixels/seconds
    const physics = new FreePhysics(40, velsX, velsY, velChangeValue); // Max velocity 40 p/s

    const initTimeToChangeDirection = Math.floor(Math.random() * 2) + 1;

    //create ghost sprite
    const ghost = new GhostBlue(SpriteID.ORANGE, State.RIGHT_4, 10, 100, imageSet, frames, physics);
    
    ghost.physics.vx = ghost.physics.vLimit;
    ghost.physics.vy = ghost.physics.vLimit;

    //add ghost to sprites array
    globals.sprites.push(ghost);
}

function initGhostBlue(){

    //create image set: initFill, initCol, spriteWidth, spriteHeight, offsetX, offsetY, sheetWidth
    const imageSet = new ImageSet(8, 0, 16, 16, 0, 0, 16);

    //create frames data: 4 frames, animation speed 5 frames/second
    const frames = new Frames(1, 8);

    //physics with vlimit =  40 pixels/seconds
    const physics = new Physics(10); // Max velocity 40 p/s

    //create ghost sprite
    const ghost = new GhostBlue(SpriteID.BLUE, State.STILL, 100, 100, imageSet, frames, physics);
    
    ghost.physics.vx = ghost.physics.vLimit;
    ghost.physics.vy = ghost.physics.vLimit;

    //add ghost to sprites array
    globals.sprites.push(ghost);
}

function initPotionVelocity(){

    //create image set: initFill, initCol, spriteWidth, spriteHeight, offsetX, offsetY, gridSize
    const imageSet = new ImageSet(17, 0, 16, 16, 0, 0, 16);

    //create frames data: 4 frames, animation speed 5 frames/second
    const frames = new Frames(1, 1);

    //physics with vlimit =  40 pixels/seconds
    const physics = new Physics(80);

    //create player sprite
    const player = new Sprite(SpriteID.POTION, State.STILL, 10, 10, imageSet, frames, physics);
   
    //add player to sprites array
    globals.sprites.push(player);
}

function initPotionParalize(){

    //create image set: initFill, initCol, spriteWidth, spriteHeight, offsetX, offsetY, gridSize
    const imageSet = new ImageSet(18, 0, 16, 16, 0, 0, 16);

    //create frames data: 4 frames, animation speed 5 frames/second
    const frames = new Frames(1, 1);

    //physics with vlimit =  40 pixels/seconds
    const physics = new Physics(0);

    //create player sprite
    const player = new Sprite(SpriteID.POTION, State.STILL, 200, 10, imageSet, frames, physics);
   
    //add player to sprites array
    globals.sprites.push(player);
}

function initPotionInverted(){

    //create image set: initFill, initCol, spriteWidth, spriteHeight, offsetX, offsetY, gridSize
    const imageSet = new ImageSet(18, 0, 16, 16, 0, 0, 16);

    //create frames data: 4 frames, animation speed 5 frames/second
    const frames = new Frames(1, 1);

    //physics with vlimit =  40 pixels/seconds
    const physics = new Physics(0);

    //create player sprite
    const player = new Sprite(SpriteID.POTION, State.STILL, 200, 220, imageSet, frames, physics);
   
    //add player to sprites array
    globals.sprites.push(player);
}

function initCards(){

    //create image set: initFill, initCol, spriteWidth, spriteHeight, offsetX, offsetY, gridSize
    const imageSet = new ImageSet(20, 0, 16, 16, 0, 0, 16);

    //create frames data: 4 frames, animation speed 5 frames/second
    const frames = new Frames(1, 1);

    //physics with vlimit =  40 pixels/seconds
    const physics = new Physics(0);

    //create player sprite
    const player = new Sprite(SpriteID.CARD, State.STILL, 5, 220, imageSet, frames, physics);
   
    //add player to sprites array
    globals.sprites.push(player);
}

function initPoints(){

    //create image set: initFill, initCol, spriteWidth, spriteHeight, offsetX, offsetY, gridSize
    const imageSet = new ImageSet(21, 0, 16, 16, 0, 0, 16);

    //create frames data: 4 frames, animation speed 5 frames/second
    const frames = new Frames(1, 1);

    //physics with vlimit =  40 pixels/seconds
    const physics = new Physics(0);

    //create player sprite
    const player = new Sprite(SpriteID.POINT, State.STILL, 130, 5, imageSet, frames, physics);
   
    //add player to sprites array
    globals.sprites.push(player);
}

function initDoor(){

    //create image set: initFill, initCol, spriteWidth, spriteHeight, offsetX, offsetY, gridSize
    const imageSet = new ImageSet(16, 0, 16, 16, 0, 0, 16);

    //create frames data: 4 frames, animation speed 5 frames/second
    const frames = new Frames(1, 1);

    //physics with vlimit =  40 pixels/seconds
    const physics = new Physics(0);

    //create player sprite
    const player = new Sprite(SpriteID.DOOR, State.STILL, 200, 170, imageSet, frames, physics);
   
    //add player to sprites array
    globals.sprites.push(player);
}

function initKey(){

    //create image set: initFill, initCol, spriteWidth, spriteHeight, offsetX, offsetY, gridSize
    const imageSet = new ImageSet(15, 0, 16, 16, 0, 0, 16);

    //create frames data: 4 frames, animation speed 5 frames/second
    const frames = new Frames(12, 5);

    //physics with vlimit =  40 pixels/seconds
    const physics = new Physics(10);

    //create player sprite
    const player = new Sprite(SpriteID.KEY, State.STILL, 5, 137, imageSet, frames, physics);
   
    //add player to sprites array
    globals.sprites.push(player);
}

function initLevel(){

    const imageSet = new ImageSet(0, 0, 8, 8, 0, 0, 8);
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