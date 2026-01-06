import globals from "./globals.js";
import { Game, State, SpriteID } from "./constants.js";

export default function update(){

    switch(globals.gameState){

        case Game.LOADING:
            
            console.log("Loading assets...");
            
            break;
        case Game.PLAYING:
            
            playGame();
            
            break;
        default:
            console.error("ERROR: Game State invalid");
    }
}

function playGame(){

    //completar

    updateSprites();

    updateGameTime();
    
    updateLevelTime();
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
            break;

        case SpriteID.YELLOW:
            updateGhostYellow(sprite);
            break;

        case SpriteID.ORANGE:
            updateGhostOrange(sprite);
            break;

        case SpriteID.BLUE:
            updateGhostBlue(sprite);
            break;

        default:
            break;
    }
}

function updatePlayer(sprite){

    //read keyboard and assign state
    readKeyboardAndAssignState(sprite);

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

function updateGhostBlue(sprite){

    switch(sprite.state){

        case State.RIGHT_2:
            sprite.physics.vx = -sprite.physics.vLimit;
            break;
        case State.LEFT_2:
            sprite.physics.vx = sprite.physics.vLimit;
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

    sprite.state = sprite.state === State.UP_3 ? State.DOWN_3 : State.UP_3;
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