var connectFour;
if (!connectFour) connectFour = {};

connectFour.core = function() {
  var board;
  
  var settings = {
    xAxis: 7,
    yAxis: 6,
    piecesToConnectForWin: 4
  };

  var disc = { 
    none: 0,
    playerOne: 1, 
    playerTwo: 2 
  };
    
  function dropDisc(playedDisc, column) {
    if (playedDisc === disc.none) {
      return -1;
    }
    
    var y = 0;
    while (board[column][y] !== disc.none) {
      if (board[column][y] === undefined) {
        return -1;
      }
      y = y + 1;
    }
    board[column][y] = playedDisc;
    
    return y;
  }
  
  function checkForWin(playedDisc, column, y) {
    return (checkHorizontalWin(playedDisc, column, y) || 
            checkVerticalWin(playedDisc, column, y) || 
            checkDiagonalWin(playedDisc, column, y));
  }
  
  function checkHorizontalWin(playedDisc, column, y) {
    // this is a pretty expensive algorithm, I could have looked at the location of the player's piece
    //  then moved either left or right in that direction
    if ((column+1 < settings.xAxis && board[column+1][y] === playedDisc) || (column-1 > 0 && board[column-1][y] === playedDisc)) {
      for ( var i = 0 ; i < settings.xAxis ; i++ ) {
        if (board[i][y] === playedDisc) {
          if ((i + settings.piecesToConnectForWin) <= settings.xAxis) {
            for ( var j = 0; j < settings.piecesToConnectForWin; j++) {
              if(isWin(board[i+j][y], playedDisc, j+1)) { 
                return true;
              }
            }        
          }
        }
      }
    }
    
    return false;
  }
  
  function checkVerticalWin(playedDisc, column, y) {
    if (y+1 < 4) {
      return false;
    }
    
    var count = 0;
    for ( var i = y ; i >= 0 ; i--) {
      if (isWin(board[column][i], playedDisc, count+1)) {
        return true;
      } 
      count++;
    }
  
    return false;  
  }
  
  function checkDiagonalWin(playedDisc, column, y) {
    if (settings.xAxis - column > 4) {
      // check right
      if (y+1 < 4) {
        // check up
        for ( var i = 0; i < 4; i++){
          if(isWin(board[column+i][y+i], playedDisc, i+1)) { 
            return true;
          }
        }
      } else {
        // check down
        for ( var i = 0; i < 4; i++){
          if(isWin(board[column+i][y-i], playedDisc, i+1)) { 
            return true;
          }
        }
      }
    } else {
      // check left
      if (y+1 < 4) {
        // check up
        var count = 0;
        for ( var i = column ; i > 0; i--){
          if(isWin(board[i][count], playedDisc, count+1)) {
            return true;
          }
          count++;
        }      
      } else {
        // check down
        var count = 0;
        for ( var i = column ; i > 0; i--){
          if(isWin(board[i][y-count], playedDisc, count+1)) {
            return true;
          }
          count++;
        }      
      }
    }
    
    return false;
  }
  
  var stack = [];
  function isWin(item, playedDisc, count){
    stack.push(item);
    if (count === settings.piecesToConnectForWin){
      for (var i = 0; i < stack.length ; i++) {
        if (stack[i] !== playedDisc) {
          stack = [];
          return false;
        }
      }
      stack = [];
      return true;
    }
  }
  
  // Array.matrix was yanked for JavaScript the Good Parts. Thanks Douglas Crockford!
  Array.matrix = function (m, n, initial) {
    var a, i, j, mat = [];
    for (i = 0; i <m ; i+= 1) {
      a = [];
      for(j =0; j <n; j += 1) {
        a[j] = initial;
      } 
      mat[i] = a;
    }
    return mat;
  }
  
  return {
    buildBoard: function() {
      board = Array.matrix(7, 6, disc.none);
      return board;
    },
    disc: function() { 
      return disc;
    },
    dropDisc: function(playedDisc, column) {
      return dropDisc(playedDisc, column);
    }, 
    checkHorizontalWin: function(playedDisc, column, y) {
      return checkHorizontalWin(playedDisc, column, y);
    },
    checkVerticalWin: function(playedDisc, column, y) {
      return checkVerticalWin(playedDisc, column, y);
    },
    checkDiagonalWin: function(playedDisc, column, y) {
      return checkDiagonalWin(playedDisc, column, y);
    },
    checkForWin: function(playedDisc, column, y) {
      return checkForWin(playedDisc, column, y);
    }
  }
}();