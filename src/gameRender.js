import globals from "./globals.js";
import { Game, Tile } from "./constants.js";

export default function render(){

    switch(globals.gameState){

        case Game.LOADING:
            
            //Draw loading spinner
            
            break;

        case Game.PLAYING:
            
            drawGame();
            
            break;

        default:
            console.error("ERROR: Game State invalid");
    }
}

function drawGame(){

    //to complete

    //clear canvases
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);

    renderMap();

    //draw sprites
    drawSprites();

    //draw HUD
    renderHUD();

}

function renderSprite(sprite){

    const xPosInit = sprite.imageSet.initCol * sprite.imageSet.gridSize;
    const yPosInit = sprite.imageSet.initFil * sprite.imageSet.gridSize;

    const xTile = xPosInit + sprite.frames.frameCounter * sprite.imageSet.gridSize + sprite.imageSet.xOffset;
    const yTile = yPosInit + sprite.state * sprite.imageSet.gridSize + sprite.imageSet.yOffset;

    const xPos = Math.floor(sprite.xPos);
    const yPos = Math.floor(sprite.yPos);

    globals.ctx.drawImage(
        globals.tileSets[Tile.SIZE_64],
        xTile, yTile,
        sprite.imageSet.xSize, sprite.imageSet.ySize,
        xPos, yPos,
        sprite.imageSet.xSize, sprite.imageSet.ySize
    );
}

function drawSprites(){

    for(let i = 0; i < globals.sprites.length; ++i){

        const sprite = globals.sprites[i];

        drawSpriteRectangle(sprite);

        renderSprite(sprite);
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

                globals.tileSets[Tile.SIZE_32],
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
    const score = 1500;
    const highScore = 130000;
    const life = 40;
    const time = globals.levelTime.value;

    //Draw score
    globals.ctxHUD.font = "8px emulogic";
    globals.ctxHUD.fillStyle = "lightblue";
    globals.ctxHUD.fillText("SCORE", 8, 8);
    globals.ctxHUD.fillStyle = "lightgray";
    globals.ctxHUD.fillText(" " + score, 8, 16);

    //Draw high score
    globals.ctxHUD.fillStyle = "lightblue";
    globals.ctxHUD.fillText("HIGH SCORE", 72, 8);
    globals.ctxHUD.fillStyle = "lightgray";
    globals.ctxHUD.fillText(" " + highScore, 72, 16);

    //Draw life
    globals.ctxHUD.fillStyle = "lightblue";
    globals.ctxHUD.fillText("LIFE", 168, 8);
    globals.ctxHUD.fillStyle = "lightgray";
    globals.ctxHUD.fillRect(168, 9, life, 8);

    globals.ctxHUD.fillStyle = "black";
    globals.ctxHUD.fillRect(168, 9, 1, 1);
    globals.ctxHUD.fillRect(168, 15, 1, 1);
    globals.ctxHUD.fillRect(168 + life - 1, 9, 1, 1);
    globals.ctxHUD.fillRect(168 + life - 1, 15, 1, 1);

    //Draw time
    globals.ctxHUD.fillStyle = "lightblue";
    globals.ctxHUD.fillText("TIME", 224, 8);
    globals.ctxHUD.fillStyle = "lightgray";
    globals.ctxHUD.fillText(time, 224, 16);
}