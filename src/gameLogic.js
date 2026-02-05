import globals from "./globals.js";
import { Game, State, SpriteID, ParticleState, ParticleId, Sound } from "./constants.js";
import { Collision } from "./constants.js";
import detectCollisions from "./collisions.js";
import { updateEvents, eventVelocity } from "./events.js";
import { createFireParticle } from "./initialize.js";

export default function update(){

    switch(globals.gameState){

        case Game.LOADING:
            
            console.log("Loading assets...");
            
            break;
        case Game.PLAYING:
            
            playGame();
            
            break;

        case Game.NEW_GAME:

            newGame();

            break;

        case Game.CONTROLS:

            controls();

            break;
        
        case Game.STORY:

            story();

            break;

        case Game.GAME_OVER:

            gameOver();

            break;

        default:
            console.error("ERROR: Game State invalid");
    }
}

function newGame(){

    if (globals.action.moveUp) {

        globals.action.moveUp = false; 

        globals.arrow = 117;
        
    }

    if (globals.action.moveDown) {
        
        globals.action.moveDown = false;

        if (globals.arrow >= 177) {
            globals.arrow = 117; 
        } else{
            globals.arrow += 20;
        }
    
    }

    if (globals.action.moveRight) {

        
        if (globals.arrow === 117) {
            
            console.log("Mostrando NEW GAME");

            // "NEW GAME" 
            globals.gameState = Game.PLAYING;

        } else if (globals.arrow === 137) {

            // "HIGH SCORE"
            console.log("Mostrando STORY");
            globals.gameState = Game.STORY;

        }else if (globals.arrow === 157) {

            console.log("Mostrando CONTROLS");
            globals.gameState = Game.CONTROLS;

        }   else if (globals.arrow === 177) {

            console.log("Mostrando HIGH SCORE");
            globals.gameState = Game.GAME_OVER;

        }

        globals.action.moveRight = false;
    }

}

function playGame(){

    //completar

    updateSprites();

    detectCollisions();

    updateEvents();

    updateGameTime();

    updateParticles();
    
    updateLevelTime();

    playSound();
    
    isGameOver();
}

function updateGameTime(){

    //update game time
    globals.gameTime += globals.deltaTime;
}

function updateLevelTime(){

    //update counter of value change
    globals.levelTime.timeChangeCounter += globals.deltaTime;
    
    //check if it's time to change value
    if(globals.levelTime.timeChangeCounter > globals.levelTime.timeChangeValue){
        
        globals.levelTime.value --;

        //reset counter
        globals.levelTime.timeChangeCounter = 0;

    }
}

