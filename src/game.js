import globals from "./globals.js";
import { initHTMLelements, loadAssets, initSprites, initVars, initLevel, initTimers, initEvents } from "./initialize.js";
import update from "./gameLogic.js";
import render from "./gameRender.js";

//GAME INIT

window.onload = init;

function init(){

    initHTMLelements();

    loadAssets();

    initSprites();

    initVars();

    initLevel();

    initTimers();

    initEvents();

    window.requestAnimationFrame(gameLoop);
}

//--------------
//GAME EXECUTE
//--------------

//BUCLE PRINCIPAL
function gameLoop(timeStamp){

    window.requestAnimationFrame(gameLoop, globals.canvas);
    
    const elapsedCycleSeconds = (timeStamp - globals.previousCycleMilliseconds) / 1000;

    globals.previousCycleMilliseconds = timeStamp;

    globals.deltaTime += elapsedCycleSeconds;

    globals.cycleRealTime += elapsedCycleSeconds;

    if(globals.cycleRealTime >= globals.frameTimeObj){

        //gameLogic.js
        update();

        //gameRender.js
        render();

        globals.cycleRealTime -= globals.frameTimeObj;
        globals.deltaTime = 0;
    }
}