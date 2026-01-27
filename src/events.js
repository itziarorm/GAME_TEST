import { Key } from "./constants.js";
import globals from "./globals.js";

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

export function updateEvents(sprite){

    if(sprite.isCollidingWithPlayer) {

        //si toca la carta puede disparar durante 30 segundos
    }

    if (globals.mana >= 30){

        //la llave se ve y puede abrir la puerta
    }

    if(sprite.isCollidingWithPlayer){

        //si toca la pocion va más rápido durante unos segundos / los enemigos se paran
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