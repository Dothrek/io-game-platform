import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TIPOS, COLORES } from '../../app/constants/constants'
import { ChessProvider } from '../../providers/chess/chess'
/**
 * Generated class for the ChessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface Piece {
  type: TIPOS,
  position: Array<number>,
  color: COLORES,
  selected: boolean,
  attacked: boolean,
  movable?: boolean,
  points: number
}

@IonicPage()
@Component({
  selector: 'page-chess',
  templateUrl: 'chess.html',
})
export class ChessPage {

  tablero: any;
  selected_piece: Piece = null;

  capturas: any = {
    blancas: [],
    negras: []
  };

  puntos: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private chessSrv: ChessProvider
  ) {
    let t = "tcarqact,pppppppp,........,........,........,........,PPPPPPPP,TCARQACT";
  }

  buildTablero(t) {
    // que pinte de esta manera
  }

  undoTurn() {
    this.chessSrv.undoTurn();
    this.selected_piece = null;
    this.clearPotentialMovs();

    setTimeout(() => {
      this.tablero = this.chessSrv.tablero;
    }, 0);

    console.log(this.chessSrv.historial)
  }

  next() {
    this.chessSrv.changeTurn();
    this.tablero = this.chessSrv.tablero;
  }

  ionViewDidLoad() {
    this.tablero = this.chessSrv.paintBoard();
  }

  passPiece(casilla: any) {
    if (casilla.type) {
      if (casilla.attacked) {
        if (this.chessSrv.checkTurnDecente(this.selected_piece)) {
          if (this.moverPiece(casilla)) {
            this.capturar(casilla);
            this.chessSrv.changeTurn();
          } else {
            this.selected_piece = null;
          }
          this.clearPotentialMovs();
        }

      } else {
        this.selected_piece = casilla;
        if (this.chessSrv.checkTurnDecente(this.selected_piece)) {
          let movs = this.chessSrv.getRange(casilla)
          this.colorBoard(casilla, movs);
        }
      }
    } else if (casilla.movable && this.chessSrv.checkTurnDecente(this.selected_piece)) {
      if (this.moverPiece(casilla)) {
        this.chessSrv.changeTurn();
      } else {
        this.selected_piece = null;
      }
      this.clearPotentialMovs();

    } else {
      this.colorBoard(casilla, []);
    }
  }

  capturar(pieza) {
    let tipo = pieza.color === COLORES.BLANCA ? 'blancas' : 'negras';
    this.capturas[tipo].push(pieza);
    this.puntos = this.chessSrv.pointsCapture(pieza);
  }

  moverPiece(piece) {
    let { position } = piece;
    let origin = this.selected_piece.position;

    this.tablero[this.selected_piece.position[0]][this.selected_piece.position[1]] = {};
    this.tablero[position[0]][position[1]] = this.selected_piece;
    this.tablero[position[0]][position[1]].position = position;

    let atacado = this.chessSrv.attackedKing(this.tablero[position[0]][position[1]]);

    if (!atacado) {
      this.selected_piece = null;
      this.chessSrv.historial.push(JSON.parse(JSON.stringify(this.tablero)));
      this.chessSrv.historial_p.push(JSON.parse(JSON.stringify(this.chessSrv.piezas)));

    } else {
      this.tablero[position[0]][position[1]] = piece;
      this.tablero[origin[0]][origin[1]] = this.selected_piece;
      this.tablero[origin[0]][origin[1]].position = origin;
    }

    return !atacado;
  }

  clearPotentialMovs() {
    for (let fila = 0; fila < this.tablero.length; fila++) {
      for (let columna = 0; columna < this.tablero[fila].length; columna++) {
        if (!this.tablero[fila][columna] || !this.tablero[fila][columna].type) {
          this.tablero[fila][columna] = {};
        } else {
          this.tablero[fila][columna].attacked = false;
        }
      }
    }
  }

  colorBoard(piece, movs) {
    this.clearPotentialMovs();

    for (let i = 0; i < movs.length; i++) {
      let fila = movs[i][0];
      let columna = movs[i][1];

      if ((fila >= 0 && fila <= 7) && (columna >= 0 && columna <= 7)) {
        if (this.tablero[fila][columna].type) {
          if (this.tablero[fila][columna].color !== piece.color) {
            this.tablero[fila][columna].attacked = true;
          }
        } else {
          this.tablero[fila][columna] = {
            position: [fila, columna],
            movable: true
          };
        }
      }
    }
  }

}
