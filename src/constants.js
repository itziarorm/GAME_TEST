export const Game = {
    INVALID :  -1,  //inicializar
    LOADING:    0,  //cargar archivos, imagenes, sonido
    PLAYING:    1,  //jugando
    GAME_OVER:  2   //estado terminado
};

export const FPS = 30;

//IDENTIFICADOR ID SPRITE
export const SpriteID = {
    
    PLAYER: 0,
    PIRATE: 1,
    JOKER:  2,
    KNIGHT: 3
}

//Identificador de estado de sprite
export const State = {

    UP:     0,
    LEFT:   1,
    DOWN:   2,
    RIGHT:  3,
    STILL_UP:    4,
    STILL_LEFT:  5,
    STILL_DOWN:  6,
    STILL_RIGHT: 7,
    
    //PIRATE
    LEFT_2:  0,
    RIGHT_2: 1,

    //JOKER, KNIGHT
    STILL: 0
}

export const Tile = {

    SIZE_64: 0,
    SIZE_32: 1
}

export const Block = {

    EMPTY:     0,
    VINES:     1,
    BROWN_1:   2,
    BROWN_2:   3,
    DARK_1:    4,
    GRAY:      5,
    CRYSTAL_1: 6,
    CRYSTAL_2: 7
}

export const Key = {

    UP:     87,     //38
    LEFT:   65,     //37
    DOWN:   83,     //40
    RIGHT:  68      //39
}