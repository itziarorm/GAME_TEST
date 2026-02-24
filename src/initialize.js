import globals from "./globals.js";
import { Game, SpriteID, State, FPS, ParticleId, ParticleState, Sound, Levels } from "./constants.js";
import Sprite from "./Sprite.js";
import ImageSet from "./ImageSet.js";
import Frames from "./Frames.js";
import { Level, level1, level2 } from "./Levels.js";
import Timer from "./Timer.js";
import Physics from "./Physics.js";
import { Ghost } from "./Sprite.js";
import { keydownHandler, keyupHandler, updateMusic } from "./events.js";
import { FreePhysics } from "./Physics.js";
import { GhostBlue } from "./Sprite.js";
import HitBox from "./HitBox.js";
import { ExplosionParticle, FireParticle, LiquidParticle } from "./Particle.js";

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
        insertCoin: false,
        music: false,
        name: false
    }

    globals.score = 0;
    globals.highScore = 0;

    globals.life = 100;
    globals.mana = 0;
    globals.manaFrameY = 14;
    globals.lifeFrameX = 0;
    globals.lifeFrameY = 0;

    globals.arrow = 117;

    //key
    globals.hasKey = false;
    globals.visibleKey = false;
    globals.isDoor = false;

    //card
    globals.hasCard = false;
    globals.canThrow = true;
    globals.card_cooldown = 1.5;

    //SOUND
    globals.currentSound = Sound.NO_SOUND;

    //Level
    globals.currentLevel = Levels.LEVEL1;

    globals.velocityTime = 2;

    //insert name
    globals.keyPosX = 53;
    globals.keyPosY = 190;
    globals.nameKey = "";
    globals.fil = 0;
    globals.col = 0;
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
    tileSet.src = "./images/tileSet.png";
    globals.tileSets.push(tileSet);
    globals.assetsToLoad.push(tileSet);

    //Load Sounds
    let gameMusic = document.querySelector("#gameMusic");
    gameMusic.addEventListener("canplaythrough", loadHandler, false);
    gameMusic.addEventListener("timeupdate", updateMusic, false);
    gameMusic.load();
    globals.sounds.push(gameMusic);
    globals.assetsToLoad.push(gameMusic);

    let jumpSound = document.querySelector("#shootSound");
    jumpSound.addEventListener("canplaythrough", loadHandler, false);
    jumpSound.load();
    globals.sounds.push(shootSound);
    globals.assetsToLoad.push(shootSound);

    let hurtSound = document.querySelector("#hurtSound");
    hurtSound.addEventListener("canplaythrough", loadHandler, false);
    hurtSound.load();
    globals.sounds.push(hurtSound);
    globals.assetsToLoad.push(hurtSound);

    let powerSound = document.querySelector("#powerSound");
    powerSound.addEventListener("canplaythrough", loadHandler, false);
    powerSound.load();
    globals.sounds.push(powerSound);
    globals.assetsToLoad.push(powerSound);
}

