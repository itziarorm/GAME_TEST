export default class Sprite{

    constructor(id, state, xPos, yPos, imageSet, frames, physics){
        
        this.id = id;
        this.state = state;
        this.xPos = xPos;
        this.yPos = yPos;
        this.imageSet = imageSet;
        this.frames = frames;
        this.physics = physics; // Physics object
    }
}

export class Pirate extends Sprite {
    constructor(id, state, xPos, yPos, imageSet, frames, physics, maxTimeToChangeDirection) {
        
        //we call the parent class constructor using super()
        super(id, state, xPos, yPos, imageSet, frames, physics);
        
        this.directionChangeCounter = 0;                            // Counter to change direction (seconds)
        this.maxTimeToChangeDirection = maxTimeToChangeDirection;   // Max time to change direction (seconds)
    }
}