import globals from "./globals.js";
import { Game, SpriteID, State, FPS, ParticleId, ParticleState, Sound, Levels, InsertName, winStoryLines, storyLines } from "./constants.js";
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

    globals.life = 30;
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
    globals.currentLevel = 0;
    globals.actualLevel = Levels.LEVEL1;

    globals.velocityTime = 0;
    globals.stopTime = 0;

    //insert name
    globals.keyPosX = 53;
    globals.keyPosY = 190;
    globals.nameKey = "";
    globals.fil = 0;
    globals.col = 0;
    globals.name = ["", "", ""];
    globals.highScoreData = [];

    globals.nameIndex = 0;             
    globals.maxNameLength = 3;         
    globals.isNameComplete = false;

    globals.blinkCounter = 0;
    globals.blinkSpeed = 20;

    globals.playerBlinking = false;      // Estado de parpadeo
    globals.blinkTimer = 0;               // Temporizador de parpadeo
    globals.blinkDuration = 3;            // 3 segundos de parpadeo
    globals.blinkVisible = true;
    
    globals.cursorX = 90;

    globals.coins = 0;

    globals.winStoryLines = winStoryLines;

    // Estado de animación
    globals.winTextState = {
        charIndex: 0,
        frameCounter: 0,
        speed: 4,
        totalChars: 0
    };

    globals.storyLines = storyLines;

    globals.storyLinesState = {
        charIndex: 0,
        frameCounter: 0,
        speed: 4,
        totalChars: 0
    };

    globals.ghost = {

        isWaiting: true,  // Empieza esperando (escondido)
        waitTimer: 0,      // Cuenta los 10 segundos
        activeTimer: 0   // Cuenta los 5 segundos que está activo
    };

    globals.playerHistory = [];      // Array para guardar posiciones
    globals.historyTime = 10;        // 10 segundos
    globals.ghostSpawnTime = 10; 

    globals.titleScale = 0;

    globals.originalPlayerVelocity = null;
    
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

    let menuMusic = document.querySelector("#menuMusic");
    menuMusic.addEventListener("canplaythrough", loadHandler, false);
    menuMusic.addEventListener("timeupdate", updateMusic, false);
    menuMusic.load();
    globals.sounds.push(menuMusic);
    globals.assetsToLoad.push(menuMusic);

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

    let WalkSound = document.querySelector("#WalkSound");
    WalkSound.addEventListener("canplaythrough", loadHandler, false);
    WalkSound.load();
    globals.sounds.push(WalkSound);
    globals.assetsToLoad.push(WalkSound);

    for(let i = 0; i < 40; i++){
        const num = String(i).padStart(4, '0');
        const img = new Image();  // ✅ Crear nueva imagen para cada archivo
        
        img.addEventListener("load", function(){
            globals.assetsLoaded++;
            globals.loadingImages[i] = img;  // ✅ Guardar en el array
        }, false);
        
        img.src = "./images/loading/Moss daily, Tim Schipper-" + num + ".jpg";
        globals.assetsToLoad.push(img);  // ✅ Añadir al array de assets
    }

    for(let i = 0; i < 8; i++){
        const num = String(i).padStart(4, '0');
        const img = new Image();
        
        img.addEventListener("load", function(){
            globals.assetsLoaded++;
            globals.menuImages[i] = img;  // ✅ Array separado para menú
        }, false);
        
        img.src = "./images/menu/Undertale Fondos De Pantalla-" + num + ".jpg";
        globals.assetsToLoad.push(img);
    }
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

        console.log("Assets finished loading: " + globals.assetsToLoad.length);
        
        if(globals.action.insertCoin){

            globals.gameState = Game.NEW_GAME;
            globals.action.insertCoin = false;
        }

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
    initGhostFollower();
    initPotionVelocity();
    initPotionParalize();
    initPotionInverted();
    initCards();
    //initPoints();
    //initPoints2();
    initDoor();
    initKey();
    initCardPrint();
    initPoints3();
}

