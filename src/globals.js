import { Game } from "./constants.js";

export default{

    canvas: {}, //acces to canvas
    ctx:{},     //acces to context
    canvasHUD: {}, //acces to HUD canvas
    ctxHUD:{},     //acces to HUD context
    canvasHUD_RIGHT: {}, //acces to right HUD canvas
    ctxHUD_RIGHT:{},     //acces to right HUD context

    //game states
    gameState: Game.INVALID,

    //latest time loop
    previousCycleMilliseconds: -1,

    //real time in seconds
    deltaTime: 0,

    //time loop in seconds, constant
    frameTimeObj: 0,

    //show data
    txtPruebas: {},

    cycleRealTime: 0,

    //game Time
    gameTime: -1,

    tileSet: {},
    tileSets: [],

    assetsToLoad: [],
    assetsLoaded: 0,

    sprites: [],

    level: {},

    //level timer
    levelTime: {},

    //key pressed states
    action: {},

    score: 0,
    highScore: 0,

    life: 0,
    mana: 0,

    manaFrameY: 0,
    lifeFrameX: 0,
    lifeFrameY: 0,

    arrow: 0,

    particles: [],

    hasKey: false,
    isDoor: false,
    visibleKey: false,

    hasCard: false,
    canThrow: true,
    card_cooldown: 1.5,
      
    speedBoostTimer: null,    
    throwCooldown: 0,          
    throwCooldownMax: 1.5, 

    //sound
    sounds: [],
    currentSound: -1,

    currentLevel: 0
};