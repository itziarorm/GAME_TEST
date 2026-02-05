import globals from "./globals.js";
import { Game, ParticleId, ParticleState, Tile } from "./constants.js";

export default function render(){

    switch(globals.gameState){

        case Game.LOADING:
            
            drawLoading(); //Draw loading spinner
            
            break;

        case Game.PLAYING:
            
            drawGame();
            
            break;
        
        case Game.NEW_GAME:

            drawNewGame();

            break;

        case Game.CONTROLS:

            drawControls();

            break;
        
        case Game.STORY:

            drawStory();

            break;

        case Game.GAME_OVER:

            drawGameOver();

            break;

        default:
            console.error("ERROR: Game State invalid");
    }
}

function drawLoading(){

    renderLoading();
}

function renderLoading(){

    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);
    globals.ctxHUD_RIGHT.clearRect(0, 0, globals.canvasHUD_RIGHT.width, globals.canvasHUD_RIGHT.height);

    globals.ctx.font = "16px emulogic";
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("LOADING...", 100, 90);
}

function drawNewGame(){

    renderNewScreen();
}

function renderNewScreen(){

    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);
    globals.ctxHUD_RIGHT.clearRect(0, 0, globals.canvasHUD_RIGHT.width, globals.canvasHUD_RIGHT.height);

    globals.ctx.font = "24px emulogic";
    globals.ctx.fillStyle = "red";
    globals.ctx.fillText("SCAPE", 80, 40);

    globals.ctx.font = "8px emulogic";
    globals.ctx.fillText("FROM THE", 100, 52);

    globals.ctx.font = "24px emulogic";
    globals.ctx.fillText("SHADOWS", 60, 80);

    //Draw score
    globals.ctx.font = "8px emulogic";
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("NEW GAME", 100, 130);

    //story
    globals.ctx.font = "8px emulogic";
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("STORY", 100, 150);

    //controls
    globals.ctx.font = "8px emulogic";
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("CONTROLS", 100, 170);

    //Draw high score
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("HIGH SCORE", 100, 190);

    globals.ctx.font = "8px emulogic";
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("© kaotika", 100, 220);

    globals.ctx.imageSet = new Image();
    globals.ctx.imageSet.src = "./images/arrow.png";      //x, y, xsize, ysize
    globals.ctx.drawImage(globals.ctx.imageSet, 80, globals.arrow, 16, 16);

}

function drawGame(){

    //to complete

    //clear canvases
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);
    globals.ctxHUD_RIGHT.clearRect(0, 0, globals.canvasHUD_RIGHT.width, globals.canvasHUD_RIGHT.height);

    renderMap();

    //draw sprites
    drawSprites();

    renderParticles();

    //draw HUD
    renderHUD();

    renderHUD_Right();

}

function renderSprite(sprite){

    const xPosInit = sprite.imageSet.initCol * sprite.imageSet.gridSize;
    const yPosInit = sprite.imageSet.initFil * sprite.imageSet.gridSize;

    const xTile = xPosInit + sprite.frames.frameCounter * sprite.imageSet.gridSize + sprite.imageSet.xOffset;
    const yTile = yPosInit + sprite.state * sprite.imageSet.gridSize + sprite.imageSet.yOffset;

    const xPos = Math.floor(sprite.xPos);
    const yPos = Math.floor(sprite.yPos);

    globals.ctx.drawImage(
        globals.tileSets[Tile.SIZE_16],
        xTile, yTile,
        sprite.imageSet.xSize, sprite.imageSet.ySize,
        xPos, yPos,
        sprite.imageSet.xSize, sprite.imageSet.ySize
    );
}

function drawSprites(){

    for(let i = 0; i < globals.sprites.length; ++i){

        const sprite = globals.sprites[i];

        //drawSpriteRectangle(sprite);

        renderSprite(sprite);

        //drawHitBox(sprite);
    }
}

function drawSpriteRectangle(sprite){

    const x1 = Math.floor(sprite.xPos);
    const y1 = Math.floor(sprite.yPos);
    const w1 = sprite.imageSet.xSize;
    const h1 = sprite.imageSet.ySize;

    globals.ctx.fillStyle = "green";
    globals.ctx.fillRect(x1, y1, w1, h1);

}

function drawHitBox(sprite){

    const x1 = Math.floor(sprite.xPos) + Math.floor(sprite.hitBox.xOffset);
    const y1 = Math.floor(sprite.yPos) + Math.floor(sprite.hitBox.yOffset);
    const w1 = sprite.hitBox.xSize;
    const h1 = sprite.hitBox.ySize;

    globals.ctx.strokeStyle = "red";
    globals.ctx.strokeRect(x1, y1, w1, h1);
}



