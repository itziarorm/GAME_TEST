import globals from "./globals.js";
import { Game, ParticleId, ParticleState, SpriteID, Tile } from "./constants.js";
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
            
            drawLevel2();
            
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

        case Game.GAME_WIN:

            drawGameWin();
            break;

        case Game.PAUSE:

            drawPause();
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

    if (!globals.assetsLoaded || globals.assetsLoaded < globals.assetsToLoad.length) {
        
        // === BARRA DE PROGRESO ===
        globals.ctx.fillStyle = "gray";
        globals.ctx.fillRect(100, 180, 1000, 20);
        
        let pixel = (globals.assetsLoaded / globals.assetsToLoad.length) * 1000;
        
        globals.ctx.fillStyle = "pink";
        globals.ctx.fillRect(100, 180, pixel, 20);
        
        globals.ctx.fillStyle = "white";
        globals.ctx.font = "16px Arial";
        globals.ctx.fillText(Math.round((globals.assetsLoaded / globals.assetsToLoad.length) * 100) + "%", 550, 195);
        
        return; 

    }else {
    
    // ANIMATION
    globals.loadingAnimCounter++;
    
    if (globals.loadingAnimCounter >= globals.loadingAnimSpeed) {
        globals.loadingAnimFrame++;
        globals.loadingAnimCounter = 0;
        
        if (globals.loadingAnimFrame >= globals.loadingImagesCount) {
            globals.loadingAnimFrame = 0;
        }
    }
    
    // Dibujar la imagen animada centrada
    if (globals.loadingImages.length > 0 && globals.loadingImages[globals.loadingAnimFrame]) {
        const currentImg = globals.loadingImages[globals.loadingAnimFrame];
        const imgWidth = 456;
        const imgHeight = 456;
        const imgX = (globals.canvas.width - imgWidth);
        const imgY = 10;
        
        globals.ctx.drawImage(currentImg, imgX, imgY, imgWidth, imgHeight);
    }
    
    const titleX = 140;
    const titleY = 60;
    
    if (globals.titleScale < 1) {
        globals.titleScale += 0.02;
        if (globals.titleScale > 1) globals.titleScale = 1;
    }
    
    globals.ctx.save();
    globals.ctx.translate(titleX + 80, titleY + 25);
    globals.ctx.scale(globals.titleScale, globals.titleScale);
    globals.ctx.translate(-(titleX + 80), -(titleY + 25));
    
    globals.ctx.font = "32px emulogic";
    globals.ctx.fillStyle = "yellow";
    globals.ctx.fillText("SCAPE ", titleX, titleY); 
    
    globals.ctx.font = "8px emulogic";
    globals.ctx.fillText("FROM THE ", titleX + 40, titleY + 12);
    
    globals.ctx.font = "32px emulogic";
    globals.ctx.fillText("SHADOWS ", titleX - 30, titleY + 50); 
    
    globals.ctx.restore();

    globals.ctx.font = "16px emulogic";
    globals.ctx.fillStyle = "lightgray";

    globals.blinkCounter++;
    
    if (globals.blinkCounter >= globals.blinkSpeed * 2) {
        globals.blinkCounter = 0;
    }
    
    if (globals.blinkCounter < globals.blinkSpeed) {
        globals.ctx.fillStyle = "red";
        globals.ctx.fillText("Press c to start ", 95, 300);  
    }
    }
}

function drawNewGame(){

    renderNewScreen();
}

