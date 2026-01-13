export const Game = {
    INVALID :  -1,  //inicializar
    LOADING:    0,  //cargar archivos, imagenes, sonido
    PLAYING:    1,  //jugando
    GAME_OVER:  2   //estado terminado
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
}

//Identificador de estado de sprite
export const State = {
    
    DOWN:        0,
    UP:          1,
    LEFT:        2,
    RIGHT:       3,
    STILL_UP:    4,
    STILL_LEFT:  5,
    STILL_DOWN:  6,
    STILL_RIGHT: 7,
    THROW_CARD: 8,

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
    STILL: 0,
}

export const Tile = {

    SIZE_16: 0,
    SIZE_8: 1
}

export const Block = {

    EMPTY:     0,
    DOOR:      12,
    KEY:       13,
    SPIKES:    14,
    EXIT:      15,
    FLOOR:     16,
    PLATFORM:  17,

    //create array for the collision

    START_BLOCK: 1,
    END_BLOCK: 11,
}

export const Key = {

    UP:     87,     //w
    LEFT:   65,     //a
    DOWN:   83,     //s
    RIGHT:  68,     //d
    CARD:   69      //e
}

export const Collision = {

    NO_COLISSION: -1,
    BORDER_UP: 0,
    BORDER_DOWN: 1,
    BORDER_LEFT: 2,
    BORDER_RIGHT: 3
}