function initPlayer(){

    if(globals.currentLevel % 2 === 0){

        //create image set: initFill, initCol, spriteWidth, spriteHeight, offsetX, offsetY, gridSize
        const imageSet = new ImageSet(0, 0, 16, 16, 0, 0, 16);

        //create frames data: 8 frames, animation speed 5 frames/second
        const frames = new Frames(4, 4);

        //physics with vlimit =  40 pixels/seconds
        const physics = new Physics(40);

        //create hitbox object xSize, ySize, xOffset, yOffset
        const hitBox = new HitBox(8, 12, 4, 2);

        //create player sprite
        const player = new Sprite(SpriteID.PLAYER, State.STILL_DOWN, 180, 210, imageSet, frames, physics, hitBox);
    
        //add player to sprites array
        globals.sprites.push(player);

    } else {

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

function initGhostFollower(){

    //create image set: initFill, initCol, spriteWidth, spriteHeight, offsetX, offsetY, sheetWidth
    const imageSet = new ImageSet(11, 0, 16, 16, 0, -1, 16);
    const frames = new Frames(4, 5);
    const physics = new Physics(40);
    const hitBox = new HitBox(10, 10, 3, 3);
    const initTimeToChangeDirection = Math.floor(Math.random() * 3) + 1;

    // Posición inicial fuera de pantalla (escondido)
    const ghost = new Ghost(SpriteID.FOLLOWER, State.RIGHT_2, -100, -100, imageSet, frames, physics, initTimeToChangeDirection, hitBox);
    
    // Variables para el temporizador
    ghost.isWaiting = true;        // Empieza esperando (escondido)
    ghost.waitTimer = 0;           // Cuenta los 10 segundos
    ghost.activeTimer = 0;         // Cuenta los 5 segundos que está activo
    
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

function initPotionInverted(){

    //create image set: initFill, initCol, spriteWidth, spriteHeight, offsetX, offsetY, gridSize
    const imageSet = new ImageSet(19, 0, 16, 16, 0, 0, 16);

    //create frames data: 4 frames, animation speed 5 frames/second
    const frames = new Frames(1, 1);

    //physics with vlimit =  40 pixels/seconds
    const physics = new Physics(0);

    const hitBox = new HitBox(10, 14, 3, 1);

    //create player sprite
    const player = new Sprite(SpriteID.POTION, State.STILL, 330, 15, imageSet, frames, physics, hitBox);
   
    //add player to sprites array
    globals.sprites.push(player);
}

function initPotionParalize(){

    if(globals.currentLevel % 2 === 0){

        //create image set: initFill, initCol, spriteWidth, spriteHeight, offsetX, offsetY, gridSize
        const imageSet = new ImageSet(20, 0, 16, 16, 0, 0, 16);

        //create frames data: 4 frames, animation speed 5 frames/second
        const frames = new Frames(1, 1);

        //physics with vlimit =  40 pixels/seconds
        const physics = new Physics(0);

        const hitBox = new HitBox(10, 14, 3, 1);

        //create player sprite
        const player = new Sprite(SpriteID.POTION_STOP, State.STILL, 330, 352, imageSet, frames, physics, hitBox);
    
        //add player to sprites array
        globals.sprites.push(player);

    }else {
        
        const imageSet = new ImageSet(20, 0, 16, 16, 0, 0, 16);

        const frames = new Frames(1, 1);

        const physics = new Physics(0);

        const hitBox = new HitBox(10, 14, 3, 1);

        const player = new Sprite(SpriteID.POTION_STOP, State.STILL, 330, 280, imageSet, frames, physics, hitBox);
    
        globals.sprites.push(player);
    }
}

function initCards(){

    if(globals.currentLevel % 2 === 0){

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

    }else {

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

    if(globals.currentLevel % 2 === 0){

        const imageSet = new ImageSet(23, 0, 16, 16, 0, -1, 16);
        const frames = new Frames(8, 8);
        const physics = new Physics(0);
        const hitBox = new HitBox(6, 6, 5, 4);
        
        const tileSize = 12; 
        const spriteWidth = 16;    
        const spriteHeight = 16; 

        const offsetX = (tileSize - spriteWidth) / 2;   
        const offsetY = (tileSize - spriteHeight) / 2;

        for(let i = 0; i < level1.length; i++){

            for(let j = 0; j < level1[i].length; j++){
                
                if(level1[i][j] === 12 && i % 2 === 0){
                    
                    if(j % 2 === 0){
                        
                        let xPos = (j * tileSize) + offsetX;
                        let yPos = (i * tileSize) + offsetY;

                        const point = new Sprite(SpriteID.POINTS, State.STILL, xPos, yPos, imageSet, frames, physics, hitBox);
                        
                        globals.sprites.push(point);
                    }
                    
                }

            }

        }

    } else {

        const imageSet = new ImageSet(23, 0, 16, 16, 0, -1, 16);
        const frames = new Frames(8, 8);
        const physics = new Physics(0);
        const hitBox = new HitBox(6, 6, 5, 4);
        
        const tileSize = 12; 
        const spriteWidth = 16;    
        const spriteHeight = 16; 

        const offsetX = (tileSize - spriteWidth) / 2;   
        const offsetY = (tileSize - spriteHeight) / 2;

        for(let i = 0; i < level2.length; i++){

            for(let j = 0; j < level2[i].length; j++){
                
                if(level2[i][j] === 12 && i % 2 === 0){
                    
                    if(j % 2 === 0){
                        
                        let xPos = (j * tileSize) + offsetX;
                        let yPos = (i * tileSize) + offsetY;

                        const point = new Sprite(SpriteID.POINTS, State.STILL, xPos, yPos, imageSet, frames, physics, hitBox);
                        
                        globals.sprites.push(point);
                    }
                    
                }

            }

        }

    }

}

function initDoor(){

    if(globals.currentLevel % 2 === 0){

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

    }else {

        const imageSet = new ImageSet(18, 0, 16, 16, 0, 0, 16);

        const frames = new Frames(1, 1);

        const physics = new Physics(0);

        const hitBox = new HitBox(10, 14, 3, 1);

        const player = new Sprite(SpriteID.DOOR, State.STILL, 300, 100, imageSet, frames, physics, hitBox);
    
        globals.sprites.push(player);
    }
}

function initKey(){

    if(globals.currentLevel % 2 === 0){
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
    
    }else {

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
    
    if(globals.currentLevel % 2 === 0){

        globals.level = new Level(level1, imageSet);
        
    }else if (globals.currentLevel % 2 === 1){
        
        globals.level = new Level(level2, imageSet);
    }
}

function initParticles(){

    initExplosion();
    initFire();
    initLiquid();
}

function initExplosion(){
    
    const numParticles = 50;
    const xInit = globals.sprites[11].xPos;
    const yInit = globals.sprites[11].yPos;
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

    const xInit = Math.random() * 10 + globals.sprites[6].xPos + 3;
    const yInit = globals.sprites[6].yPos + 15;

    const radius = Math.random() + 2;

    const particle = new LiquidParticle(ParticleId.LIQUID, ParticleState.ON, xInit, yInit, radius, alpha, physics);

    const randomAngle = Math.random() * 2 - Math.PI;

    particle.physics.vx = particle.physics.vLimit * Math.cos(randomAngle);
    particle.physics.vy = particle.physics.vLimit * Math.sin(randomAngle);

    globals.particles.push(particle);
}

function loadGameData(){

    console.log("OK");

    const url = "http://localhost:3000/SERVER/routes/getAllClassic.php";
    const request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        
        if(this.readyState == 4){

            if(this.status == 200){

                if(this.responseText != null){

                    const resultJSON = JSON.parse(this.responseText);

                    if (resultJSON && resultJSON.length > 0) {

                        for (let i = 0; i < resultJSON.length; i++) {
                            
                            let item = resultJSON[i];
                            globals.highScoreData.push({
                                name: item.playername,
                                score: item.highscore,
                                level: item.currentlevel
                            });
                        }
                        console.log("Récords cargados: " + globals.highScoreData.length);
                    }

                    //initGame(resultJSON);
                    
                }
                else alert ("Communication error: No data received");
            }
            else alert("Communication error: " + this.statusText);
        }
    }

    request.open('GET', url, true);
    request.responseType = "text";
    request.send();

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
    loadGameData
}