function updateSprite(sprite){

    const type = sprite.id;
    switch(type){

        case SpriteID.PLAYER:

            updatePlayer(sprite);
            
            break;
        
        case SpriteID.GHOST:

            updateGhost(sprite);

            updateLife(sprite);
            updateHUDLifePoints();

            updateScore(sprite);

            if(sprite.isCollidingWithCard){
                const index = globals.sprites.indexOf(sprite);

                if (index !== -1) {
                    
                    globals.sprites.splice(index, 1);
                }
            }

            break;

        case SpriteID.YELLOW:

            updateGhostYellow(sprite);

            updateLife(sprite);
            updateHUDLifePoints();

            updateScore(sprite);

            if(sprite.isCollidingWithCard){
                const index = globals.sprites.indexOf(sprite);

                if (index !== -1) {
                    
                    globals.sprites.splice(index, 1);
                }
            }

            break;

        case SpriteID.ORANGE:

            updateGhostOrange(sprite);

            updateLife(sprite);
            updateHUDLifePoints();

            updateScore(sprite);

            if(sprite.isCollidingWithCard){
                const index = globals.sprites.indexOf(sprite);

                if (index !== -1) {
                    
                    globals.sprites.splice(index, 1);
                }
            }

            break;

        case SpriteID.BLUE:

            updateGhostBlue(sprite);

            updateLife(sprite);
            updateHUDLifePoints();

            updateScore(sprite);

            if(sprite.isCollidingWithCard){
                const index = globals.sprites.indexOf(sprite);

                if (index !== -1) {
                    
                    globals.sprites.splice(index, 1);
                }
            }

            break;

        case SpriteID.KEY:
            
            if (globals.visibleKey){

                sprite.state = State.STILL;

                updateKey(sprite);

                if(sprite.isCollidingWithPlayer){
                    
                    globals.hasKey = true;
                    globals.score += 500;
                    const index = globals.sprites.indexOf(sprite);

                    if (index !== -1) {
                        
                        globals.sprites.splice(index, 1);
                    }
                }
            }
            break;

        case SpriteID.CARDS:

            updateCard(sprite);

            if(sprite.isCollidingWithPlayer){
                
                globals.currentSound = Sound.POWER_UP;

                globals.score += 50;
                const index = globals.sprites.indexOf(sprite);

                if (index !== -1) {
                    
                    globals.sprites.splice(index, 1);
                }
            }

            break;

        case SpriteID.CARD:

            updateCard(sprite);

            if(sprite.isCollidingWithPlayer){
                
                
                globals.score += 100;
                const index = globals.sprites.indexOf(sprite);

                if (index !== -1) {
                    
                    globals.sprites.splice(index, 1);
                }

            }

            break;

        case SpriteID.POTION:

            if(sprite.isCollidingWithPlayer){

                globals.currentSound = Sound.POWER_UP;
                globals.score += 50;

                const index = globals.sprites.indexOf(sprite);

                if (index !== -1) {
                    
                    globals.sprites.splice(index, 1);
                }
                
            }

            break;
        
        case SpriteID.POTION_VELOCITY:

            if(sprite.isCollidingWithPlayer){

                globals.currentSound = Sound.POWER_UP;
                globals.score += 50;

                const index = globals.sprites.indexOf(sprite);

                if (index !== -1) {
                    
                    globals.sprites.splice(index, 1);
                }

                eventVelocity(sprite);
                
            }

            break;

        case SpriteID.POTION_STOP:

            if(sprite.isCollidingWithPlayer){

                globals.currentSound = Sound.POWER_UP;
                globals.score += 50;

                const index = globals.sprites.indexOf(sprite);

                if (index !== -1) {
                    
                    globals.sprites.splice(index, 1);
                }
                
            }

            break;

        case SpriteID.DOOR:

            if(sprite.isCollidingWithPlayer){

                if (globals.hasKey){
                    globals.isDoor = true;
                    globals.score += 2000;
                    const index = globals.sprites.indexOf(sprite);

                if (index !== -1) {

                    globals.sprites.splice(index, 1);
                }
                }
                
            }

            break;

        case SpriteID.POINTS:

            updateMana(sprite);
            updateHUDMana();

            if(sprite.isCollidingWithPlayer){

                globals.score += 20;
                const index = globals.sprites.indexOf(sprite);

                if (index !== -1) {

                    globals.sprites.splice(index, 1);
                }
            }

        default:
            break;
    }
}

function updatePlayer(sprite){

    //read keyboard and assign state
    readKeyboardAndAssignState(sprite);

    if (globals.card_cooldown > 0) {
        globals.card_cooldown -= globals.deltaTime;
        if (globals.card_cooldown <= 0) {
            globals.canThrow = true;
        }
    }

    if (globals.action.throwCard && globals.canThrow){

        createCard(sprite);
        globals.currentSound = Sound.SHOOT;

        globals.canThrow = false;
        
        globals.card_cooldown = 1.5;
        
    }
    
    switch(sprite.state){

        case State.UP:

            sprite.physics.vx = 0;
            sprite.physics.vy = -sprite.physics.vLimit;
            break;
        
        case State.DOWN:
            
            sprite.physics.vx = 0;
            sprite.physics.vy = sprite.physics.vLimit;
            break;
        
        case State.RIGHT:

            sprite.physics.vx = sprite.physics.vLimit;
            sprite.physics.vy = 0;
            break;

        case State.LEFT:

            sprite.physics.vx = -sprite.physics.vLimit;
            sprite.physics.vy = 0;
            break;        
        
        default:
            sprite.physics.vx = 0;
            sprite.physics.vy = 0;
    }

    //calculate distance moved
    sprite.xPos += sprite.physics.vx * globals.deltaTime;
    sprite.yPos += sprite.physics.vy * globals.deltaTime;

    //update animation frame
    updateAnimationFrame(sprite);
}

function createCard(sprite){
    
   let direction = State.RIGHT;
    let x = sprite.xPos + 4;
    let y = sprite.yPos + 4;

    if (sprite.state === State.LEFT || sprite.state === State.STILL_LEFT) {
        direction = State.LEFT;
        x = sprite.xPos - 8;

    } else if (sprite.state === State.RIGHT || sprite.state === State.STILL_RIGHT) {
        direction = State.RIGHT;
        x = sprite.xPos + 16;

    } else if (sprite.state === State.UP || sprite.state === State.STILL_UP) {
        direction = State.UP;
        y = sprite.yPos - 8;

    } else if (sprite.state === State.DOWN || sprite.state === State.STILL_DOWN) {
        direction = State.DOWN;
        y = sprite.yPos + 16;
    }

    //Usar la función global
    const card = globals.initCardPrint(x, y, direction);

    globals.sprites.push(card);

}

