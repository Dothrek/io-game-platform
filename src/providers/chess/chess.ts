import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Piece } from '../../pages/chess/chess'
import { TIPOS, PIEZAS, COLORES } from '../../app/constants/constants'


@Injectable()
export class ChessProvider {

  limits: any = {
    top: 7,
    bottom: 0
  };

  functions: any;

  piezas: Piece[] = PIEZAS;

  puntos: any = {
    blancas: 0,
    negras: 0
  };

  turno: number;
  turnoDecente: COLORES;

  tablero: any;
  historial: any = [];
  historial_p: any = [];

  constructor() {
    this.setFunctions();
    this.turno = 0;
    this.turnoDecente = COLORES.BLANCA;
  }

  undoTurn() {
    if (this.historial.length > 1) {
      this.turno -= 2;
      this.historial.pop();
      this.historial_p.pop();
      this.tablero = this.historial[this.historial.length - 1];
      this.piezas = this.historial_p[this.historial_p.length - 1];
      this.changeTurn(true);
    }
  }

  public changeTurn(back?: boolean) {
    this.turno += 1;
    let multiplier = back ? Object.keys(COLORES).length - 1 : 1;
    let position = (<any>Object).values(COLORES).indexOf(this.turnoDecente);
    this.turnoDecente = COLORES[Object.keys(COLORES)[Math.abs((position + multiplier)) % Object.keys(COLORES).length]];
  }

  private setFunctions() {
    this.functions = {}
    this.functions[TIPOS.PEON] = this.movimientosPeon
    this.functions[TIPOS.CABALLO] = this.movimientosCaballo
    this.functions[TIPOS.ALFIL] = this.movimientosAlfil
    this.functions[TIPOS.TORRE] = this.movimientosTorre
    this.functions[TIPOS.REY] = this.movimientosRey
    this.functions[TIPOS.REINA] = this.movimientosReina
  }

  paintBoard() {
    let piezas = this.piezas;
    this.tablero = [];

    for (let i = 0; i <= this.limits.top; i++) {
      this.tablero.push([]);
      for (let j = 0; j <= this.limits.top; j++) {
        this.tablero[i].push({});
      }
    }

    for (let i = 0; i < piezas.length; i++) {
      let columna = piezas[i].position[0];
      let fila = piezas[i].position[1];
      this.tablero[columna][fila] = piezas[i];
    }

    if (this.historial.length === 0) {
        this.historial_p.push(JSON.parse(JSON.stringify(this.piezas)));
        this.historial.push(JSON.parse(JSON.stringify(this.tablero)));
    }

    return this.tablero;
  }

  pointsCapture(piece) {
    let tipo = piece.color === COLORES.BLANCA ? 'negras' : 'blancas';
    this.puntos[tipo] += piece.points;
    return this.puntos;
  }

  getRange(piece) {
    let possible_movs = this.functions[piece.type].bind(this)(piece);

    return possible_movs;
  }

  checkTurnDecente(piece) {
    return piece.color === this.turnoDecente;
  }

  movimientosPeon(piece) {
    let multiplier = piece.color === COLORES.BLANCA ? -1 : 1;
    let movs = [[piece.position[0] + multiplier, piece.position[1]]];

    if ((piece.position[0] === 6 && piece.color === COLORES.BLANCA) || (piece.position[0] === 1 && piece.color === COLORES.NEGRA)) {
      movs.push([piece.position[0] + (2 * multiplier), piece.position[1]]);
    }

    movs = movs.filter(pos => !this.tablero[pos[0]][pos[1]].position);

    movs = [...movs, [-1, 1].map(lr => {
      let pp = this.tablero[piece.position[0] + multiplier][piece.position[1] + lr];
      if (pp && pp.position) {
        movs.push([piece.position[0] + multiplier, piece.position[1] + lr]);
      }
    })];

    return movs.filter(pos => this.inside(pos));
  }

