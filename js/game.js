const WHITE = "<div class=\"piece white\"> </div>";
const BLACK = "<div class=\"piece black\"> </div>";
const SIZE = 8;
const NUMPIECES = 12;

whiteOrBlack = 0;

/****************************************************************************************************************************************************/
/*                                                        GAME                                                                                      */
/****************************************************************************************************************************************************/

function Game (whiteT, blackT, tableP){
  this.white = whiteT;
  this.black = blackT;

  this.table = tableP;
};

Game.prototype.move = function move(row, colum){
  if(typeof(this.table.getElement(row, colum)) == 'object'){

    pieceR = row;
    pieceC = colum;

    havePiece = true;

  } else {

    if(havePiece && ((this.canEat(row, colum, pieceR, pieceC)) || (this.canMove(row, colum, pieceR, pieceC)))){

      this.table.setElement(row, colum, this.table.getElement(pieceR, pieceC));
      this.table.setElement(pieceR, pieceC, undefined);
      document.getElementById(String(pieceR)).getElementsByClassName(String(pieceC))[0].innerHTML = "";

      if(whiteOrBlack == 1){
        document.getElementById(String(row)).getElementsByClassName(String(colum))[0].innerHTML = BLACK;
        whiteOrBlack = 0;
      } else {
        document.getElementById(String(row)).getElementsByClassName(String(colum))[0].innerHTML = WHITE;
        whiteOrBlack = 1;
      }
    }

    havePiece = false;
  }
};

Game.prototype.canMove = function canMove(row, colum, rowA, columA) {
  if(whiteOrBlack == 0){
    if((row == rowA + 1) &&
      ((colum == columA - 1) ||
      (colum == columA + 1))){

      return true;
    }
    return false;

  } else {
    if((row == rowA - 1) &&
      ((colum == columA - 1) ||
      (colum == columA + 1))){

      return true;
    }
    return false;
  }
};

Game.prototype.canEat = function canEat(row, colum, rowA, columA) {

  if(whiteOrBlack == 0){
    if((row == rowA + 2) &&
      ((colum == columA - 2) ||
      (colum == columA + 2))){

        if((columA - 1 > 0) && (rowA + 1 <= 8) && (document.getElementById(String(rowA + 1)).getElementsByClassName(String(columA - 1))[0].innerHTML == BLACK)){
          document.getElementById(String(rowA + 1)).getElementsByClassName(String(columA - 1))[0].innerHTML = "";
          this.table.setElement(rowA + 1, columA - 1, undefined);
          this.black.deadPiece();
          if(this.black.getPiecesLives() == 0){
            alert("Ganan las blancas");
          }
          return true;

        } else {

          if((columA + 1 <= 8) && (rowA + 1 <= 8) && (document.getElementById(String(rowA + 1)).getElementsByClassName(String(columA + 1))[0].innerHTML == BLACK)){
            document.getElementById(String(rowA + 1)).getElementsByClassName(String(columA + 1))[0].innerHTML = "";
            this.table.setElement(rowA + 1, columA + 1, undefined);
            this.black.deadPiece();
            if(this.black.getPiecesLives() == 0){
              alert("Ganan las blancas");
            }
            return true;
          }
        }


    }
    return false;

  } else {

    if((row == rowA - 2) &&
      ((colum == columA - 2) ||
      (colum == columA + 2))){
        console.log(columA - 1)
        console.log(rowA - 1)


        if((columA - 1 > 0) && (rowA - 1 > 0) && (document.getElementById(String(rowA - 1)).getElementsByClassName(String(columA - 1))[0].innerHTML == WHITE)){
          document.getElementById(String(rowA - 1)).getElementsByClassName(String(columA - 1))[0].innerHTML = "";
          this.table.setElement(rowA - 1, columA - 1, undefined);
          this.white.deadPiece();
          if(this.white.getPiecesLives() == 0){
            alert("Gana las negras");
          }
          return true;

        } else {

          if((columA + 1 <= 8) && (rowA - 1 > 0) && (document.getElementById(String(rowA - 1)).getElementsByClassName(String(columA + 1))[0].innerHTML == WHITE)){
            document.getElementById(String(rowA - 1)).getElementsByClassName(String(columA + 1))[0].innerHTML = "";
            this.table.setElement(rowA - 1, columA + 1, undefined);
            this.white.deadPiece();
            if(this.white.getPiecesLives() == 0){
              alert("Gana las negras");
            }
            return true;
          }
        }
    }
    return false;
  }
};

