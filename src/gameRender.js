import globals from "./globals.js";
import { Game, ParticleId, ParticleState, Tile } from "./constants.js";
import { highScoreData } from "./HighScoreFake.js";

export default function render(){

    switch(globals.gameState){

        case Game.LOADING:
            
            drawLoading(); //Draw loading spinner
            
            break;

        case Game.PLAYING:
            
            drawGame();
            
            break;

        case Game.LOAD_LEVEL1:
            
            drawLevel1();
            
            break;
            
        case Game.LOAD_LEVEL2:
            
            //drawLevel2();
            
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

        case Game.INSERT_NAME:

            drawInsertName();

            break;

        case Game.LOAD_HIGHSCORE:
            
            drawLoadHighScore();
            break;

        case Game.HIGHSCORE:

            drawHighScore();

            break;

        case Game.HIGHSCORE_TOP:

            drawTopHighScore();

            break;

        case Game.HIGHSCORE_TOP2:

            drawTopHighScore2();

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

    //TITLE
    globals.ctx.font = "32px emulogic";
    globals.ctx.fillStyle = "darkviolet";
    globals.ctx.fillText("SCAPE", 140, 40);
    
    globals.ctx.font = "8px emulogic";
    globals.ctx.fillText("FROM THE", 180, 52);

    globals.ctx.font = "32px emulogic";
    globals.ctx.fillText("SHADOWS", 110, 90);

    //Draw score
    globals.ctx.font = "8px emulogic";
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("NEW GAME", 180, 130);

    //story
    globals.ctx.font = "8px emulogic";
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("STORY", 180, 150);

    //controls
    globals.ctx.font = "8px emulogic";
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("CONTROLS", 180, 170);

    //Draw high score
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("HIGH SCORE", 180, 190);

    globals.ctx.font = "8px emulogic";
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("© kaotika", 180, 320);

    globals.ctx.imageSet = new Image();
    globals.ctx.imageSet.src = "./images/arrow.png";      //x, y, xsize, ysize
    globals.ctx.drawImage(globals.ctx.imageSet, 160, globals.arrow, 16, 16);
}

function drawLevel1(){

    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);
    globals.ctxHUD_RIGHT.clearRect(0, 0, globals.canvasHUD_RIGHT.width, globals.canvasHUD_RIGHT.height);

    globals.ctx.font = "16px emulogic";
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("LOADING...", 100, 90);
}

function drawLevel2(){

    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);
    globals.ctxHUD_RIGHT.clearRect(0, 0, globals.canvasHUD_RIGHT.width, globals.canvasHUD_RIGHT.height);

    globals.ctx.font = "16px emulogic";
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("LOADING...", 100, 90);
}

function drawGame(){

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

    const stage = globals.currentLevel + 1;

    globals.ctxHUD_RIGHT.imageSet = new Image();
    globals.ctxHUD_RIGHT.imageSet.src = "./images/lucrecia.png";
    globals.ctxHUD_RIGHT.drawImage(globals.ctxHUD_RIGHT.imageSet, 8, 10, 64, 64);

    //book
    globals.ctxHUD_RIGHT.imageSet = new Image();
    globals.ctxHUD_RIGHT.imageSet.src = "./images/Book.png"; //x, y, xsize, ysize
    globals.ctxHUD_RIGHT.drawImage(globals.ctxHUD_RIGHT.imageSet, 0, 105, 80, 55);

    //Transform
    //const xPos = Math.floor(globals.ctxHUD_RIGHT.imageSet.xPos);
    //const yPos = Math.floor(globals.ctxHUD_RIGHT.imageSet.yPos);
    //globals.ctxHUD_RIGHT.translate(xPos + globals.ctxHUD_RIGHT.imageSet.xSize / 2, yPos + globals.ctxHUD_RIGHT.imageSet.ySize / 2);
    //let angle = 30;
    //let angle_radius = angle * Math.PI / 180;
    //globals.ctxHUD_RIGHT.rotate(angle_radius);
    //globals.ctxHUD_RIGHT.translate(-(xPos + globals.ctxHUD_RIGHT.imageSet.xSize / 2), -(yPos + globals.ctxHUD_RIGHT.imageSet.ySize / 2));
    //globals.ctxHUD_RIGHT.setTransform(1, 0, 0, 1, 0, 0);

    globals.ctxHUD_RIGHT.imageSetFrames = new Image();
    globals.ctxHUD_RIGHT.imageSetFrames.src = "./images/book_frames.png";


    // Life and mana sprite
    drawSprite(
        globals.ctxHUD_RIGHT,
        globals.ctxHUD_RIGHT.imageSetFrames,
        globals.lifeFrameX, globals.lifeFrameY,    // sx, sy - frame image
        14, 26,          // sw, sh - frame size
        0, 105,          // dx, dy - canvas position
        40, 55           // dw, dh - canvas size
    );

    drawSprite(
        globals.ctxHUD_RIGHT,
        globals.ctxHUD_RIGHT.imageSetFrames,
        globals.manaFrameY, 0,        
        14, 26,          
        40, 105,          
        40, 55          
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
    globals.ctx.fillText("RIGHT", 60, 180);

    globals.ctx.imageSet = new Image();
    globals.ctx.imageSet.src = "./images/D.png";
    globals.ctx.drawImage(globals.ctx.imageSet, 30, 168, 17, 16);

    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("ATTACK", 160, 90);

    globals.ctx.imageSet = new Image();
    globals.ctx.imageSet.src = "./images/E.png";
    globals.ctx.drawImage(globals.ctx.imageSet, 130, 78, 17, 16);

    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("CONFIRM", 160, 120);

    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("COIN", 160, 150);

    globals.ctx.imageSet = new Image();
    globals.ctx.imageSet.src = "./images/C.png";
    globals.ctx.drawImage(globals.ctx.imageSet, 130, 138, 17, 16);

    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("MUSIC", 160, 180);

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
    globals.ctx.fillText("Save highscore", 100, 180);

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

        case ParticleId.EXPLOSION:
            renderExplosionParticle(particle);
            break;

        case ParticleId.FIRE:
            renderFireParticle(particle);
            break;
        
        case ParticleId.LIQUID:
            renderLiquidParticle(particle);
            break;

        default:
            break;
    }
}

