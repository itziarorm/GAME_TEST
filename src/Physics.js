export default class Physics {
    
    constructor(vLimit) {
        
        this.vx = 0; // Horizontal velocity (m/s)
        this.vy = 0; // Vertical velocity (m/s)
        this.vLimit = vLimit; // Velocity max limit (m/s)
    }
}

export class FreePhysics extends Physics{

    constructor(vLimit, velsX, velsY, velChangeValue){

        super(vLimit);

        this.velsX = velsX;
        this.velsY = velsY;
        this.velChangeCounter = 0;
        this.velChangeValue = velChangeValue;
        this.velPos = 0;
    }
}