/****************************************************************************************************************************************************/
/*                                                        TABLE                                                                                     */
/****************************************************************************************************************************************************/

function Table (){
  this.rowT = SIZE;
  this.columT = SIZE;

  this.table = new Array(SIZE * SIZE);
}

Table.prototype.getSize = function getSize(){
  return SIZE;
}

Table.prototype.getElement = function getElement(row, colum){
  if ((row < 1) || (row > this.getSize()) || (colum < 1) || (colum > this.getSize())){
  		console.log("Error accediendo a la matriz");
  		return 0;

  	} else {
  		return this.table[this.getPos(row, colum)];
  	}
}

Table.prototype.setElement = function setElement(row, colum, element){
  if ((row < 1) || (row > this.getSize()) || (colum < 1) || (colum > this.getSize())){
  		console.log("Error accediendo a la matriz");
  		return 0;
  	} else {
  		return this.table[this.getPos(row, colum)] = element;
  	}
}

Table.prototype.getPos = function getPos(row, colum){
  return (row - 1) * this.getSize() + colum - 1;
}


Table.prototype.setPieces = function setPieces(whiteT, blackT){
  var numW = 0;
  var numB = 0;

  for(i = 1; i <= 8; i++){
    //Las filas de la mitad del tablero no tienen fichas
    if((i != 4) && (i != 5)){
      //En las primeras tres líneas colocamos las blancas
      if(i <= 3){
        //Si la fila es par colocamos la ficha en una columna impar
        if(i%2 == 0){
          for(j = 1; j <= 7; j += 2){
            this.setElement(i, j, whiteT.getPiece(numW)); numW ++;
          }
        //Si la casilla es impar colocamos la ficha en una columna par
        } else {
          for(j = 2; j <= 8; j += 2){
            this.setElement(i, j, whiteT.getPiece(numW)); numW ++;
          }
        }
      } else {
        /*
        En el caso de que no sea una fila menor que 3, ni la 4, ni la 5,
        será una fila a partir de la 6, colocamos las fichas negras
        */
        if(i%2 == 0){
          for(j = 1; j <= 7; j += 2){
            this.setElement(i, j, blackT.getPiece(numB)); numB ++;
          }
        } else {
          for(j = 2; j <= 8; j+=2){
            this.setElement(i, j, blackT.getPiece(numB)); numB ++;
          }
        }
      }
    }
  }
}
/****************************************************************************************************************************************************/
/*                                                        TEAM                                                                                      */
/****************************************************************************************************************************************************/

function Team() {
  this.pieces = [];

  for(i = 0; i < NUMPIECES; i++){
    var piece = new Piece();
    this.pieces.push(piece);
  }
}

Team.prototype.getPiecesLives = function getPiecesLives(){
  var num = 0;
  for(i = 0; i < NUMPIECES; i++){
    if( this.pieces[i] != undefined){
      num++;
    }
  }
  return num;
}

Team.prototype.getPiece = function getPiece(numP){
  return this.pieces[numP];
}

Team.prototype.deadPiece = function deadPiece(){
  var num = 0;
  while(this.pieces[num] == undefined){
    num++;
  }

  this.pieces[num] = undefined;
}

/****************************************************************************************************************************************************/
/*                                                        PIECE                                                                                     */
/****************************************************************************************************************************************************/

function Piece (){

}

/****************************************************************************************************************************************************/
/*                                                        PLAY                                                                                      */
/****************************************************************************************************************************************************/


w = new Team();
b = new Team();
t = new Table();
t.setPieces(w, b);
game = new Game(w, b, t);