function updateCard(sprite){

    // Update card position
    sprite.xPos += sprite.physics.vx * globals.deltaTime;
    sprite.yPos += sprite.physics.vy * globals.deltaTime;

    // Update animation frame
    updateAnimationFrame(sprite);
}

function updateGhost(sprite){

    switch(sprite.state){

        case State.RIGHT_2:
            sprite.physics.vx = sprite.physics.vLimit;
            break;
        case State.LEFT_2:
            sprite.physics.vx = -sprite.physics.vLimit;
            break;
        default:
            console.error("ERROR: Pirate state invalid");
    }

    //calculate distance moved
    sprite.xPos += sprite.physics.vx * globals.deltaTime;

    //update animation frame
    updateAnimationFrame(sprite);

    //update direction randomly
    updateDirectionRandom(sprite);

    const isCollision = calculateCollisionWithBorders(sprite);

    if(isCollision){

        swapDirection(sprite);
    }
}

function updateGhostYellow(sprite){

    switch(sprite.state){

        case State.UP_3:
            sprite.physics.vy = -sprite.physics.vLimit;
            break;

        case State.DOWN_3:
            sprite.physics.vy = sprite.physics.vLimit;
            break;

        default:
            console.error("ERROR: state invalid");
    }

    //calculate distance moved
    sprite.yPos += sprite.physics.vy * globals.deltaTime;

    //update animation frame
    updateAnimationFrame(sprite);

    //update direction randomly
    updateDirectionRandomVertical(sprite);

    const isCollision = calculateCollisionWithBordersVertical(sprite);

    if(isCollision){

        swapDirectionVertical(sprite);
    }
}

function updateGhostOrange(sprite){

     switch(sprite.state){

        case State.RIGHT_4:
        sprite.physics.vx = sprite.physics.vLimit;
        sprite.physics.vy = 0;
        break;

    case State.LEFT_4:
        sprite.physics.vx = -sprite.physics.vLimit;
        sprite.physics.vy = 0;
        break;

    case State.UP_4:
        sprite.physics.vy = -sprite.physics.vLimit;
        sprite.physics.vx = 0;
        break;

    case State.DOWN_4:
        sprite.physics.vy = sprite.physics.vLimit;
        sprite.physics.vx = 0;
        break;

    default:
        console.error("ERROR: state invalid");
    }

    //calculate distance moved
    sprite.xPos += sprite.physics.vx * globals.deltaTime;
    sprite.yPos += sprite.physics.vy * globals.deltaTime;

    //update animation frame
    updateAnimationFrame(sprite);

    //update direction randomly
    //updateDirectionRandom(sprite);

    updateDirectionRandomUpRight(sprite);

    calculateCollisionWithFourBorders(sprite);
}

function updateGhostBlue(sprite){

    switch(sprite.collisionBorder){

        case Collision.BORDER_RIGHT:
            sprite.physics.vx = -sprite.physics.vLimit;
            break;

        case Collision.BORDER_LEFT:
            sprite.physics.vx = sprite.physics.vLimit;
            break;

        case Collision.BORDER_UP:
            sprite.physics.vy = sprite.physics.vLimit;
            break;

        case Collision.BORDER_DOWN:
            sprite.physics.vy = -sprite.physics.vLimit;
            break;

    }

    //calculate distance moved
    sprite.xPos += sprite.physics.vx * globals.deltaTime;
    sprite.yPos += sprite.physics.vy * globals.deltaTime;

    //update animation frame
    updateAnimationFrame(sprite);

    //update direction randomly
    //updateDirectionRandom(sprite);

    calculateCollisionWithFourBorders(sprite);
}

function updateKey(sprite){

    updateAnimationFrame(sprite);
}

function updateAnimationFrame(sprite){

    switch(sprite.state){

        case State.STILL_UP:
        case State.STILL_LEFT:
        case State.STILL_DOWN:
        case State.STILL_RIGHT:
            sprite.frames.frameCounter = 0;
            sprite.frames.frameChangeCounter = 0;
            break;

        default:
            
            //increment counter time between frames
            sprite.frames.frameChangeCounter++;

            //change frame if counter matches speed
            if(sprite.frames.frameChangeCounter === sprite.frames.speed){

                //advance to next frame
                sprite.frames.frameCounter++;

                //reset frame change counter
                sprite.frames.frameChangeCounter = 0;
            }

            //reset frame counter if it exceeds frames per state
            if(sprite.frames.frameCounter === sprite.frames.framesPerState){

                sprite.frames.frameCounter = 0;
            }
    }
}