function loadHandler(){

    globals.assetsLoaded++;

    if(globals.assetsLoaded === globals.assetsToLoad.length){

        for(let i = 0; i < globals.tileSets.length; ++i){

            globals.tileSets[i].removeEventListener("load", loadHandler, false);
        }
        
        for(let i = 0; i < globals.sounds.length; ++i){

            globals.sounds[i].removeEventListener("canplaythrough", loadHandler, false);
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
    initPoints3();
}

function initPlayer(){

    if(globals.currentLevel === Levels.LEVEL1){

        //create image set: initFill, initCol, spriteWidth, spriteHeight, offsetX, offsetY, gridSize
        const imageSet = new ImageSet(0, 0, 16, 16, 0, 0, 16);

        //create frames data: 8 frames, animation speed 5 frames/second
        const frames = new Frames(4, 4);

        //physics with vlimit =  40 pixels/seconds
        const physics = new Physics(40);

        //create hitbox object xSize, ySize, xOffset, yOffset
        const hitBox = new HitBox(8, 12, 4, 2);

        //create player sprite
        const player = new Sprite(SpriteID.PLAYER, State.STILL_DOWN, 160, 210, imageSet, frames, physics, hitBox);
    
        //add player to sprites array
        globals.sprites.push(player);

    }else if(globals.currentLevel === Levels.LEVEL2){

        const imageSet = new ImageSet(0, 0, 16, 16, 0, 0, 16);

        const frames = new Frames(4, 4);

        const physics = new Physics(40);

        const hitBox = new HitBox(8, 12, 4, 2);

        const player = new Sprite(SpriteID.PLAYER, State.STILL_DOWN, 180, 180, imageSet, frames, physics, hitBox);

        globals.sprites.push(player);
    }
        
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

    if(globals.currentLevel === Levels.LEVEL1){
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

    }else if(globals.currentLevel === Levels.LEVEL2){
        
        const imageSet = new ImageSet(20, 0, 16, 16, 0, 0, 16);

        const frames = new Frames(1, 1);

        const physics = new Physics(0);

        const hitBox = new HitBox(10, 14, 3, 1);

        const player = new Sprite(SpriteID.POTION, State.STILL, 330, 280, imageSet, frames, physics, hitBox);
    
        globals.sprites.push(player);
    }
}

function initCards(){

    if(globals.currentLevel === Levels.LEVEL1){

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

    }else if(globals.currentLevel === Levels.LEVEL2){

        const imageSet = new ImageSet(22, 0, 16, 16, 0, 0, 16);

        const frames = new Frames(1, 1);

        const physics = new Physics(0);

        const hitBox = new HitBox(10, 14, 3, 1);

        //create player sprite
        const player = new Sprite(SpriteID.CARDS, State.STILL, 15, 320, imageSet, frames, physics, hitBox);
    
        //add player to sprites array
        globals.sprites.push(player);
    }
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

function initPoints3(){
    const imageSet = new ImageSet(23, 0, 16, 16, 0, -1, 16);
    const frames = new Frames(8, 8);
    const physics = new Physics(0);
    const hitBox = new HitBox(6, 6, 5, 4);
    
    // Definir posiciones específicas
    const positions = [
        [10, 36],   [95, 30],   [200, 36],
        [10, 60],   [80, 180],  [160, 290],
        [10, 80],   [250, 200], [120, 140],
        [40, 80],   [220, 140], [280, 160],
        [50, 220],  [140, 240], [220, 240],
        [180, 240], [115, 336], [205, 336],
        [280, 308], [160, 320]
    ];
    
    for(let i = 0; i < positions.length; i++){
        
        const point = new Sprite(SpriteID.POINTS, State.STILL, positions[i][0], positions[i][1], imageSet, frames, physics, hitBox);
        
        globals.sprites.push(point);
    }
}

function initDoor(){

    if(globals.currentLevel === Levels.LEVEL1){

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

    }else if(globals.currentLevel === Levels.LEVEL2){

        const imageSet = new ImageSet(18, 0, 16, 16, 0, 0, 16);

        const frames = new Frames(1, 1);

        const physics = new Physics(0);

        const hitBox = new HitBox(10, 14, 3, 1);

        const player = new Sprite(SpriteID.DOOR, State.STILL, 300, 100, imageSet, frames, physics, hitBox);
    
        globals.sprites.push(player);
    }
}

function initKey(){

    if(globals.currentLevel === Levels.LEVEL1){
        //create image set: initFill, initCol, spriteWidth, spriteHeight, offsetX, offsetY, gridSize
        const imageSet = new ImageSet(17, 0, 16, 16, 0, 0, 16);

        //create frames data: 4 frames, animation speed 5 frames/second
        const frames = new Frames(12, 5);

        //physics with vlimit =  40 pixels/seconds
        const physics = new Physics(10);

        const hitBox = new HitBox(10, 14, 3, 1);

        //create player sprite
        const player = new Sprite(SpriteID.KEY, State.STILL_RIGHT, 15, 80, imageSet, frames, physics, hitBox);
    
        //add player to sprites array
        globals.sprites.push(player);
    
    }else if(globals.currentLevel === Levels.LEVEL2){

        const imageSet = new ImageSet(17, 0, 16, 16, 0, 0, 16);

        const frames = new Frames(12, 5);

        const physics = new Physics(10);

        const hitBox = new HitBox(10, 14, 3, 1);

        //create player sprite
        const player = new Sprite(SpriteID.KEY, State.STILL_RIGHT, 15, 280, imageSet, frames, physics, hitBox);
    
        //add player to sprites array
        globals.sprites.push(player);
    }
}

function initLevel(){

    const imageSet = new ImageSet(0, 0, 12, 12, 0, 0, 12);
    

    if(globals.currentLevel === Levels.LEVEL1){

        globals.level = new Level(level1, imageSet);
        
    }else if (globals.currentLevel === Levels.LEVEL2){
        
        globals.level = new Level(level2, imageSet);
    }
}

function initLevel2(){

    const imageSet = new ImageSet(0, 0, 12, 12, 0, 0, 12);
    globals.level = new Level(level2, imageSet);
}

function initParticles(){

    initExplosion();
    initFire();
    initLiquid();
}

function initExplosion(){
    
    const numParticles = 50;
    const xInit = globals.sprites[12].xPos;
    const yInit = globals.sprites[12].yPos;
    const radius = 1;
    const timeToFadeMax = 5;
    const alpha = 1.0;

    for(let i = 0; i < numParticles; ++i){

        const velocity = Math.random() * 5;
        const physics = new Physics(velocity);

        const timeToFade = timeToFadeMax ^ Math.random() + 1;
        const particle = new ExplosionParticle(ParticleId.EXPLOSION, ParticleState.ON, xInit, yInit, radius, alpha, physics, timeToFade);

        const randomAngle = Math.random() * 2 * Math.PI;

        particle.physics.vx = particle.physics.vLimit * Math.cos(randomAngle);
        particle.physics.vy = particle.physics.vLimit * Math.sin(randomAngle);

        globals.particles.push(particle);
    }
}

function initFire(){

    const numParticles = 10;

    for(let i = 0; i < numParticles; ++i){

        createFireParticle();
    }
}

export function createFireParticle(){

    const alpha = 4.0;
    const velocity = Math.random() + 10;
    const physics = new Physics(velocity);

    const xInit = Math.random() * 5 + globals.sprites[0].xPos + 5;
    const yInit = globals.sprites[0].yPos + 15;

    const radius = 3 ^ Math.random() + 2;

    const particle = new FireParticle(ParticleId.FIRE, ParticleState.ON, xInit, yInit, radius, alpha, physics);

    const randomAngle = Math.random() * Math.PI / 3 + 5^Math.PI/2;

    particle.physics.vx = particle.physics.vLimit * Math.cos(randomAngle);
    particle.physics.vy = particle.physics.vLimit * Math.sin(randomAngle);

    globals.particles.push(particle);
}

function initLiquid(){

    const numParticles = 10;

    for(let i = 0; i < numParticles; ++i){

        createLiquidParticle();
    }
}

export function createLiquidParticle(){

    const alpha = 4.0;
    const velocity = Math.random() + 10;
    const physics = new Physics(velocity);

    const xInit = Math.random() * 10 + globals.sprites[5].xPos + 3;
    const yInit = globals.sprites[5].yPos + 15;

    const radius = Math.random() + 2;

    const particle = new LiquidParticle(ParticleId.LIQUID, ParticleState.ON, xInit, yInit, radius, alpha, physics);

    const randomAngle = Math.random() * 2 - Math.PI;

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