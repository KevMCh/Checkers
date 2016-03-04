
function play(){

  var divW = "<div class=\"piece white\"> </div>";
  var divB = "<div class=\"piece black\"> </div>";

  for(i = 1; i <= 8; i++){

    //Las filas de la mitad del tablero no tienen fichas
    if((i != 4) && (i != 5)){

      //En las primeras tres líneas colocamos las blancas
      if(i <= 3){

        //Si la fila es par colocamos la ficha en una columna impar
        if(i%2 == 0){
          for(j = 1; j <= 7; j += 2){
            document.getElementById(String(i)).getElementsByClassName(String(j))[0].innerHTML = divW;
          }

        //Si la casilla es impar colocamos la ficha en una columna par
        } else {
          for(j = 2; j <= 8; j += 2){
            document.getElementById(String(i)).getElementsByClassName(String(j))[0].innerHTML = divW;
          }
        }
      } else {
        /*
        En el caso de que no sea una fila menor que 3, ni la 4, ni la 5,
        será una fila a partir de la 6, colocamos las fichas negras
        */
        if(i%2 == 0){
          for(j = 1; j <= 7; j += 2){
            document.getElementById(String(i)).getElementsByClassName(String(j))[0].innerHTML = divB;
          }
        } else {
          for(j = 2; j <= 8; j+=2){
            document.getElementById(String(i)).getElementsByClassName(String(j))[0].innerHTML = divB;
          }
        }
      }
    }
  }
}

function reset(){

  //Eliminamos todas las fichas
  for(i = 1; i <= 8; i++){
    for(j = 1; j <= 8; j++){
      document.getElementById(String(i)).getElementsByClassName(String(j))[0].innerHTML = "";
    }
  }
  //Las colocamos de nuevo
  play();
}