function renderExplosionParticle(particle){

    if(particle.state != ParticleState.OFF){

        globals.ctx.fillStyle = 'blue';
        globals.ctx.globalAlpha = particle.alpha;
        globals.ctx.beginPath();
        globals.ctx.arc(particle.xPos, particle.yPos, particle.radius, 0, 2 * Math.PI);
        globals.ctx.fill();
        globals.ctx.globalAlpha = 1.0;
    }
}

function renderFireParticle(particle){

    if(particle.state != ParticleState.OFF){

        globals.ctx.save();
        globals.ctx.fillStyle = 'red';
        //globals.ctx.filter = 'saturate (500%)';

        globals.ctx.globalAlpha = particle.alpha;
        globals.ctx.beginPath();
        globals.ctx.arc(particle.xPos, particle.yPos, particle.radius, 0, 2 * Math.PI);

        globals.ctx.fill();
        globals.ctx.restore();
    }
}

function renderLiquidParticle(particle){

    if(particle.state != ParticleState.OFF){

        globals.ctx.save();
        globals.ctx.fillStyle = 'lightgreen';
        //globals.ctx.filter = 'saturate (500%)';

        globals.ctx.globalAlpha = particle.alpha;
        globals.ctx.beginPath();
        globals.ctx.arc(particle.xPos, particle.yPos, particle.radius, 0, 2 * Math.PI);

        globals.ctx.fill();
        globals.ctx.restore();
    }
}

function drawLoadHighScore(){

    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);
    globals.ctxHUD_RIGHT.clearRect(0, 0, globals.canvasHUD_RIGHT.width, globals.canvasHUD_RIGHT.height);
}

function drawInsertName(){

    const xPos = globals.keyPosX;
    const yPos = globals.keyPosY;

    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);
    globals.ctxHUD_RIGHT.clearRect(0, 0, globals.canvasHUD_RIGHT.width, globals.canvasHUD_RIGHT.height);
    
    globals.ctx.font = "16px emulogic";
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("INSERT NAME", 120, 60);

    //globals.ctx.fillStyle = "lightgray";
    //globals.ctx.fillRect(100, 9, 40, 8);
    globals.ctx.fillStyle = "orange";
    globals.ctx.fillRect(80, 80, 60, 80);

    //globals.ctx.fillStyle = "white";
    //globals.ctx.fillRect(80, 80, 3, 80);

    globals.ctx.fillStyle = "pink";
    globals.ctx.fillRect(180, 80, 60, 80);

    globals.ctx.fillStyle = "lightblue";
    globals.ctx.fillRect(280, 80, 60, 80);

    globals.blinkCounter++;
    
    // Reiniciar contador para que no crezca infinitamente
    if (globals.blinkCounter >= globals.blinkSpeed * 2) {
        globals.blinkCounter = 0;
    }
    
    // Solo dibujar si el contador está en la primera mitad del ciclo
    if (globals.blinkCounter < globals.blinkSpeed) {
        globals.ctx.fillStyle = "gray";
        globals.ctx.fillRect(globals.cursorX, 80, 3, 80);
    }
    //draw letter
    globals.ctx.font = "64px emulogic";
    globals.ctx.fillStyle = "purple";
    globals.ctx.fillText(globals.name[0], 80, 160);

    globals.ctx.font = "64px emulogic";
    globals.ctx.fillStyle = "green";
    globals.ctx.fillText(globals.name[1], 180, 160);

    globals.ctx.font = "64px emulogic";
    globals.ctx.fillStyle = "darkred";
    globals.ctx.fillText(globals.name[2], 280, 160);

    //keyboard
    globals.ctx.imageSet = new Image();
    globals.ctx.imageSet.src = "./images/master.png";
    globals.ctx.drawImage(globals.ctx.imageSet, 50, 200, 237, 67);

    globals.ctx.imageSet = new Image();
    globals.ctx.imageSet.src = "./images/selector.png";
    globals.ctx.drawImage(globals.ctx.imageSet, xPos, yPos, 15, 14);
    
    globals.ctx.font = "8px emulogic";
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("CONTINUE", 300, 330);   

    globals.ctx.imageSet = new Image();
    globals.ctx.imageSet.src = "./images/arrow.png";
    globals.ctx.drawImage(globals.ctx.imageSet, 280, globals.arrow, 16, 16);

}

