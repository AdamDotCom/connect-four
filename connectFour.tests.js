var connectFour;
if (!connectFour) connectFour = {};

connectFour.tests = function() {

  var disc = connectFour.core.disc();
  
  function dropDisc(playedDisc, column) {
    return connectFour.core.dropDisc(playedDisc, column);
  }
  
  function buildBoard() {
    return connectFour.core.buildBoard();
  }
  
  function checkVerticalWin(playedDisc, column, y) {
    return connectFour.core.checkVerticalWin(playedDisc, column, y);
  }
  
  function checkHorizontalWin(playedDisc, column, y) {
    return connectFour.core.checkHorizontalWin(playedDisc, column, y);
  } 
  
  function checkDiagonalWin(playedDisc, column, y) {
    return connectFour.core.checkDiagonalWin(playedDisc, column, y);    
  }
  
  function assert(value, message) {
    var prefix = (value === true) ? ' Pass: ' : 'Fail: ';
    document.write(prefix, message);
  }

  // Verify disc object  
  assert(disc.playerOne === 1, 'Verify numeric value for player one piece');
  assert(disc.playerTwo === 2, 'Verify numeric value for player two piece');
  assert(disc.none === 0, 'Verify numeric value for unplayed piece');
  
  // Verify initialization
  var board = buildBoard();
  assert(board[0][0] === disc.none, 'Verify board is initialized with unplayed pieces');
  
  // Verify dropDisc
  assert(dropDisc(disc.playerTwo, 0) === 0, 'Verify dropDisc on empty board');
  dropDisc(disc.playerOne, 0);
  dropDisc(disc.playerTwo, 0);
  dropDisc(disc.playerTwo, 0);
  dropDisc(disc.playerTwo, 0);
  assert(dropDisc(disc.playerTwo, 0) === 5, 'Verify dropDisc on non-empty board');
  assert(dropDisc(disc.playerOne, 0) === -1, 'Verify dropDisc error when column is full');
  assert(dropDisc(disc.none, 0) === -1, 'Verify dropping a disc of none fails');
  
  // Verify Vertical Wins
  buildBoard();
  
  dropDisc(disc.playerOne, 1);
  dropDisc(disc.playerOne, 1);
  dropDisc(disc.playerOne, 1);
  var yValue = dropDisc(disc.playerOne, 1);
  
  assert(checkVerticalWin(disc.playerOne, 1, yValue), 'Verify vertical win succeeds' );
  
  buildBoard();
  dropDisc(disc.playerOne, 1);
  dropDisc(disc.playerTwo, 1);
  dropDisc(disc.playerTwo, 1);
  var yValue = dropDisc(disc.playerOne, 1);
  assert(checkVerticalWin(disc.playerOne, 1, yValue) === false, 'Verfiy vertical win fails');
  
  // Verify Horizontal Wins
  buildBoard();
  
  dropDisc(disc.playerOne, 4);
  dropDisc(disc.playerOne, 3);
  dropDisc(disc.playerOne, 2);
  var yValue = dropDisc(disc.playerOne, 1);
  assert(checkHorizontalWin(disc.playerOne, 1, yValue), 'Verify horizontal win succeeds from right');
  
  buildBoard();
  
  dropDisc(disc.playerOne, 1);
  dropDisc(disc.playerOne, 3);
  dropDisc(disc.playerOne, 2);
  var yValue = dropDisc(disc.playerOne, 4);
  assert(checkHorizontalWin(disc.playerOne, 4, yValue), 'Verify horizontal win succeeds from left' );

  buildBoard();

  dropDisc(disc.playerOne, 6);
  dropDisc(disc.playerOne, 5);
  dropDisc(disc.playerOne, 4);
  var yValue = dropDisc(disc.playerOne, 3);
  assert(checkHorizontalWin(disc.playerOne, 3, yValue), 'Verify horizontal win succeeds from right boundary' );

  buildBoard();
  
  dropDisc(disc.playerOne, 0);
  dropDisc(disc.playerOne, 2);
  dropDisc(disc.playerOne, 1);
  var yValue = dropDisc(disc.playerOne, 3);
  assert(checkHorizontalWin(disc.playerOne, 3, yValue), 'Verify horizontal win succeeds from left boundary' );
  
  buildBoard();
  
  dropDisc(disc.playerOne, 4);
  dropDisc(disc.playerTwo, 3);
  dropDisc(disc.playerOne, 2);
  var yValue = dropDisc(disc.playerOne, 1);
  assert(checkHorizontalWin(disc.playerOne, yValue) === false, 'Verify horizontal win fails');
  
  // Verify Diagonal Wins
  
  buildBoard();
  
  dropDisc(disc.playerOne, 1);
  dropDisc(disc.playerTwo, 2);
  dropDisc(disc.playerOne, 2);
  dropDisc(disc.playerTwo, 3);
  dropDisc(disc.playerTwo, 3);
  dropDisc(disc.playerOne, 3);
  dropDisc(disc.playerTwo, 4);
  dropDisc(disc.playerTwo, 4);
  dropDisc(disc.playerTwo, 4);
  var yValue = dropDisc(disc.playerOne, 4);
  assert(checkDiagonalWin(disc.playerOne, 4, yValue), 'Verify diagonal win succeeds from left down' );
  
  buildBoard();
  
  dropDisc(disc.playerTwo, 1);
  dropDisc(disc.playerTwo, 1);
  dropDisc(disc.playerTwo, 1);
  dropDisc(disc.playerOne, 1);
  dropDisc(disc.playerTwo, 2);
  dropDisc(disc.playerTwo, 2);
  dropDisc(disc.playerOne, 2);
  dropDisc(disc.playerTwo, 3);
  dropDisc(disc.playerOne, 3);
  var yValue = dropDisc(disc.playerOne, 4);
  assert(checkDiagonalWin(disc.playerOne, 4, yValue), 'Verify diagonal win succeeds from left up');
  
  buildBoard();
  
  dropDisc(disc.playerTwo, 2);
  dropDisc(disc.playerOne, 2);
  dropDisc(disc.playerTwo, 3);
  dropDisc(disc.playerTwo, 3);
  dropDisc(disc.playerOne, 3);
  dropDisc(disc.playerTwo, 4);
  dropDisc(disc.playerTwo, 4);
  dropDisc(disc.playerTwo, 4);
  dropDisc(disc.playerOne, 4)
  var yValue = dropDisc(disc.playerOne, 1);
  assert(checkDiagonalWin(disc.playerOne, 1, yValue), 'Verify diagonal win succeeds from right up');

  buildBoard();
  dropDisc(disc.playerTwo, 0);
  dropDisc(disc.playerTwo, 0);
  dropDisc(disc.playerTwo, 0);
  dropDisc(disc.playerOne, 3)
  dropDisc(disc.playerTwo, 2);
  dropDisc(disc.playerOne, 2);
  dropDisc(disc.playerTwo, 1);
  dropDisc(disc.playerTwo, 1);
  dropDisc(disc.playerOne, 1);
  var yValue = dropDisc(disc.playerOne, 0)
  assert(checkDiagonalWin(disc.playerOne, 0, yValue), 'Verify diagonal win succeeds from right down');

  buildBoard(); 
  
  dropDisc(disc.playerOne, 1);
  dropDisc(disc.playerTwo, 2);
  dropDisc(disc.playerOne, 2);
  dropDisc(disc.playerTwo, 3);
  dropDisc(disc.playerTwo, 3);
  dropDisc(disc.playerTwo, 3);
  dropDisc(disc.playerTwo, 4);
  dropDisc(disc.playerTwo, 4);
  dropDisc(disc.playerTwo, 4);
  var yValue = dropDisc(disc.playerOne, 4);  
  assert(checkDiagonalWin(disc.playerOne, 4, yValue) === false, 'Verify diagonal win fails');
}

// Comment out to hide the tests
connectFour.tests();