function swapDirection(sprite){

    sprite.state = sprite.state === State.RIGHT_2 ? State.LEFT_2 : State.RIGHT_2;
}

function swapDirectionVertical(sprite){

    sprite.state = sprite.state === State.DOWN_3 ? State.UP_3 : State.DOWN_3;
}

function updateDirectionRandom(sprite){

    //update counter
    sprite.directionChangeCounter += globals.deltaTime;

    //check if it's time to change direction
    if(sprite.directionChangeCounter > sprite.maxTimeToChangeDirection){

        //reset counter
        sprite.directionChangeCounter = 0;

        //set new random time to change direction between 1 and 8 seconds
        sprite.maxTimeToChangeDirection = Math.floor(Math.random() * 8) + 1;
        
        //swap direction
        swapDirection(sprite);
    }
}

function updateDirectionRandomUpRight(sprite){
    //update counter
    sprite.directionChangeCounter += globals.deltaTime;

    //check if it's time to change direction
    if(sprite.directionChangeCounter > sprite.maxTimeToChangeDirection){
        //reset counter
        sprite.directionChangeCounter = 0;

        //set new random time to change direction between 1 and 8 seconds
        sprite.maxTimeToChangeDirection = Math.floor(Math.random() * 10) + 1;
        
        // Change direction
        if (sprite.state === State.UP_4) {
            sprite.state = State.RIGHT_4;
        } else if (sprite.state === State.RIGHT_4) {
            sprite.state = State.DOWN_4;
        } else {
            sprite.state = State.LEFT_4;
        }

        //sprite.state = sprite.state === State.UP_4 ? State.RIGHT_4 : sprite.state === State.RIGHT_4 ? State.DOWN_4 : State.LEFT_4; 
    }
}

function updateDirectionRandomVertical(sprite){

    //update counter
    sprite.directionChangeCounter += globals.deltaTime;

    //check if it's time to change direction
    if(sprite.directionChangeCounter > sprite.maxTimeToChangeDirection){

        //reset counter
        sprite.directionChangeCounter = 0;

        //set new random time to change direction between 1 and 8 seconds
        sprite.maxTimeToChangeDirection = Math.floor(Math.random() * 8) + 1;
        
        //swap direction
        swapDirectionVertical(sprite);
    }
}

function updateSprites(){

    for(let i = 0; i < globals.sprites.length; ++i){

        const sprite = globals.sprites[i];
        updateSprite(sprite);
    }
}

function calculateCollisionWithBorders(sprite){

    let isCollision = false;

    //right border collision
    if(sprite.xPos + sprite.imageSet.xSize > globals.canvas.width){

        isCollision = true;
    }

    //left border collision
    else if(sprite.xPos < 0){

        isCollision = true;
    }

    return isCollision;
}

function calculateCollisionWithBordersVertical(sprite){
    
    let isCollision = false;

     //bottom border collision
    if(sprite.yPos + sprite.imageSet.ySize > globals.canvas.height){

        isCollision = true;
    }

    //top border collision
    else if(sprite.yPos < 0){

        isCollision = true;
    }

    return isCollision;
}

function calculateCollisionWithFourBorders(sprite){

    //right border collision
    if(sprite.xPos + sprite.imageSet.xSize > globals.canvas.width){

        sprite.collisionBorder = Collision.BORDER_RIGHT;
    }

    //left border collision
    else if(sprite.xPos < 0){

        sprite.collisionBorder = Collision.BORDER_LEFT;
    }

    else if(sprite.yPos < 0){

        sprite.collisionBorder = Collision.BORDER_UP;
    }

    else if(sprite.yPos + sprite.imageSet.ySize > globals.canvas.height){

        sprite.collisionBorder = Collision.BORDER_DOWN;
    }

    else{

        sprite.collisionBorder = Collision.NO_COLISSION;
    }

}

function readKeyboardAndAssignState(sprite){

    sprite.state = globals.action.moveLeft ? State.LEFT :               //Left key pressed
                   globals.action.moveRight ? State.RIGHT :             //Right key pressed
                   globals.action.moveUp ? State.UP :                   //Up key pressed
                   globals.action.moveDown ? State.DOWN :               //Down key pressed
                   sprite.state === State.LEFT ? State.STILL_LEFT :     //No key pressed, previous state left
                   sprite.state === State.RIGHT ? State.STILL_RIGHT :   //No key pressed, previous state right
                   sprite.state === State.UP ? State.STILL_UP :         //No key pressed, previous state up
                   sprite.state === State.DOWN ? State.STILL_DOWN :     //No key pressed, previous state down
                   sprite.state;
}

