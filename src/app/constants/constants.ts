import { Injectable } from '@angular/core';
import { Piece } from '../../pages/chess/chess'

export enum COLORES {
  BLANCA = 'Blanca',
  NEGRA = 'Negra'
  // MARRON = 'Marron'
}

export enum TIPOS {
  PEON = '&#9823;',
  CABALLO = '&#9822;',
  ALFIL = '&#9821;',
  TORRE = '&#9820;',
  REY = '&#9818;',
  REINA = '&#9819;'
}

export const PIEZAS: Piece[] = [
  // BLANCKAS
  {type: TIPOS.PEON, position: [6, 0], color: COLORES.BLANCA, selected: false, attacked: false, points: 1},
  {type: TIPOS.PEON, position: [6, 1], color: COLORES.BLANCA, selected: false, attacked: false, points: 1},
  {type: TIPOS.PEON, position: [6, 2], color: COLORES.BLANCA, selected: false, attacked: false, points: 1},
  {type: TIPOS.PEON, position: [6, 3], color: COLORES.BLANCA, selected: false, attacked: false, points: 1},
  {type: TIPOS.PEON, position: [6, 4], color: COLORES.BLANCA, selected: false, attacked: false, points: 1},
  {type: TIPOS.PEON, position: [6, 5], color: COLORES.BLANCA, selected: false, attacked: false, points: 1},
  {type: TIPOS.PEON, position: [6, 6], color: COLORES.BLANCA, selected: false, attacked: false, points: 1},
  {type: TIPOS.PEON, position: [6, 7], color: COLORES.BLANCA, selected: false, attacked: false, points: 1},
  {type: TIPOS.CABALLO, position: [7, 1], color: COLORES.BLANCA, selected: false, attacked: false, points: 3},
  {type: TIPOS.CABALLO, position: [7, 6], color: COLORES.BLANCA, selected: false, attacked: false, points: 3},
  {type: TIPOS.ALFIL, position: [7, 2], color: COLORES.BLANCA, selected: false, attacked: false, points: 3},
  {type: TIPOS.ALFIL, position: [7, 5], color: COLORES.BLANCA, selected: false, attacked: false, points: 3},
  {type: TIPOS.TORRE, position: [7, 0], color: COLORES.BLANCA, selected: false, attacked: false, points: 5},
  {type: TIPOS.TORRE, position: [7, 7], color: COLORES.BLANCA, selected: false, attacked: false, points: 5},
  {type: TIPOS.REINA, position: [7, 3], color: COLORES.BLANCA, selected: false, attacked: false, points: 9},
  {type: TIPOS.REY, position: [7, 4], color: COLORES.BLANCA, selected: false, attacked: false, points: 100},
  // NEGRAS
  {type: TIPOS.PEON, position: [1, 0], color: COLORES.NEGRA, selected: false, attacked: false, points: 1},
  {type: TIPOS.PEON, position: [1, 1], color: COLORES.NEGRA, selected: false, attacked: false, points: 1},
  {type: TIPOS.PEON, position: [1, 2], color: COLORES.NEGRA, selected: false, attacked: false, points: 1},
  {type: TIPOS.PEON, position: [1, 3], color: COLORES.NEGRA, selected: false, attacked: false, points: 1},
  {type: TIPOS.PEON, position: [1, 4], color: COLORES.NEGRA, selected: false, attacked: false, points: 1},
  {type: TIPOS.PEON, position: [1, 5], color: COLORES.NEGRA, selected: false, attacked: false, points: 1},
  {type: TIPOS.PEON, position: [1, 6], color: COLORES.NEGRA, selected: false, attacked: false, points: 1},
  {type: TIPOS.PEON, position: [1, 7], color: COLORES.NEGRA, selected: false, attacked: false, points: 1},
  {type: TIPOS.CABALLO, position: [0, 1], color: COLORES.NEGRA, selected: false, attacked: false, points: 3},
  {type: TIPOS.CABALLO, position: [0, 6], color: COLORES.NEGRA, selected: false, attacked: false, points: 3},
  {type: TIPOS.ALFIL, position: [0, 2], color: COLORES.NEGRA, selected: false, attacked: false, points: 3},
  {type: TIPOS.ALFIL, position: [0, 5], color: COLORES.NEGRA, selected: false, attacked: false, points: 3},
  {type: TIPOS.TORRE, position: [0, 0], color: COLORES.NEGRA, selected: false, attacked: false, points: 5},
  {type: TIPOS.TORRE, position: [0, 7], color: COLORES.NEGRA, selected: false, attacked: false, points: 5},
  {type: TIPOS.REINA, position: [0, 3], color: COLORES.NEGRA, selected: false, attacked: false, points: 9},
  {type: TIPOS.REY, position: [0, 4], color: COLORES.NEGRA, selected: false, attacked: false, points: 100},
]
