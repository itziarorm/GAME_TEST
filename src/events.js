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

        case Key.CONFIRM:
            globals.action.confirm = true;
            break;

        case Key.INSERT_COIN:
            globals.action.insertCoin = true;
            break;

        case Key.MUSIC:
            globals.action.music = true;
            break;

        case Key.INSERT_NAME:
            globals.action.name = true;
            break;

        case Key.DELETE:
            globals.action.delete = true;
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

        case Key.CONFIRM:
            globals.action.confirm = false;
            break;

        case Key.INSERT_COIN:
            globals.action.insertCoin = false;
            break;

        case Key.MUSIC:
            globals.action.music = false;
            break;

        case Key.INSERT_NAME:
            globals.action.name = false;
            break;

        case Key.DELETE:
            globals.action.delete = false;
            break;
    }
}

export function updateEvents(){

    eventKey();
}

export function eventVelocity(sprite){

    if(sprite.isCollidingWithPlayer && globals.velocityTime <= 0){
        
        const player = globals.sprites[0];
        player.physics.vLimit = 60;  // Velocidad aumentada

        globals.originalPlayerVelocity = player.physics.vLimit;

        // Iniciar temporizador de 20 segundos
        globals.velocityTime = 20;
        
    }
}

export function updateVelocityTimer(){
    if(globals.velocityTime > 0){
        
        if(globals.velocityTime <= 0){

            const player = globals.sprites[0];

            if(player && globals.originalPlayerVelocity){

                player.physics.vLimit = globals.originalPlayerVelocity;

            } else {
                
                player.physics.vLimit = 40;
            }
            
            globals.velocityTime = 0;
            globals.originalPlayerVelocity = null;
        }
    }
}

export function eventLife(sprite){

    if(sprite.isCollidingWithPlayer){

        globals.life += 10;

    }
}

export function eventStop(sprite){

    if(sprite.isCollidingWithPlayer && globals.stopTime <= 0){

        // Guardar velocidad original de cada enemigo
        for(let i = 1; i < globals.sprites.length; i++){
            const enemy = globals.sprites[i];
            
            if(!enemy.originalVelocity){
                enemy.originalVelocity = enemy.physics.vLimit;
            }
            
            enemy.physics.vLimit = 0;
        }

        globals.stopTime = 10;
    
    }
}

export function updateStopTimer(){

    if(globals.stopTime > 0){

        globals.stopTime -= globals.deltaTime;

        if(globals.stopTime <= 0){

            for(let i = 1; i < globals.sprites.length; i++){

                const enemy = globals.sprites[i];
                
                if(enemy.originalVelocity){
                    enemy.physics.vLimit = enemy.originalVelocity;
                    enemy.originalVelocity = null;
                } else {
                    enemy.physics.vLimit = 40;
                }
            }

            globals.stopTime = 0;
        }
    }
}

export function eventKey(){

    if (globals.mana >= 138){

        globals.visibleKey = true;
    }

}

export function updateMusic(){

    const buffer = 0.20;
    const music = globals.sounds[Sound.GAME_MUSIC];

    if(music.currentTime > music.duration - buffer){

        music.currentTime = 0;
        music.play();
    }
}