function updateLife(sprite){

    if(sprite.isCollidingWithPlayer){
            
        globals.life--;
    }
    
}

function updateHUDLifePoints(){
    
    if (globals.life <= 0) {

        globals.lifeFrameX = 0; // vacío
        globals.lifeFrameY = 0;

    } else if (globals.life <= 30) {

        globals.lifeFrameX = 0;

    } else if (globals.life <= 80) {

        globals.lifeFrameX = 28; // medio

    } else {

        globals.lifeFrameX = 56; // completo
        globals.lifeFrameY = 0;
    }
}

function updateMana(sprite){

    if(sprite.isCollidingWithPlayer){
            
        globals.mana += 10;
    }
}

function updateHUDMana(){

    if (globals.mana <= 15) {

        globals.manaFrameY = 14;

    } else if (globals.mana <= 30) {
        
        globals.manaFrameY = 42;

    } else {
        
        globals.manaFrameY = 70;
    }
}

function updateScore(sprite){

    if(sprite.isCollidingWithCard){

        globals.score += 200;
    }
}

//SOUND
function playSound(){

    if(globals.currentSound != Sound.NO_SOUND){

        globals.sounds[globals.currentSound].currentTime = 0;
        globals.sounds[globals.currentSound].play();

        globals.currentSound = Sound.NO_SOUND;
    }
}

function isGameOver(){

     if (globals.life <= 0) {

        globals.gameState = Game.GAME_OVER;

        if (globals.score > globals.highScore) {
            globals.highScore = globals.score;
        }
    }
}

function gameOver(){

    if (globals.action.moveUp) {

        globals.action.moveUp = false; // resetear para que no se repita

        globals.arrow = 137;
        
    }

    if (globals.action.moveDown) {
        
        globals.action.moveDown = false;
        globals.arrow = 167;
    }

    if (globals.action.moveRight) {

        // Determinar qué opción está seleccionada según la posición de la flecha
        if (globals.arrow === 137) {
            
            console.log("Mostrando NEW GAME");

            // Opción "NEW GAME" seleccionada
            globals.gameState = Game.NEW_GAME;

        } else if (globals.arrow === 167) {

            // Opción "HIGH SCORE" seleccionada
            console.log("Mostrando PLAYING");
            globals.gameState = Game.PLAYING;
            globals.life = 100;
            globals.score++;

        }

        globals.action.moveRight = false; // consumir la acción
    }
}

function story(){

    globals.arrow = 197;

    if (globals.action.moveRight) {

        // Determinar qué opción está seleccionada según la posición de la flecha
        if (globals.arrow === 197) {
            
            console.log("Mostrando NEW GAME");

            // Opción "NEW GAME" seleccionada
            globals.gameState = Game.NEW_GAME;

        }

        globals.action.moveRight = false; // consumir la acción
    }
}

function controls(){

    globals.arrow = 197;

    if (globals.action.moveRight) {

        // Determinar qué opción está seleccionada según la posición de la flecha
        if (globals.arrow === 197) {
            
            console.log("Mostrando NEW GAME");

            // Opción "NEW GAME" seleccionada
            globals.gameState = Game.NEW_GAME;

        }

        globals.action.moveRight = false; // consumir la acción
    }
}

function updateParticles(){

    for (let i = 0; i < globals.particles.length; ++i){

        const particle = globals.particles[i];

        if(particle.id === ParticleId.FIRE && particle.state === ParticleState.OFF){

            globals.particles.splice (i, 1);
            i--;

            createFireParticle();
        } else{

            updateParticle(particle);
        }
    }
}

function updateParticle(particle){

    const type = particle.id;
    switch (type){

        case ParticleId.EXPLOSION:
            break;

        case ParticleId.FIRE:
            
            updateFireParticle(particle);
        
            break;

        default: 
            break;
    }
}

function updateFireParticle(particle){

    switch(particle.state){

        case ParticleState.ON: 
            
            particle.radius -= 0.1;

            if(particle.radius < 2){
                particle.state = ParticleState.FADE;
            }

            break;
            
        case ParticleState.FADE: 

            particle.alpha -= 0.3;

            if(particle.alpha <= 0){

                particle.state = ParticleState.OFF;
            }

            break;

        case ParticleState.OFF:
            break;

        default:
            break;
    }

    particle.xPos += particle.physics.vx * globals.deltaTime;
    particle.yPos += particle.physics.vy * globals.deltaTime;
}