function renderNewScreen(){

    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);
    globals.ctxHUD_RIGHT.clearRect(0, 0, globals.canvasHUD_RIGHT.width, globals.canvasHUD_RIGHT.height);

    globals.menuAnimCounter++;
    
    if (globals.menuAnimCounter >= globals.menuAnimSpeed) {
        globals.menuAnimFrame++;
        globals.menuAnimCounter = 0;
        
        if (globals.menuAnimFrame >= globals.menuImagesCount) {
            globals.menuAnimFrame = 0;
        }
    }
    
    if (globals.menuImages.length > 0 && globals.menuImages[globals.menuAnimFrame]) {
        const currentImg = globals.menuImages[globals.menuAnimFrame];
        const imgWidth = globals.canvas.width;
        const imgHeight = globals.canvas.height;
        
        globals.ctx.drawImage(currentImg, 0, 0, imgWidth, imgHeight);
    }

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

    globals.ctx.fillStyle = "aqua";
    globals.ctx.fillText("player 1", 70, 350);

    globals.ctx.fillStyle = "gold";
    globals.ctx.fillText("coins:" + globals.coins, 300, 350);

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

    if(sprite.id === SpriteID.PLAYER && globals.playerBlinking){
        if(!globals.blinkVisible){
            return;  // No dibujar si está en fase invisible del parpadeo
        }
    }

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

            const xTile = (levelData[i][j] - 1) % 18 * brickSize;
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
    const xPos = Math.floor(globals.ctxHUD_RIGHT.imageSet.xPos);
    const yPos = Math.floor(globals.ctxHUD_RIGHT.imageSet.yPos);
    globals.ctxHUD_RIGHT.translate(xPos + globals.ctxHUD_RIGHT.imageSet.xSize / 2, yPos + globals.ctxHUD_RIGHT.imageSet.ySize / 2);
    let angle = 30;
    let angle_radius = angle * Math.PI / 180;
    globals.ctxHUD_RIGHT.rotate(angle_radius);
    globals.ctxHUD_RIGHT.translate(-(xPos + globals.ctxHUD_RIGHT.imageSet.xSize / 2), -(yPos + globals.ctxHUD_RIGHT.imageSet.ySize / 2));
    globals.ctxHUD_RIGHT.setTransform(1, 0, 0, 1, 0, 0);

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
    globals.ctx.fillText("CONTROLS", 140, 20);

    globals.ctx.font = "16px emulogic";
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("GAME", 160, 60);

    //Keys
    globals.ctx.font = "8px emulogic";
    globals.ctx.fillStyle = "white";
    globals.ctx.fillText("UP", 60, 90);

    globals.ctx.imageSet = new Image();
    globals.ctx.imageSet.src = "./images/W.png";
    globals.ctx.drawImage(globals.ctx.imageSet, 30, 78, 17, 16);

    globals.ctx.fillStyle = "white";
    globals.ctx.fillText("LEFT", 160, 90);

    globals.ctx.imageSet = new Image();
    globals.ctx.imageSet.src = "./images/A.png";
    globals.ctx.drawImage(globals.ctx.imageSet, 130, 78, 17, 16);

    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("DOWN", 260, 90);

    globals.ctx.imageSet = new Image();
    globals.ctx.imageSet.src = "./images/S.png";
    globals.ctx.drawImage(globals.ctx.imageSet, 230, 78, 17, 16);

    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("RIGHT", 90, 130);

    globals.ctx.imageSet = new Image();
    globals.ctx.imageSet.src = "./images/D.png";
    globals.ctx.drawImage(globals.ctx.imageSet, 60, 118, 17, 16);

    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("ATTACK", 220, 130);

    globals.ctx.imageSet = new Image();
    globals.ctx.imageSet.src = "./images/E.png";
    globals.ctx.drawImage(globals.ctx.imageSet, 190, 118, 17, 16);

    //MENU
    globals.ctx.font = "16px emulogic";
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("MENU", 160, 180);

    globals.ctx.font = "8px emulogic";
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("CONFIRM", 160, 220);

    globals.ctx.imageSet = new Image();
    globals.ctx.imageSet.src = "./images/ENTER.png";
    globals.ctx.drawImage(globals.ctx.imageSet, 120, 198, 25, 30);

    globals.ctx.font = "8px emulogic";
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("SELECT LETTER", 140, 250);

    globals.ctx.imageSet = new Image();
    globals.ctx.imageSet.src = "./images/SPACEALTERNATIVE.png";
    globals.ctx.drawImage(globals.ctx.imageSet, 80, 238, 60, 16);

    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText(" INSERT COIN", 140, 280);

    globals.ctx.imageSet = new Image();
    globals.ctx.imageSet.src = "./images/C.png";
    globals.ctx.drawImage(globals.ctx.imageSet, 120, 268, 17, 16);

    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("Back", 180, 340);

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

    globals.ctx.font = "16px emulogic";
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("CHAPTER 3", 140, 20);

    globals.ctx.imageSet = new Image();
    globals.ctx.imageSet.src = "./images/forest.webp";
    globals.ctx.drawImage(globals.ctx.imageSet, 20, 20, 180, 130);

    // Draw story content
    globals.storyLinesState.frameCounter++;

    if (globals.storyLinesState.frameCounter >= globals.storyLinesState.speed) {
        
        if (globals.storyLinesState.charIndex < globals.storyLinesState.totalChars) {
            
            globals.storyLinesState.charIndex++;
        }
        globals.storyLinesState.frameCounter = 0;
    }

    // Draw text box
    const boxX = 10;
    const boxY = 180;
    const boxWidth = globals.canvas.width - 15;
    const boxHeight = 180;

    globals.ctx.fillStyle = "white";
    globals.ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
    globals.ctx.strokeStyle = "gray";
    globals.ctx.lineWidth = 2;
    globals.ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

    // Draw animated text
    globals.ctx.font = "8px pokemon";
    globals.ctx.fillStyle = "black";

    drawTypewriterText(
        globals.ctx, 
        globals.storyLines, 
        boxX + 5, 
        boxY + 20, 
        15,
        globals.storyLinesState.charIndex  
    );

    // Back button
    globals.ctx.font = "8px emulogic";
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("Back", 180, 380);

    globals.ctx.imageSet = new Image();
    globals.ctx.imageSet.src = "./images/arrow.png";
    globals.ctx.drawImage(globals.ctx.imageSet, 160, globals.arrow, 16, 16);

    //console.log("STORY - charIndex:", globals.storyLinesState.charIndex, 
            //"totalChars:", globals.storyLinesState.totalChars,
            //"storyLines:", globals.storyLines);
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

    if(globals.coins < 0){
        
        globals.coins = 0;
    }

    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("coins: " + globals.coins, 290, 320);

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

    let scoresList = [];

    for (let i = 0; i < globals.highScoreData.length; i++) {
        scoresList.push(globals.highScoreData[i]);
    }

    //Sort from highest to lowest score
    for (let i = 0; i < scoresList.length - 1; i++) {

        for (let j = 0; j < scoresList.length - 1 - i; j++) {
            
            // Compare scores
            let scoreA = +scoresList[j].score;
            let scoreB = +scoresList[j + 1].score;
            
            // If B is bigger, swap them
            if (scoreA < scoreB) {
                let temp = scoresList[j];
                scoresList[j] = scoresList[j + 1];
                scoresList[j + 1] = temp;
            }
        }
    }

    // Build player name from letters array
    let playerName = "";
    for (let i = 0; i < globals.name.length; i++) {
        playerName = playerName + globals.name[i];
    }

    //Get player score as a number
    let playerScore = +globals.score;

    //player position in the sorted list
    let playerIndex = -1;
    for (let i = 0; i < scoresList.length; i++) {
        
        let listName = scoresList[i].name;
        let listScore = +scoresList[i].score;
        
        // If name AND score match, we found the player
        if (listName === playerName && listScore === playerScore) {
            playerIndex = i;
            break;  // Stop searching
        }
    }

    // max 10
    let indexToShow = [];

    //show Top 3
    for (let i = 0; i < 3; i++) {
        if (i < scoresList.length) {
            indexToShow.push(i);
        }
    }

    // Top 3 + nearby scores
    if (playerIndex >= 3) {
        
        // Show 3 before player, player, and 3 after
        let start = playerIndex - 3;
        if (start < 3) {
            start = 3;
        }
        
        for (let k = 0; k < 7; k++) {
            let idx = start + k;
            
            if (idx < scoresList.length) {
                
                let alreadyAdded = false;

                for (let m = 0; m < indexToShow.length; m++) {

                    if (indexToShow[m] === idx) {

                        alreadyAdded = true;
                        break;
                    }
                }
                
                if (!alreadyAdded) {
                    indexToShow.push(idx);
                }
            }
        }
    }

    // If we still have space, fill with more scores
    for (let i = 0; i < scoresList.length && indexToShow.length < 10; i++) {
        
        let alreadyAdded = false;
        for (let j = 0; j < indexToShow.length; j++) {
            if (indexToShow[j] === i) {
                alreadyAdded = true;
                break;
            }
        }
        
        if (!alreadyAdded) {
            indexToShow.push(i);
        }
    }

    for (let row = 0; row < 10; row++) {
        
        let yPos = 100 + (row * 20); 
        
        if (row < indexToShow.length && indexToShow[row] < scoresList.length) {
            
            let idx = indexToShow[row];
            let data = scoresList[idx];
            
            let position = idx + 1;
            let name = data.name || "---";
            let level = +(data.level || data.stage || 0);
            let score = +data.score;
            
            //color based on position
            if (idx === playerIndex) {
                globals.ctx.fillStyle = "#00FFFF";  // Cyan = YOU 👤
            } else if (row < 3) {
                globals.ctx.fillStyle = "#FFD700";  // Gold = Top 3 🏆
            } else {
                globals.ctx.fillStyle = "lightgray";  // Gray = normal
            }
        
            let text = " " + position + "     " + name + "      " + level + "     " + score;
            globals.ctx.fillText(text, 100, yPos);
            
        } else {
            
            //show empty row
            globals.ctx.fillStyle = "lightgray";
            let text = " " + (row + 1) + "   ---      0     0";
            globals.ctx.fillText(text, 100, yPos);
        }
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

    let scoreList = [];
    for (let i = 0; i < globals.highScoreData.length; i++) {
        scoreList.push(globals.highScoreData[i]);
    }

    for (let i = 0; i < scoreList.length - 1; i++) {
        for (let j = 0; j < scoreList.length - 1 - i; j++) {
            
            // Get the two scores
            let firstScore = +scoreList[j].score;
            let secondScore = +scoreList[j + 1].score;
            
            // If the second score is bigger, swap them
            if (firstScore < secondScore) {
                let temp = scoreList[j];                // Save first in temp
                scoreList[j] = scoreList[j + 1];        // Put second in first place
                scoreList[j + 1] = temp;                // Put temp (old first) in second place
            }
        }
    }

    // Draw the top 10
    for (let row = 0; row < 10; row++) {
        
        let yPosition = 100 + row * 20;
        if (row < scoreList.length) {
            
            // Get the data for this score
            let thisScore = scoreList[row];
            let rank = row + 1;      
            let playerName = thisScore.name;
            let playerScore = thisScore.score;
            let playerLevel = thisScore.level;
            
            if (row < 3) {
                globals.ctx.fillStyle = "#FFD700";
            } else {
                globals.ctx.fillStyle = "lightgray"; 
            }
            
            let textToShow = " " + rank + "     " + playerName + "      " + playerLevel + "     " + playerScore;
            globals.ctx.fillText(textToShow, 100, yPosition);
            
        } else {
            
            globals.ctx.fillStyle = "lightgray";
            let emptyText = " " + (row + 1) + "     ---      0     0";
            globals.ctx.fillText(emptyText, 100, yPosition);
        }
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

    let sorted = [];
    for (let i = 0; i < globals.highScoreData.length; i++) {
        sorted.push(globals.highScoreData[i]);
    }
    
    if (sorted.length > 1) {
        for (let i = 0; i < sorted.length - 1; i++) {
            for (let j = 0; j < sorted.length - 1 - i; j++) {
                let scoreA = +(sorted[j].score || sorted[j].highScore || 0);
                let scoreB = +(sorted[j + 1].score || sorted[j + 1].highScore || 0);
                
                if (scoreA < scoreB) {
                    let temp = sorted[j];
                    sorted[j] = sorted[j + 1];
                    sorted[j + 1] = temp;
                }
            }
        }
    }

    for (let i = 10; i < 20 && i < sorted.length; i++) {
        if (sorted[i]) {
            let highScore = sorted[i];
            let position = i + 1;
            
            let name = highScore.name;
            let score = +(highScore.score);
            let level = +(highScore.level);
            
            globals.ctx.fillStyle = "lightgray";
            globals.ctx.fillText(" " + position + "     " + name + "      " + level + "     " + score, 100, 100 + ((i - 10) * 20));
        }
    }

    //go back to new game
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("RETURN", 300, 330);

    globals.ctx.imageSet = new Image();
    globals.ctx.imageSet.src = "./images/arrow.png";
    globals.ctx.drawImage(globals.ctx.imageSet, 280, globals.arrow, 16, 16);

}

function drawTypewriterText(ctx, lines, x, y, lineHeight, maxChars) {
    
    let lettersShown = 0;

    // Loop through each line of text
    for (let i = 0; i < lines.length; i++) {
        
        if (lettersShown >= maxChars) {
            break;
        }

        let currentLine = lines[i];
        let lettersLeft = maxChars - lettersShown;
        let lettersToShow = Math.min(currentLine.length, lettersLeft);
        
        // Draw the text on screen
        ctx.fillText(currentLine.substring(0, lettersToShow), x, y + (i * lineHeight));
        lettersShown = lettersShown + currentLine.length;
    }
}

function drawGameWin(){

    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);
    globals.ctxHUD_RIGHT.clearRect(0, 0, globals.canvasHUD_RIGHT.width, globals.canvasHUD_RIGHT.height);

    globals.winTextState.frameCounter++;
    
    if (globals.winTextState.frameCounter >= globals.winTextState.speed) {

        if (globals.winTextState.charIndex < globals.winTextState.totalChars) {

            globals.winTextState.charIndex++;
        }
        globals.winTextState.frameCounter = 0;
    }

    globals.ctx.fillStyle = "white";
    globals.ctx.font = "16px emulogic";
    globals.ctx.fillText("YOU WIN!!!", 150, 30);

    const boxX = 10;
    const boxY = 180;
    const boxWidth = globals.canvas.width - 15;
    const boxHeight = 110;
    
    globals.ctx.fillStyle = "white";
    globals.ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
    globals.ctx.strokeStyle = "gray";
    globals.ctx.lineWidth = 2;
    globals.ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

    globals.ctx.font = "8px pokemon";
    globals.ctx.fillStyle = "black";
    
    drawTypewriterText(
        globals.ctx, 
        globals.winStoryLines, 
        boxX + 5, 
        boxY + 20, 
        15,
        globals.winTextState.charIndex
    );

}

function drawPause(){

    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);
    globals.ctxHUD_RIGHT.clearRect(0, 0, globals.canvasHUD_RIGHT.width, globals.canvasHUD_RIGHT.height);

    globals.ctx.font = "16px emulogic";
    globals.ctx.fillStyle = "lightgray";
    globals.ctx.fillText("OPTIONS", 100, 30);
}