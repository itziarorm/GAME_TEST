import { Key, Sound } from "./constants.js";
import globals from "./globals.js";
import Timer from "./Timer.js";

export function keydownHandler(event){

    switch(event.keyCode){
        
        case Key.UP:
            globals.action.moveUp = true;
            break;

        case Key.DOWN:
            globals.action.moveDown = true;
            break;

        case Key.LEFT:
            globals.action.moveLeft = true;
            break;

        case Key.RIGHT:
            globals.action.moveRight = true;
            break;

        case Key.CARD:
            globals.action.throwCard = true;
            break;
    }
}

export function keyupHandler(event){

    switch(event.keyCode){

        case Key.UP:
            globals.action.moveUp = false;
            break;

        case Key.DOWN:
            globals.action.moveDown = false;
            break;

        case Key.LEFT:
            globals.action.moveLeft = false;
            break;

        case Key.RIGHT:
            globals.action.moveRight = false;
            break;
            
        case Key.CARD:
            globals.action.throwCard = false;
            break;
    }
}

export function updateEvents(){

    //eventCard(sprite);

    eventKey();
    //eventVelocity(sprite);
}

export function eventVelocity(sprite){

    if(sprite.isCollidingWithPlayer){

        const player = globals.sprites[0];
        player.physics.vLimit = 50; // velocidad aumentada
                
        // Temporizador de 5 segundos para resetear
        globals.speedBoostTimer = new Timer(5, 1);
                
        const idxVel = globals.sprites.indexOf(sprite);
        if (idxVel !== -1) globals.sprites.splice(idxVel, 1);
    }
}

export function eventKey(){

    if (globals.mana >= 10){

        globals.visibleKey = true;
        //globals.hasKey = true;
    }

}

export function eventCard(sprite){

    if(sprite.isCollidingWithPlayer){
        globals.canThrow = true; //el jugador puede lanzar cartas
        const idxCard = globals.sprites.indexOf(sprite);
        if (idxCard !== -1) globals.sprites.splice(idxCard, 1);
    }
}

export function keySelect(event){
    
    switch(event.keyCode){
            
            case Key.UP:
                globals.action.moveUp = true;
                break;

            case Key.DOWN:
                globals.action.moveDown = true;
                break;
            
            case Key.CONFIRM:
                globals.action.confirm = true;
                break;
    }
}

export function updateMusic(){

    const buffer = 0.28;
    const music = globals.sounds[Sound.GAME_MUSIC];

    if(music.currentTime > music.duration - buffer){

        music.currentTime = 0;
        music.play();
    }
}