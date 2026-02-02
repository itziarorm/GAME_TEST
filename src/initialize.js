import globals from "./globals.js";
import { Game, SpriteID, State, FPS, ParticleId, ParticleState } from "./constants.js";
import Sprite from "./Sprite.js";
import ImageSet from "./ImageSet.js";
import Frames from "./Frames.js";
import { Level, level1 } from "./Levels.js";
import Timer from "./Timer.js";
import Physics from "./Physics.js";
import { Ghost } from "./Sprite.js";
import { keydownHandler, keySelect, keyupHandler } from "./events.js";
import { FreePhysics } from "./Physics.js";
import { GhostBlue } from "./Sprite.js";
import HitBox from "./HitBox.js";
import { FireParticle } from "./Particle.js";

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
        throwCard: false,
        confirm: false,
        insertCoin: false
    }

    globals.score = 0;
    globals.highScore = 0;

    globals.life = 120;
    globals.mana = 0;
    globals.manaFrameY = 14;
    globals.lifeFrameX = 0;
    globals.lifeFrameY = 0;

    globals.arrow = 117;
}

function initEvents(){

    //keyboard events
    window.addEventListener("keydown", keydownHandler, false);
    window.addEventListener("keyup", keyupHandler, false);
    window.addEventListener("keySelect", keySelect, false);
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
    tileSet.src = "./images/tileSet.png";
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

        globals.gameState = Game.NEW_GAME;

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
    initPoints2();
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
    const player = new Sprite(SpriteID.PLAYER, State.STILL_DOWN, 160, 210, imageSet, frames, physics, hitBox);
   
    //add player to sprites array
    globals.sprites.push(player);
}

function initCardPrint(x, y, direction){
    
    //create image set: initFill, initCol, spriteWidth, spriteHeight, offsetX, offsetY, gridSize
    const imageSet = new ImageSet(20, 0, 8, 8, 0, 0, 16);

    //create frames data: 4 frames, animation speed 5 frames/second
    const frames = new Frames(1, 1);

    //physics with vlimit =  40 pixels/seconds
    const physics = new Physics(50);

    const hitBox = new HitBox(8, 8, 0, 0);

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
    const ghost = new Ghost(SpriteID.YELLOW, State.DOWN_3, 325, 210, imageSet, frames, physics, initTimeToChangeDirection, hitBox);
    
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
    const ghost = new Ghost(SpriteID.ORANGE, State.RIGHT_4, 100, 290, imageSet, frames, physics, initTimeToChangeDirection, hitBox);
    

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
    const player = new Sprite(SpriteID.POTION_VELOCITY, State.STILL, 15, 15, imageSet, frames, physics, hitBox);
   
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
    const player = new Sprite(SpriteID.POTION_STOP, State.STILL, 330, 15, imageSet, frames, physics, hitBox);
   
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
    const player = new Sprite(SpriteID.POTION, State.STILL, 330, 352, imageSet, frames, physics, hitBox);
   
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
    const player = new Sprite(SpriteID.CARDS, State.STILL, 15, 352, imageSet, frames, physics, hitBox);
   
    //add player to sprites array
    globals.sprites.push(player);
}

function initPoints(){

    //create image set: initFill, initCol, spriteWidth, spriteHeight, offsetX, offsetY, gridSize
    const imageSet = new ImageSet(23, 0, 16, 16, 0, -1, 16);

    //create frames data: 4 frames, animation speed 5 frames/second
    const frames = new Frames(8, 8);

    //physics with vlimit =  40 pixels/seconds
    const physics = new Physics(0);

    const hitBox = new HitBox(6, 6, 5, 4);

    //create player sprite
    const player = new Sprite(SpriteID.POINTS, State.STILL, 160, 28, imageSet, frames, physics, hitBox);
   
    //add player to sprites array
    globals.sprites.push(player);
}

function initPoints2(){

    //create image set: initFill, initCol, spriteWidth, spriteHeight, offsetX, offsetY, gridSize
    const imageSet = new ImageSet(23, 0, 16, 16, 0, -1, 16);

    //create frames data: 4 frames, animation speed 5 frames/second
    const frames = new Frames(8, 8);

    //physics with vlimit =  40 pixels/seconds
    const physics = new Physics(0);

    const hitBox = new HitBox(6, 6, 5, 4);

    //create player sprite
    const player = new Sprite(SpriteID.POINTS, State.STILL, 140, 92, imageSet, frames, physics, hitBox);
   
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
    const player = new Sprite(SpriteID.DOOR, State.STILL, 300, 260, imageSet, frames, physics, hitBox);
   
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
    const player = new Sprite(SpriteID.KEY, State.STILL, 15, 80, imageSet, frames, physics, hitBox);
   
    //add player to sprites array
    globals.sprites.push(player);
}

function initLevel(){

    const imageSet = new ImageSet(0, 0, 12, 12, 0, 0, 12);
    globals.level = new Level(level1, imageSet);
}

function initParticles(){

    initFire();
}

function initFire(){

    const numParticles = 100;

    for(let i = 0; i < numParticles; ++i){

        createFireParticle();
    }
}

export function createFireParticle(){

    const alpha = 4.0;
    const velocity = Math.random() + 20 + 10;
    const physics = new Physics(velocity);

    const xInit = Math.random() * 10 + 30;
    const yInit = 220;

    const radius = 3 ^ Math.random() + 2;

    const particle = new FireParticle(ParticleId.FIRE, ParticleState.ON, xInit, yInit, radius, alpha, physics);

    const randomAngle = Math.random() * Math.PI / 3 + 5^Math.PI/2;

    particle.physics.vx = particle.physics.vLimit * Math.cos(randomAngle);
    particle.physics.vy = particle.physics.vLimit * Math.sin(randomAngle);

    globals.particles.push(particle);
}

export {
    initHTMLelements,
    initVars,
    loadAssets,
    initSprites,
    initLevel,
    initTimers,
    initEvents,
    initParticles,
}