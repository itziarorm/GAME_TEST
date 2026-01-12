import { Collision } from "./constants.js";

export default class Sprite{

    constructor(id, state, xPos, yPos, imageSet, frames, physics, hitBox){
        
        this.id = id;
        this.state = state;
        this.xPos = xPos;
        this.yPos = yPos;
        this.imageSet = imageSet;
        this.frames = frames;
        this.physics = physics; // Physics object
        this.hitBox = hitBox;
        this.isCollidingWithPlayer = false; // collision with player
        this.isCollidingWithObstacleOnTheTop = false;
        this.isCollidingWithObstacleOnTheLeft = false;
        this.isCollidingWithObstacleOnTheBottom = false;
        this.isCollidingWithObstacleOnTheRight = false;
    }
}

export class Ghost extends Sprite {
    constructor(id, state, xPos, yPos, imageSet, frames, physics, maxTimeToChangeDirection, hitBox) {
        
        //we call the parent class constructor using super()
        super(id, state, xPos, yPos, imageSet, frames, physics, hitBox);
        
        this.directionChangeCounter = 0;                            // Counter to change direction (seconds)
        this.maxTimeToChangeDirection = maxTimeToChangeDirection;   // Max time to change direction (seconds)
    }
}

export class GhostBlue extends Sprite{
    constructor(id, state, xPos, yPos, imageSet, frames, physics, hitBox) {
        
        //we call the parent class constructor using super()
        super(id, state, xPos, yPos, imageSet, frames, physics, hitBox);

        this.collisionBorder = Collision.NO_COLISSION;
    }

}