import globals from "./globals.js";
import { Block, BlockIDs, State } from "./constants.js";

export default function detectCollision(){

    for(let i = 1; i < globals.sprites.length; ++i){

        const sprite = globals.sprites[i];
        detectCollisionBetweenPlayerAndSprite(sprite);
        //detectCollisionBetweenCardAndSprite(sprite);
    }

    detectCollisionBetweenPlayerAndMapObstacles();

    detectCollisionBetweenGhostAndMapObstacles();

    detectCollisionBetweenGhostYellowAndMapObstacles();

    detectCollisionBetweenGhostOrangeAndMapObstacles();

    //detectCollisionBetweenGhostBlueAndMapObstacles();
}

function detectCollisionBetweenPlayerAndSprite(sprite){

    sprite.isCollidingWithPlayer = false;

    const player = globals.sprites[0];

    const x1 = player.xPos + player.hitBox.xOffset;
    const y1 = player.yPos + player.hitBox.yOffset;
    const w1 = player.hitBox.xSize;
    const h1 = player.hitBox.ySize;

    const x2 = sprite.xPos + sprite.hitBox.xOffset;
    const y2 = sprite.yPos + sprite.hitBox.yOffset;
    const w2 = sprite.hitBox.xSize;
    const h2 = sprite.hitBox.ySize;

    const isOverlap = rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2);
    
    if (isOverlap){

        sprite.isCollidingWithPlayer = true;
        //player.state = State.COLLISION;
    }
}

function detectCollisionBetweenCardAndSprite(sprite){

    sprite.isCollidingWithCard = false;

    const player = globals.sprites[10];

    const x1 = player.xPos + player.hitBox.xOffset;
    const y1 = player.yPos + player.hitBox.yOffset;
    const w1 = player.hitBox.xSize;
    const h1 = player.hitBox.ySize;

    const x2 = sprite.xPos + sprite.hitBox.xOffset;
    const y2 = sprite.yPos + sprite.hitBox.yOffset;
    const w2 = sprite.hitBox.xSize;
    const h2 = sprite.hitBox.ySize;

    const isOverlap = rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2);
    
    if (isOverlap){

        sprite.isCollidingWithCard = true;
    }
}

function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2){

    let isOverlap;

    if(x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2){

        isOverlap = false;
    }
    else{

        isOverlap = true;
    }

    return isOverlap;
}

function getMapTileId(xPos, yPos){

    const brickSize = globals.level.imageSet.gridSize;
    const levelData = globals.level.data;

    const fil = Math.floor(yPos / brickSize);
    const col = Math.floor(xPos / brickSize);

    return levelData[fil][col];
}

function isCollidingWithObstacleAt(xPos, yPos, obstacleIds){

    let isColliding;

    const id = getMapTileId(xPos, yPos);

    //change to all the collision blocks

    for (let i = 0; i < obstacleIds.length; i++) {
        if (id === obstacleIds[i]) {
            isColliding = true;
            break;
        }
    }

    return isColliding;
}

function detectCollisionBetweenPlayerAndMapObstacles(){

    const player = globals.sprites[0];

    player.isCollidingWithObstacleOnTheRight = false;
    player.isCollidingWithObstacleOnTheLeft = false;
    player.isCollidingWithObstacleOnTheUp = false;
    player.isCollidingWithObstacleOnTheDown = false;

    let xPos;
    let yPos;
    let isCollidingOnPos1;
    let isCollidingOnPos2;
    let isCollidingOnPos3;
    let isColliding;
    let overlap;

    const brickSize = globals.level.imageSet.gridSize;
    const direction = player.state;

    const obstacleIds = BlockIDs;

    switch(direction){

        case State.RIGHT:

            xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize - 1;
            yPos = player.yPos + player.hitBox.yOffset;
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstacleIds);

            yPos = player.yPos + player.hitBox.yOffset + brickSize;
            isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos, obstacleIds);

            yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - 1;
            isCollidingOnPos3 = isCollidingWithObstacleAt(xPos,yPos, obstacleIds);

            isColliding = isCollidingOnPos1 || isCollidingOnPos2 || isCollidingOnPos3;

            if(isColliding){

                player.isCollidingWithObstacleOnTheRight = true;

                overlap = Math.floor(xPos) % brickSize + 1;
                player.xPos -= overlap;
            }

            break;

        case State.LEFT:

            xPos = player.xPos + player.hitBox.xOffset;
            yPos = player.yPos + player.hitBox.yOffset;
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstacleIds);

            yPos = player.yPos + player.hitBox.yOffset + brickSize;
            isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos, obstacleIds);

            yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - 1;
            isCollidingOnPos3 = isCollidingWithObstacleAt(xPos,yPos, obstacleIds);

            isColliding = isCollidingOnPos1 || isCollidingOnPos2 || isCollidingOnPos3;

            if(isColliding){

                player.isCollidingWithObstacleOnTheLeft = true;

                overlap = brickSize - Math.floor(xPos) % brickSize;
                player.xPos += overlap;
            }

            break;

        case State.DOWN:

            yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - 1;
            xPos = player.xPos + player.hitBox.xOffset;
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstacleIds);

            xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize - 1;
            isCollidingOnPos3 = isCollidingWithObstacleAt(xPos,yPos, obstacleIds);

            isColliding = isCollidingOnPos1 || isCollidingOnPos3;

            if(isColliding){

                player.isCollidingWithObstacleOnTheDown = true;

                overlap = Math.floor(yPos) % brickSize + 1;
                player.yPos -= overlap;
            }

            break;

        case State.UP:

            yPos = player.yPos + player.hitBox.yOffset;
            xPos = player.xPos + player.hitBox.xOffset;
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstacleIds);

            xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize - 1;
            isCollidingOnPos3 = isCollidingWithObstacleAt(xPos,yPos, obstacleIds);

            isColliding = isCollidingOnPos1 || isCollidingOnPos3;

            if(isColliding){

                player.isCollidingWithObstacleOnTheUp = true;

                overlap = brickSize - Math.floor(yPos) % brickSize;
                player.yPos += overlap;
            }

            break;
        
        default:
        
            break;
    }
}

