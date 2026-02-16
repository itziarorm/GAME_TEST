export const Game = {
    INVALID :  -1,  //inicializar
    LOADING:    0,  //cargar archivos, imagenes, sonido
    PLAYING:    1,  //jugando
    GAME_OVER:  2,   //estado terminado
    NEW_GAME:   3,
    STORY:      4,
    CONTROLS:   5,
    DASHBOARD:  6,
    LOAD_LEVEL1: 7,
    LOAD_LEVEL2: 8,
    HIGHSCORE: 9,
    HIGHSCORE_TOP: 10
};

export const FPS = 30;

//IDENTIFICADOR ID SPRITE
export const SpriteID = {
    
    PLAYER:     0,
    GHOST:      1,
    YELLOW:     2,
    ORANGE:     3,
    BLUE:       4,
    POTION:     5,
    CARD:       6,
    POINTS:     7,
    DOOR:       8,
    KEY:        9,
    CARDS:      10,
    POTION_VELOCITY:     11,
    POTION_STOP:        12
}

//Identificador de estado de sprite
export const State = {
    
    DOWN:        0,
    UP:          1,
    LEFT:        2,
    RIGHT:       3,
    STILL_UP:    6,
    STILL_LEFT:  7,
    STILL_DOWN:  5,
    STILL_RIGHT: 8,
    COLLISION:   4, 
    THROW_CARD:  9,

    //ghost
    UP_2: 0,
    LEFT_2:  1,
    RIGHT_2: 2,
    DOWN_2: 3,

    //YELLOW GHOST
    UP_3: 0,
    LEFT_3: 1,
    RIGHT_3: 2,
    DOWN_3: 3,

    //ORANGE GHOST
    UP_4: 0,
    LEFT_4: 1,
    RIGHT_4: 2,
    DOWN_4: 3,

    //BLUE GHOST
    UP_5: 0,
    LEFT_5: 1,
    RIGHT_5: 2,
    DOWN_5: 3,

    //POTION
    STILL: 0
}

export const Tile = {

    SIZE_16: 0,
    SIZE_12: 1
}

export const Block = {

    EMPTY:     0,
    VINES:     1,
    BROWN_1:   2,
    BROWN_2:   3,
    DARK_1:    4,
    GRAY:      5,
    CRYSTAL_1: 6,
    CRYSTAL_2: 7,
    WALL:      8,
    FLOWER:    9,
    CEIL:      10,
    PATH:      11,
    DOOR:      12,
    KEY:       13,
    SPIKES:    14,
    EXIT:      15,
    FLOOR:     16,
    PLATFORM:  17

    //create array for the collision
}

export const BlockIDs = [
    Block.VINES,
    Block.BROWN_1,
    Block.BROWN_2,
    Block.DARK_1,
    Block.GRAY,
    Block.CRYSTAL_1,
    Block.CRYSTAL_2,
    Block.WALL,
    Block.FLOWER,
    Block.CEIL,
    Block.PATH,
    Block.KEY,
    Block.SPIKES,
    Block.EXIT,
    Block.FLOOR,
    Block.PLATFORM,
]

export const Key = {

    UP:     87,       //w
    LEFT:   65,       //a
    DOWN:   83,       //s
    RIGHT:  68,       //d
    CARD:   69,       //e
    CONFIRM: 13,      //enter
    INSERT_COIN: 67,  //c
    MUSIC:   77,      //m
    NO_MUSIC: 78      //n
}

export const Collision = {

    NO_COLISSION: -1,
    BORDER_UP: 0,
    BORDER_DOWN: 1,
    BORDER_LEFT: 2,
    BORDER_RIGHT: 3
}

export const ParticleId = {
    
    EXPLOSION: 0,
    FIRE: 1,
    LIQUID: 2
}

export const ParticleState = {

    ON: 0,
    FADE: 1,
    OFF:-1
}

//Sounds
export const Sound = {

    NO_SOUND: -1,
    GAME_MUSIC: 0,
    SHOOT:1,
    HURT:2,
    POWER_UP:3
}

export const Levels = {

    LEVEL1: 0,
    LEVEL2: 1
}

//To do: create array with the positions of the blocks that are free to move
export const RandomFreePositions = 
[
        [10, 36],   [95, 30],   [200, 36],
        [10, 60],   [80, 180],  [160, 290],
        [10, 80],   [250, 200], [120, 140],
        [40, 80],   [220, 140], [280, 160],
        [50, 220],  [140, 240], [220, 240],
        [180, 240], [115, 336], [205, 336],
        [280, 308], [160, 320]
];

export const PositionsLevel2 = 
[
        [10, 36],   [95, 30],   [200, 36],
        [10, 60],   [80, 180],  [160, 290],
        [10, 80],   [250, 200], [120, 140],
        [40, 80],   [220, 140], [280, 160],
        [50, 220],  [140, 240], [220, 240],
        [180, 240], [115, 336], [205, 336],
        [280, 308], [160, 320]
];