function renderMap(){

    const brickSize = globals.level.imageSet.gridSize;
    const levelData = globals.level.data;

    const num_fil = levelData.length;
    const num_col = levelData[0].length;

    for(let i = 0; i < num_fil; ++i){

        for(let j = 0; j < num_col; ++j){

            const xTile = (levelData[i][j] - 1) * brickSize;
            const yTile = 0;
            const xPos = j * brickSize;
            const yPos = i * brickSize;

            globals.ctx.drawImage(

                globals.tileSets[Tile.SIZE_12],
                xTile, yTile,
                brickSize, brickSize,
                xPos, yPos,
                brickSize, brickSize
            );
        }
    }    
}

function renderHUD(){

    //TEST DATA
    let score = globals.score;
    const highScore = globals.highScore;
    const time = globals.levelTime.value;

    //Draw score
    globals.ctxHUD.font = "8px emulogic";
    globals.ctxHUD.fillStyle = "lightblue";
    globals.ctxHUD.fillText("SCORE", 32, 8);
    globals.ctxHUD.fillStyle = "lightgray";
    globals.ctxHUD.fillText(" " + score, 32, 16);

    //Draw high score
    globals.ctxHUD.fillStyle = "lightblue";
    globals.ctxHUD.fillText("HIGH SCORE", 96, 8);
    globals.ctxHUD.fillStyle = "lightgray";
    globals.ctxHUD.fillText(" " + highScore, 96, 16);

    //Draw time
    // globals.ctxHUD.fillStyle = "lightblue";
    // globals.ctxHUD.fillText("TIME", 224, 8);
    // globals.ctxHUD.fillStyle = "lightgray";
    // globals.ctxHUD.fillText(time, 224, 16);
}

function drawSprite(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
}

function renderHUD_Right(){

    const stage = 1;

    globals.ctxHUD_RIGHT.imageSet = new Image();
    globals.ctxHUD_RIGHT.imageSet.src = "./images/lucrecia.png";
    globals.ctxHUD_RIGHT.drawImage(globals.ctxHUD_RIGHT.imageSet, 8, 10, 64, 64);

    //book
    globals.ctxHUD_RIGHT.imageSet = new Image();
    globals.ctxHUD_RIGHT.imageSet.src = "./images/Book.png"; //x, y, xsize, ysize
    globals.ctxHUD_RIGHT.drawImage(globals.ctxHUD_RIGHT.imageSet, 0, 105, 80, 55);

    globals.ctxHUD_RIGHT.imageSetFrames = new Image();
    globals.ctxHUD_RIGHT.imageSetFrames.src = "./images/book_frames.png";


    // Dibujar el sprite
    drawSprite(
        globals.ctxHUD_RIGHT,
        globals.ctxHUD_RIGHT.imageSetFrames,
        globals.lifeFrameX, globals.lifeFrameY,        // sx, sy - posición del frame en la imagen
        14, 26,          // sw, sh - tamaño del frame en la fuente
        0, 105,          // dx, dy - posición donde dibujarlo en el canvas
        40, 55           // dw, dh - tamaño final en el canvas
    );

    drawSprite(
        globals.ctxHUD_RIGHT,
        globals.ctxHUD_RIGHT.imageSetFrames,
        globals.manaFrameY, 0,        // sx, sy - posición del frame en la imagen
        14, 26,          // sw, sh - tamaño del frame en la fuente
        40, 105,          // dx, dy - posición donde dibujarlo en el canvas
        40, 55           // dw, dh - tamaño final en el canvas
    );
    
    //draw life
    globals.ctxHUD_RIGHT.font = '8px emulogic';
    globals.ctxHUD_RIGHT.fillStyle = 'lightblue';
    globals.ctxHUD_RIGHT.fillText("LIFE", 5, 100);

    //Draw mana
    globals.ctxHUD_RIGHT.fillStyle = 'lightblue';
    globals.ctxHUD_RIGHT.fillText("MANA", 45, 100);
    
    //STAGE
    globals.ctxHUD_RIGHT.fillStyle = 'lightblue';
    globals.ctxHUD_RIGHT.fillText("STAGE", 18, 180);
    globals.ctxHUD_RIGHT.fillStyle = 'lightgray';
    globals.ctxHUD_RIGHT.fillText(" " + stage, 25, 200);

}

function drawControls(){

    renderControlsScreen();
}

