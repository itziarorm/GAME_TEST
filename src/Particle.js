class Particle {

    constructor(id, state, xPos, yPos, radius, alpha, physics){

        this.id = id;
        this.state = state;
        this.xPos = xPos;
        this.yPos = yPos;
        this.radius = radius;
        this.alpha = alpha;
        this.physics = physics;

    }
}

class ExplosionParticle extends Particle{

    constructor(id, state, xPos, yPos, radius, alpha, physics, timeToFade){
        
        super(id, state, xPos, yPos, radius, alpha, physics);

        this.fadeCounter = 0;
        this.timeToFade = timeToFade;

    }
}

class FireParticle extends Particle{

    constructor(id, state, xPos, yPos, radius, alpha, physics){
        
        super(id, state, xPos, yPos, radius, alpha, physics);
    }
}

class LiquidParticle extends Particle{

    constructor(id, state, xPos, yPos, radius, alpha, physics){
        
        super(id, state, xPos, yPos, radius, alpha, physics);
    }
}

export {

    ExplosionParticle,
    FireParticle,
    LiquidParticle
}