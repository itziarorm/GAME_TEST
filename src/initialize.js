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
import HitBox from "./HitBox.js";

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

    globals.life = 400;
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
    tileSet.src = "./images/sprite3.png";
    globals.tileSets.push(tileSet);
    globals.assetsToLoad.push(tileSet);

    //Load the brick image
    tileSet = new Image();
    tileSet.addEventListener("load", loadHandler, false);
    tileSet.src = "./images/col.png";
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

    const hitBox = new HitBox(8, 12, 4, 2);

    //create player sprite
    const player = new Sprite(SpriteID.PLAYER, State.STILL_DOWN, 105, 175, imageSet, frames, physics, hitBox);
   
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

    const hitBox = new HitBox(10, 14, 3, 1);

    if (direction === State.LEFT) physics.vx = -physics.vLimit;
    else if (direction === State.RIGHT) physics.vx = physics.vLimit;
    else if (direction === State.UP) physics.vy = -physics.vLimit;
    else if (direction === State.DOWN) physics.vy = physics.vLimit;

    return new Sprite(SpriteID.CARD, direction, x, y, imageSet, frames, physics, hitBox);
}

globals.initCardPrint = initCardPrint;

function initGhost(){

    //create image set: initFill, initCol, spriteWidth, spriteHeight, offsetX, offsetY, sheetWidth
    const imageSet = new ImageSet(11, 0, 16, 16, 0, -1, 16);

    //create frames data: 4 frames, animation speed 5 frames/second
    const frames = new Frames(4, 5);

    //physics with vlimit =  40 pixels/seconds
    const physics = new Physics(40); // Max velocity 40 p/s

    const hitBox = new HitBox(10, 10, 3, 3);

    const initTimeToChangeDirection = Math.floor(Math.random() * 3) + 1;

    //create ghost sprite
    const ghost = new Ghost(SpriteID.GHOST, State.RIGHT_2, 100, 80, imageSet, frames, physics, initTimeToChangeDirection, hitBox);
    
    //add ghost to sprites array
    globals.sprites.push(ghost);
}

function initGhostYellow(){

    //create image set: initFill, initCol, spriteWidth, spriteHeight, offsetX, offsetY, sheetWidth
    const imageSet = new ImageSet(10, 0, 16, 16, 0, -1, 16);

    //create frames data: 4 frames, animation speed 5 frames/second
    const frames = new Frames(4, 4);

    //physics with vlimit =  40 pixels/seconds
    const physics = new Physics(30); // Max velocity 40 p/s

    const hitBox = new HitBox(8, 12, 4, 2);

    const initTimeToChangeDirection = Math.floor(Math.random() * 2) + 1;

    //create ghost sprite
    const ghost = new Ghost(SpriteID.YELLOW, State.DOWN_3, 203, 90, imageSet, frames, physics, initTimeToChangeDirection, hitBox);
    
    //add ghost to sprites array
    globals.sprites.push(ghost);
}

function initGhostOrange(){

    //create image set: initFill, initCol, spriteWidth, spriteHeight, offsetX, offsetY, sheetWidth
    const imageSet = new ImageSet(13, 0, 16, 16, 0, -1, 16);

    //create frames data: 4 frames, animation speed 5 frames/second
    const frames = new Frames(4, 5);

    //physics with vlimit =  40 pixels/seconds
    const physics = new FreePhysics(40); // Max velocity 40 p/s

    const hitBox = new HitBox(10, 14, 3, 1);

    const initTimeToChangeDirection = Math.floor(Math.random() * 2) + 1;

    //create ghost sprite
    const ghost = new Ghost(SpriteID.ORANGE, State.RIGHT_4, 20, 160, imageSet, frames, physics, initTimeToChangeDirection, hitBox);
    

    //add ghost to sprites array
    globals.sprites.push(ghost);
}

function initGhostBlue(){

    //create image set: initFill, initCol, spriteWidth, spriteHeight, offsetX, offsetY, sheetWidth
    const imageSet = new ImageSet(14, 0, 16, 16, 0, -1, 16);

    //create frames data: 4 frames, animation speed 5 frames/second
    const frames = new Frames(4, 4);

    //physics with vlimit =  40 pixels/seconds
    const physics = new Physics(60); // Max velocity 40 p/s

    const hitBox = new HitBox(10, 14, 3, 1);

    //create ghost sprite
    const ghost = new GhostBlue(SpriteID.BLUE, State.STILL, 40, 10, imageSet, frames, physics, hitBox);
    
    ghost.physics.vx = ghost.physics.vLimit;
    ghost.physics.vy = ghost.physics.vLimit;

    //add ghost to sprites array
    globals.sprites.push(ghost);
}