function renderControlsScreen(){

    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);
    globals.ctxHUD_RIGHT.clearRect(0, 0, globals.canvasHUD_RIGHT.width, globals.canvasHUD_RIGHT.height);

    globals.ctx.font = "16px emulogic";
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("CONTROLS", 60, 20);

    //Keys
    globals.ctx.font = "8px emulogic";
    globals.ctx.fillStyle = "white";
    globals.ctx.fillText("UP", 60, 90);

    globals.ctx.imageSet = new Image();
    globals.ctx.imageSet.src = "./images/W.png";
    globals.ctx.drawImage(globals.ctx.imageSet, 30, 78, 17, 16);

    globals.ctx.fillStyle = "gold";
    globals.ctx.fillText("LEFT", 60, 120);

    globals.ctx.imageSet = new Image();
    globals.ctx.imageSet.src = "./images/A.png";
    globals.ctx.drawImage(globals.ctx.imageSet, 30, 108, 17, 16);

    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("DOWN", 60, 150);

    globals.ctx.imageSet = new Image();
    globals.ctx.imageSet.src = "./images/S.png";
    globals.ctx.drawImage(globals.ctx.imageSet, 30, 138, 17, 16);

    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("RIGHT/CONFIRM", 60, 180);

    globals.ctx.imageSet = new Image();
    globals.ctx.imageSet.src = "./images/D.png";
    globals.ctx.drawImage(globals.ctx.imageSet, 30, 168, 17, 16);

    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("ATTACK", 160, 90);

    globals.ctx.imageSet = new Image();
    globals.ctx.imageSet.src = "./images/E.png";
    globals.ctx.drawImage(globals.ctx.imageSet, 130, 78, 17, 16);

    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("COIN", 160, 120);

    globals.ctx.imageSet = new Image();
    globals.ctx.imageSet.src = "./images/C.png";
    globals.ctx.drawImage(globals.ctx.imageSet, 130, 108, 17, 16);

    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("Back", 180, 210);

    globals.ctx.imageSet = new Image();
    globals.ctx.imageSet.src = "./images/arrow.png";
    globals.ctx.drawImage(globals.ctx.imageSet, 160, globals.arrow, 16, 16);

}

function drawStory(){

    renderStoryScreen();
}

function renderStoryScreen(){

    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);
    globals.ctxHUD_RIGHT.clearRect(0, 0, globals.canvasHUD_RIGHT.width, globals.canvasHUD_RIGHT.height);

    globals.ctx.font = "8px emulogic";
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("CHAPTER 3", 80, 10);

    globals.ctx.imageSet = new Image();
    globals.ctx.imageSet.src = "./images/forest.webp";
    globals.ctx.drawImage(globals.ctx.imageSet, 20, 20, 180, 130);

    // Draw story content
    globals.ctx.font = "8px emulogic";
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("When the seller fell for her deception,", 10, 170);
    globals.ctx.fillText("Lucretia felt her power returning.", 10, 185);

    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("Back", 180, 210);

    globals.ctx.imageSet = new Image();
    globals.ctx.imageSet.src = "./images/arrow.png";
    globals.ctx.drawImage(globals.ctx.imageSet, 160, globals.arrow, 16, 16);
}

function drawGameOver(){

    renderGameOverScreen();
}

function renderGameOverScreen(){

    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);
    globals.ctxHUD_RIGHT.clearRect(0, 0, globals.canvasHUD_RIGHT.width, globals.canvasHUD_RIGHT.height);


    //Draw score
    globals.ctx.font = "16px emulogic";
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("GAME OVER", 60, 30);

    //Draw high score
    globals.ctx.font = "8px emulogic";
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("HIGH SCORE", 100, 110);
    globals.ctx.fillText(" " + globals.highScore, 100, 120);

    //go back to new game
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("RETURN", 100, 150);

    //restart game
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("TRY AGAIN", 100, 180);

    globals.ctx.imageSet = new Image();
    globals.ctx.imageSet.src = "./images/arrow.png";
    globals.ctx.drawImage(globals.ctx.imageSet, 80, globals.arrow, 16, 16);
}

function renderParticles(){

    for (let i = 0; i < globals.particles.length; ++i){

        const particle = globals.particles[i];

        renderParticle(particle);
    }
}

function renderParticle(particle){

    const type = particle.id;
    switch (type){

        case ParticleId.FIRE:
            renderFireParticle(particle);
            break;
        
        default:
            break;
    }
}

function renderFireParticle(particle){

    if(particle.state != ParticleState.OFF){

        globals.ctxHUD_RIGHT.save();
        globals.ctxHUD_RIGHT.fillStyle = 'red';
        //globals.ctx.filter = 'saturate (500%)';

        globals.ctxHUD_RIGHT.globalAlpha = particle.alpha;
        globals.ctxHUD_RIGHT.beginPath();
        globals.ctxHUD_RIGHT.arc(particle.xPos, particle.yPos, particle.radius, 0, 2 * Math.PI);

        globals.ctxHUD_RIGHT.fill();
        globals.ctxHUD_RIGHT.restore();
    }
}