function drawHighScore(){

    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);
    globals.ctxHUD_RIGHT.clearRect(0, 0, globals.canvasHUD_RIGHT.width, globals.canvasHUD_RIGHT.height);

    globals.ctx.font = "16px emulogic";
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("HIGH SCORE", 60, 30);

    globals.ctx.font = "8px emulogic";
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("TOP   NAME    LEVEL    SCORE", 100, 80);

    for(let i = 0; i < 10; ++i){

        const highScore = highScoreData[i];
        globals.ctx.fillText(" " + (i + 1) + "     " + highScore.name + "      " + highScore.level + "     " + highScore.score, 100, 100 + i * 20);
    }

    //Draw high score
    //globals.ctx.font = "8px emulogic";
    //globals.ctx.fillStyle = "lightgray";
    //globals.ctx.fillText("SCORE", 100, 110);
    //globals.ctx.fillText(" " + globals.highScore, 100, 120);

    //go back to new game
    globals.ctx.font = "8px emulogic";
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("RETURN", 300, 330);

    globals.ctx.imageSet = new Image();
    globals.ctx.imageSet.src = "./images/arrow.png";
    globals.ctx.drawImage(globals.ctx.imageSet, 280, globals.arrow, 16, 16);

}

function drawTopHighScore(){

    let top = 1;

    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);
    globals.ctxHUD_RIGHT.clearRect(0, 0, globals.canvasHUD_RIGHT.width, globals.canvasHUD_RIGHT.height);

    globals.ctx.font = "16px emulogic";
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("HIGH SCORE", 60, 30);

    globals.ctx.font = "8px emulogic";
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("TOP   NAME    LEVEL    SCORE", 100, 80);
    //globals.ctx.fillText(" " + top + "     AMN       1     105000", 100, 100);

    for(let i = 0; i < 10; ++i){

        const highScore = highScoreData[i];
        globals.ctx.fillText(" " + (highScore.position) + "     " + highScore.name + "      " + highScore.level + "     " + highScore.score, 100, 100 + i * 20);
    }

    //go back to new game
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("CONTINUE", 300, 330);

    //go back to new game
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("RETURN", 300, 350);

    globals.ctx.imageSet = new Image();
    globals.ctx.imageSet.src = "./images/arrow.png";
    globals.ctx.drawImage(globals.ctx.imageSet, 280, globals.arrow, 16, 16);

}

function drawTopHighScore2(){

    let top = 1;

    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);
    globals.ctxHUD_RIGHT.clearRect(0, 0, globals.canvasHUD_RIGHT.width, globals.canvasHUD_RIGHT.height);

    globals.ctx.font = "16px emulogic";
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("HIGH SCORE", 60, 30);

    globals.ctx.font = "8px emulogic";
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("TOP   NAME    LEVEL    SCORE", 100, 80);
    //globals.ctx.fillText(" " + top + "     AMN       1     105000", 100, 100);

    for(let i = 10; i < highScoreData.length; ++i){

        const highScore = highScoreData[i];
        globals.ctx.fillText(" " + (highScore.position) + "     " + highScore.name + "      " + highScore.level + "     " + highScore.score, 100, 100 + (i % 10) * 20);
    }

    //go back to new game
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("RETURN", 300, 330);

    globals.ctx.imageSet = new Image();
    globals.ctx.imageSet.src = "./images/arrow.png";
    globals.ctx.drawImage(globals.ctx.imageSet, 280, globals.arrow, 16, 16);

}