function initPotionVelocity(){

    //create image set: initFill, initCol, spriteWidth, spriteHeight, offsetX, offsetY, gridSize
    const imageSet = new ImageSet(21, 0, 16, 16, 0, 0, 16);

    //create frames data: 4 frames, animation speed 5 frames/second
    const frames = new Frames(1, 1);

    //physics with vlimit =  40 pixels/seconds
    const physics = new Physics(80);

    const hitBox = new HitBox(10, 14, 3, 1);

    //create player sprite
    const player = new Sprite(SpriteID.POTION, State.STILL, 5, 5, imageSet, frames, physics, hitBox);
   
    //add player to sprites array
    globals.sprites.push(player);
}

function initPotionParalize(){

    //create image set: initFill, initCol, spriteWidth, spriteHeight, offsetX, offsetY, gridSize
    const imageSet = new ImageSet(19, 0, 16, 16, 0, 0, 16);

    //create frames data: 4 frames, animation speed 5 frames/second
    const frames = new Frames(1, 1);

    //physics with vlimit =  40 pixels/seconds
    const physics = new Physics(0);

    const hitBox = new HitBox(10, 14, 3, 1);

    //create player sprite
    const player = new Sprite(SpriteID.POTION, State.STILL, 203, 5, imageSet, frames, physics, hitBox);
   
    //add player to sprites array
    globals.sprites.push(player);
}

function initPotionInverted(){

    //create image set: initFill, initCol, spriteWidth, spriteHeight, offsetX, offsetY, gridSize
    const imageSet = new ImageSet(20, 0, 16, 16, 0, 0, 16);

    //create frames data: 4 frames, animation speed 5 frames/second
    const frames = new Frames(1, 1);

    //physics with vlimit =  40 pixels/seconds
    const physics = new Physics(0);

    const hitBox = new HitBox(10, 14, 3, 1);

    //create player sprite
    const player = new Sprite(SpriteID.POTION, State.STILL, 203, 220, imageSet, frames, physics, hitBox);
   
    //add player to sprites array
    globals.sprites.push(player);
}

function initCards(){

    //create image set: initFill, initCol, spriteWidth, spriteHeight, offsetX, offsetY, gridSize
    const imageSet = new ImageSet(22, 0, 16, 16, 0, 0, 16);

    //create frames data: 4 frames, animation speed 5 frames/second
    const frames = new Frames(1, 1);

    //physics with vlimit =  40 pixels/seconds
    const physics = new Physics(0);

    const hitBox = new HitBox(10, 14, 3, 1);

    //create player sprite
    const player = new Sprite(SpriteID.CARDS, State.STILL, 5, 220, imageSet, frames, physics, hitBox);
   
    //add player to sprites array
    globals.sprites.push(player);
}

function initPoints(){

    //create image set: initFill, initCol, spriteWidth, spriteHeight, offsetX, offsetY, gridSize
    const imageSet = new ImageSet(23, 0, 16, 16, 0, 0, 16);

    //create frames data: 4 frames, animation speed 5 frames/second
    const frames = new Frames(8, 8);

    //physics with vlimit =  40 pixels/seconds
    const physics = new Physics(0);

    const hitBox = new HitBox(6, 6, 5, 4);

    //create player sprite
    const player = new Sprite(SpriteID.POINTS, State.STILL, 130, 5, imageSet, frames, physics, hitBox);
   
    //add player to sprites array
    globals.sprites.push(player);
}

function initDoor(){

    //create image set: initFill, initCol, spriteWidth, spriteHeight, offsetX, offsetY, gridSize
    const imageSet = new ImageSet(18, 0, 16, 16, 0, 0, 16);

    //create frames data: 4 frames, animation speed 5 frames/second
    const frames = new Frames(1, 1);

    //physics with vlimit =  40 pixels/seconds
    const physics = new Physics(0);

    const hitBox = new HitBox(10, 14, 3, 1);

    //create player sprite
    const player = new Sprite(SpriteID.DOOR, State.STILL, 200, 160, imageSet, frames, physics, hitBox);
   
    //add player to sprites array
    globals.sprites.push(player);
}

function initKey(){

    //create image set: initFill, initCol, spriteWidth, spriteHeight, offsetX, offsetY, gridSize
    const imageSet = new ImageSet(17, 0, 16, 16, 0, 0, 16);

    //create frames data: 4 frames, animation speed 5 frames/second
    const frames = new Frames(12, 5);

    //physics with vlimit =  40 pixels/seconds
    const physics = new Physics(10);

    const hitBox = new HitBox(10, 14, 3, 1);

    //create player sprite
    const player = new Sprite(SpriteID.KEY, State.STILL, 5, 80, imageSet, frames, physics, hitBox);
   
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