  movimientosCaballo(piece) {
    return [
      [piece.position[0] - 1, piece.position[1] + 2],
      [piece.position[0] - 1, piece.position[1] - 2],
      [piece.position[0] - 2, piece.position[1] + 1],
      [piece.position[0] - 2, piece.position[1] - 1],
      [piece.position[0] + 1, piece.position[1] + 2],
      [piece.position[0] + 1, piece.position[1] - 2],
      [piece.position[0] + 2, piece.position[1] + 1],
      [piece.position[0] + 2, piece.position[1] - 1],
    ].filter(pos => this.inside(pos));
  }

  private inside(position) {
    return position[0] < (this.limits.top + 1)
      && position[0] > (this.limits.bottom - 1)
      && position[1] < (this.limits.top + 1)
      && position[1] > (this.limits.bottom - 1)
  }

  movimientosAlfil(piece) {
    return this.possibleMovs(piece, [[1, 1], [-1, -1], [-1, 1], [1, -1]]);
  }

  movimientosTorre(piece) {
    return this.possibleMovs(piece, [[-1, 0], [1, 0], [0, 1], [0, -1]]);
  }

  private possibleMovs(piece, directions) {
    let movs = [];
    let aux_pos = null

    for (let i = 1; i <= 7; i++) {
      for (let j = 0; j < directions.length; j++) {
        aux_pos = [Number(piece.position[0]) + (directions[j][0] * i), Number(piece.position[1]) + (directions[j][1] * i)]

        if (directions[j]) {
          if (this.inside(aux_pos)) {
            movs.push(aux_pos);
            let p_pieza = this.tablero[aux_pos[0]][aux_pos[1]];

            if (p_pieza.type) {
              directions[j] = false;
            }
          } else {
            directions[j] = false;
          }
        }
      }
    }

    return movs;
  }

  movimientosRey(piece) {
    return [
      [piece.position[0], piece.position[1] + 1],
      [piece.position[0], piece.position[1] - 1],
      [piece.position[0] + 1, piece.position[1]],
      [piece.position[0] - 1, piece.position[1]],
      [piece.position[0] + 1, piece.position[1] + 1],
      [piece.position[0] - 1, piece.position[1] - 1],
      [piece.position[0] - 1, piece.position[1] + 1],
      [piece.position[0] + 1, piece.position[1] - 1]
    ].filter(pos => this.inside(pos));
  }

  movimientosReina(piece) {
    return [...this.movimientosTorre(piece), ...this.movimientosAlfil(piece)];
  }

  getOwnKing(color) {
    for (let i = 0; i < this.piezas.length; i++) {
      if (this.piezas[i].color === color && this.piezas[i].type === TIPOS.REY) {
        return this.piezas[i];
      }
    }
  }

  attackedKing(piece) {
    let king = this.getOwnKing(piece.color);
    let movs_p = this.movimientosPeon(king);
    let mp = movs_p.filter(pos => this.isAttacked(king, [TIPOS.PEON], pos));
    let movs_t = this.movimientosTorre(king);
    let mt = movs_t.filter(pos => this.isAttacked(king, [TIPOS.TORRE], pos));
    let movs_a = this.movimientosAlfil(king);
    let ma = movs_a.filter(pos => this.isAttacked(king, [TIPOS.ALFIL], pos));
    let movs_r = this.movimientosReina(king);
    let mr = movs_r.filter(pos => this.isAttacked(king, [TIPOS.REINA], pos));
    console.table({movs_p, movs_t, movs_a, movs_r});
    return [...mt, ...mp, ...ma, ...mr].filter(m => this.tablero[m[0]][m[1]].position).length > 0;
  }

  isAttacked(piece, types, pos) {
    let p_pieza = this.tablero[pos[0]][pos[1]];
    return p_pieza.position && p_pieza.color !== piece.color && types.indexOf(p_pieza.type) != -1;
  }

}