function detectCollisionBetweenGhostAndMapObstacles(){

    const player = globals.sprites[1];

    player.isCollidingWithObstacleOnTheRight = false;
    player.isCollidingWithObstacleOnTheLeft = false;

    let xPos;
    let yPos;
    let isCollidingOnPos1;
    let isCollidingOnPos2;
    let isCollidingOnPos3;
    let isColliding;
    let overlap;

    const brickSize = globals.level.imageSet.gridSize;
    const direction = player.state;

    const obstacleIds = BlockIDs;

    switch(direction){

        case State.RIGHT_2:

            xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize - 1;
            yPos = player.yPos + player.hitBox.yOffset;
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstacleIds);

            yPos = player.yPos + player.hitBox.yOffset + brickSize;
            isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos, obstacleIds);

            yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - 1;
            isCollidingOnPos3 = isCollidingWithObstacleAt(xPos,yPos, obstacleIds);

            isColliding = isCollidingOnPos1 || isCollidingOnPos2 || isCollidingOnPos3;

            if(isColliding){

                player.isCollidingWithObstacleOnTheRight = true;

                overlap = Math.floor(xPos) % brickSize + 1;
                player.xPos -= overlap;
            }

            break;

        case State.LEFT_2:

            xPos = player.xPos + player.hitBox.xOffset;
            yPos = player.yPos + player.hitBox.yOffset;
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstacleIds);

            yPos = player.yPos + player.hitBox.yOffset + brickSize;
            isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos, obstacleIds);

            yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - 1;
            isCollidingOnPos3 = isCollidingWithObstacleAt(xPos,yPos, obstacleIds);

            isColliding = isCollidingOnPos1 || isCollidingOnPos2 || isCollidingOnPos3;

            if(isColliding){

                player.isCollidingWithObstacleOnTheLeft = true;

                overlap = brickSize - Math.floor(xPos) % brickSize;
                player.xPos += overlap;
            }

            break;
        
        default:
        
            break;
    }
}

function detectCollisionBetweenGhostYellowAndMapObstacles(){

    const player = globals.sprites[2];

    player.isCollidingWithObstacleOnTheUp = false;
    player.isCollidingWithObstacleOnTheDown = false;

    let xPos;
    let yPos;
    let isCollidingOnPos1;
    let isCollidingOnPos2;
    let isCollidingOnPos3;
    let isColliding;
    let overlap;

    const brickSize = globals.level.imageSet.gridSize;
    const direction = player.state;

    const obstacleIds = BlockIDs;

    switch(direction){

        case State.DOWN_3:

            yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - 1;
            xPos = player.xPos + player.hitBox.xOffset;
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstacleIds);

            xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize - 1;
            isCollidingOnPos3 = isCollidingWithObstacleAt(xPos,yPos, obstacleIds);

            isColliding = isCollidingOnPos1 || isCollidingOnPos3;

            if(isColliding){

                player.isCollidingWithObstacleOnTheDown = true;

                overlap = Math.floor(yPos) % brickSize + 1;
                player.yPos -= overlap;
            }

            break;

        case State.UP_3:

            yPos = player.yPos + player.hitBox.yOffset;
            xPos = player.xPos + player.hitBox.xOffset;
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstacleIds);

            xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize - 1;
            isCollidingOnPos3 = isCollidingWithObstacleAt(xPos,yPos, obstacleIds);

            isColliding = isCollidingOnPos1 || isCollidingOnPos3;

            if(isColliding){

                player.isCollidingWithObstacleOnTheUp = true;

                overlap = brickSize - Math.floor(yPos) % brickSize;
                player.yPos += overlap;
            }

            break;
        
        default:
        
            break;
    }
}

