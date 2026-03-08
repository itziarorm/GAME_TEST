import { Game, storyLines, winStoryLines } from "./constants.js";
import { highScoreData } from "./HighScoreFake.js";

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

    //particles
    particles: [],

    //key
    hasKey: false,
    isDoor: false,
    visibleKey: false,

    //card
    hasCard: false,
    canThrow: true,
    card_cooldown: 0,

    velocityTime: 0,
    stopTime: 0,
    
    //sound
    sounds: [],
    currentSound: -1,

    currentLevel: 0,
    actualLevel: 0,

    keyPosX: 0,
    keyPosY: 0,

    name: [],
    nameKey: "",
    fil: 0,
    col: 0,
    nameIndex: 0,             
    maxNameLength: 3,         
    isNameComplete: false,
    highScoreData: [],

    blinkCounter: 0,
    blinkSpeed: 30,

    cursorX: 0,

    coins: 0,

    winStoryLines: {},
    winTextState: {},

    storyLines: {},
    storyLinesState: {},

    ghost: {},

    playerHistory: [],     
    historyTime: 10,
    
    titleScale: 0,

    loadingImages: [],              // Array para las 40 imágenes precargadas
    loadingAnimFrame: 0,            // Frame actual (0-39)
    loadingAnimCounter: 0,          // Contador para cambiar de frame
    loadingAnimSpeed: 4,            // Velocidad: menor = más rápido (4 = cada 4 frames)
    loadingImagesCount: 40,

    menuImages: [],
    menuAnimFrame: 0,
    menuAnimCounter: 0,
    menuAnimSpeed: 6,
    menuImagesCount: 8,

    playerBlinking: false,    // Estado de parpadeo
    blinkTimer: 0,               // Temporizador de parpadeo
    blinkDuration: 5,            // 5 segundos de parpadeo
    blinkVisible: true,

    originalPlayerVelocity: null
};