function detectCollisionBetweenGhostOrangeAndMapObstacles(){

    const player = globals.sprites[3];

    player.isCollidingWithObstacleOnTheRight = false;
    player.isCollidingWithObstacleOnTheLeft = false;
    player.isCollidingWithObstacleOnTheUp = false;
    player.isCollidingWithObstacleOnTheDown = false;

    let xPos;
    let yPos;
    let isCollidingOnPos1;
    let isCollidingOnPos2;
    let isCollidingOnPos3;
    let isColliding;
    let overlap;

    const brickSize = globals.level.imageSet.gridSize;
    const direction = player.state;

    const obstacleIds = BlockIDs;

    switch(direction){

        case State.RIGHT_4:

            xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize - 1;
            yPos = player.yPos + player.hitBox.yOffset;
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstacleIds);

            yPos = player.yPos + player.hitBox.yOffset + brickSize;
            isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos, obstacleIds);

            yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - 1;
            isCollidingOnPos3 = isCollidingWithObstacleAt(xPos,yPos, obstacleIds);

            isColliding = isCollidingOnPos1 || isCollidingOnPos2 || isCollidingOnPos3;

            if(isColliding){

                player.isCollidingWithObstacleOnTheRight = true;

                overlap = Math.floor(xPos) % brickSize + 1;
                player.xPos -= overlap;
            }

            break;

        case State.LEFT_4:

            xPos = player.xPos + player.hitBox.xOffset;
            yPos = player.yPos + player.hitBox.yOffset;
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstacleIds);

            yPos = player.yPos + player.hitBox.yOffset + brickSize;
            isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos, obstacleIds);

            yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - 1;
            isCollidingOnPos3 = isCollidingWithObstacleAt(xPos,yPos, obstacleIds);

            isColliding = isCollidingOnPos1 || isCollidingOnPos2 || isCollidingOnPos3;

            if(isColliding){

                player.isCollidingWithObstacleOnTheLeft = true;

                overlap = brickSize - Math.floor(xPos) % brickSize;
                player.xPos += overlap;
            }

            break;

        case State.DOWN_4:

            yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - 1;
            xPos = player.xPos + player.hitBox.xOffset;
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstacleIds);

            xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize - 1;
            isCollidingOnPos3 = isCollidingWithObstacleAt(xPos,yPos, obstacleIds);

            isColliding = isCollidingOnPos1 || isCollidingOnPos3;

            if(isColliding){

                player.isCollidingWithObstacleOnTheDown = true;

                overlap = Math.floor(yPos) % brickSize + 1;
                player.yPos -= overlap;
            }

            break;

        case State.UP_4:

            yPos = player.yPos + player.hitBox.yOffset;
            xPos = player.xPos + player.hitBox.xOffset;
            isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, obstacleIds);

            xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize - 1;
            isCollidingOnPos3 = isCollidingWithObstacleAt(xPos,yPos, obstacleIds);

            isColliding = isCollidingOnPos1 || isCollidingOnPos3;

            if(isColliding){

                player.isCollidingWithObstacleOnTheUp = true;

                overlap = brickSize - Math.floor(yPos) % brickSize;
                player.yPos += overlap;
            }

            break;
        
        default:
        
            break;
    }
}

function detectCollisionBetweenGhostBlueAndMapObstacles(){

    const player = globals.sprites[4];

    player.isCollidingWithObstacleOnTheRight = false;
    player.isCollidingWithObstacleOnTheLeft = false;
    player.isCollidingWithObstacleOnTheUp = false;
    player.isCollidingWithObstacleOnTheDown = false;

    let xPos;
    let yPos;
    let isCollidingOnPos1;
    let isCollidingOnPos2;
    let isCollidingOnPos3;
    let isColliding;
    let overlap;

    const brickSize = globals.level.imageSet.gridSize;
    const direction = player.state;

    const obstacleIds = BlockIDs;

    

}