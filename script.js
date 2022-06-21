/*********************************************/
/************** START SCREEN ****************/

//            PIECE SELECTION

let gameBoardTracking = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const xSelection = document.querySelector('.selection-1');
const oSelection = document.querySelector('.selection-2');
const goesFirstMsg = document.getElementById('goes-first');

let vsComputer = false;

const itIsTheCpuMove = document.getElementById('itscpumove');

xSelection.addEventListener('click', xGoesFirst);

function xGoesFirst() {
  if (!xSelection.classList.contains('selected-piece')) {
    xSelection.classList.add('selected-piece');
    oSelection.classList.remove('selected-piece');
    piece = true;
    goesFirstMsg.innerHTML = piece ? 'X' : 'O';
  }
}

oSelection.addEventListener('click', oGoesFirst);

function oGoesFirst() {
  if (!oSelection.classList.contains('selected-piece')) {
    oSelection.classList.add('selected-piece');
    xSelection.classList.remove('selected-piece');
    piece = false;
    goesFirstMsg.innerHTML = piece ? 'X' : 'O';
  }
}

const startGameDispaly = document.getElementById('start-screen');
const gameBoardDisplay = document.getElementById('the-game-board');

//      Start Game Buttons

const startGameVSCPU = document.getElementById('btn-vs-cpu');
const startGameVSPlayer = document.getElementById('btn-vs-player');

startGameVSCPU.addEventListener('click', gameVSComputer);
startGameVSPlayer.addEventListener('click', gameVSPlayer);

function gameVSComputer() {
  showBoard();
  vsComputer = true;
}

function gameVSPlayer() {
  showBoard();
}

function showBoard() {
  gameBoardDisplay.style.display = 'flex';
  startGameDispaly.style.display = 'none';
}

function hideBoard() {
  gameBoardDisplay.style.display = 'none';
  startGameDispaly.style.display = 'flex';
}

/*********************************************/
/************** GAME SCREEN ****************/

const winningMsg = document.getElementById('winning-msg');
const losingMsg = document.getElementById('losing-msg');
const drawMsg = document.getElementById('draw-msg');
const takesTheRound = document.getElementById('takes-the-round');
const restartGame = document.getElementById('restart-game');
const endGameMsg = document.querySelector('.endgame-message');
const winLoseDrawMsg = document.getElementById('wld');
const winningSymbol = document.getElementById('winning-image');
const winningColor = document.getElementById('winning-color');
const youWinMsg = document.getElementById('winning-msg');
const youLoseMsg = document.getElementById('losing-msg');
const takesTheRoundMsg = document.getElementById('takes-the-round');
youWinMsg.style.display = 'none';
youLoseMsg.style.display = 'none';
takesTheRoundMsg.style.display = 'none';

const restartBtn = document.querySelector('.restart-btn');
const cancelRestartBtn = document.getElementById('cancel-restart-btn');
const restartGameBtn = document.getElementById('restart-game-btn');

//CHECKING THE PROGRESS OF THE GAME
let gameCheckBoard = ['', '', '', '', '', '', '', '', ''];

let piece;
let xScore = 0;
let amountOfTies = 0;
let oScore = 0;

let xScoreLabel = document.getElementById('score-1');
let oScoreLabel = document.getElementById('score-2');
let tiesLabel = document.getElementById('ties');

let xPlayerLabel = document.getElementById('x-player');
let oPlayerLabel = document.getElementById('o-player');

let turn = 0;

xScoreLabel.innerHTML = xScore;
oScoreLabel.innerHTML = oScore;
tiesLabel.innerHTML = amountOfTies;

xPlayerLabel.textContent = piece ? '(P1)' : '(P2)';
oPlayerLabel.innerHTML = piece ? '(P2)' : '(P1)';

restartBtn.addEventListener('click', function () {
  console.log('restart btn pressed');
  endGameMsg.style.display = 'block';
  restartGame.style.display = 'block';
  turn = 0;
});

cancelRestartBtn.addEventListener('click', closeRestartMessage);
restartGame.addEventListener('click', function () {
  closeRestartMessage();
  resetBoard();
});

function closeRestartMessage() {
  endGameMsg.style.display = 'none';
  restartGame.style.display = 'none';
}

function drawMessage() {
  endGameMsg.style.display = 'block';
  winLoseDrawMsg.style.display = 'block';
  drawMsg.style.display = 'block';
}

function displayWinningMessage() {
  //IF COMPUTER HAS WON ..... DISPLAY YOU LOSE
  endGameMsg.style.display = 'block';
  winLoseDraw.style.display = 'block';
  winningMsg.style.display = 'block';
  takesTheRound.style.display = 'flex';
}

function clearAllMessages() {
  endGameMsg.style.display = 'none';
  winLoseDraw.style.display = 'none';
  winningMsg.style.display = 'none';
  takesTheRound.style.display = 'none';
  drawMsg.style.display = 'none';
}

function resetBoard() {
  gameBoard.forEach((element) => {
    if (element.childElementCount > 0) {
      element.removeChild(element.firstChild);
    }
  });
}

function startGame() {}

const xIcon = './assets/icon-x.svg';
const oIcon = './assets/icon-o.svg';
const winLoseDraw = document.getElementById('wld');

let turnSymbol = document.querySelector('.turn-symbol');
turnSymbol.src = piece ? './assets/icon-x.svg' : './assets/icon-o.svg';

const green = '#31c3bd';
const orange = '#f2b137';

const gameBoard = document.querySelectorAll('.col');

gameBoard.forEach((element, index) => {
  element.addEventListener('click', function () {
    if (element.childElementCount < 1) {
      const image = document.createElement('img');

      image.src = piece ? xIcon : oIcon;

      gameCheckBoard[index] = piece ? 'X' : 'O';

      piece = !piece;
      turnSymbol.src = piece ? './assets/icon-x.svg' : './assets/icon-o.svg';

      element.appendChild(image);
      turn++;

      let indexLocation = gameBoardTracking.indexOf(index);
      updateGameBoardTracking(indexLocation);

      //console.log(`Player tracking ${gameBoardTracking}`);

      checkForWin();
      if (vsComputer) {
        itIsTheCpuMove.innerHTML = 'I AM THINKING...';
        setTimeout(computerMove, 1500);
      }
    }
  });
});

function checkForWin() {
  if (checkVertical('X') || checkHorizontal('X') || checkDiagonal('X')) {
    console.log('X WINS');
    xWinningSymbol();
    incrementXScore();
    displayWinningMessage();
    return true;
  } else if (checkVertical('O') || checkHorizontal('O') || checkDiagonal('O')) {
    console.log('O WINS');

    oWinningSymbol();
    incrementOScore();
    displayWinningMessage();
    return true;
  } else if (turn === 9) {
    drawMessage();
    incrementTies();
    return true;
  }
}

function checkVertical(gamePiece) {
  for (let i = 0; i < 3; i++) {
    if (
      gameCheckBoard[i] === gamePiece &&
      gameCheckBoard[i + 3] === gamePiece &&
      gameCheckBoard[i + 6] === gamePiece
    ) {
      return true;
    }
  }
}

function checkHorizontal(gamePiece) {
  for (let i = 0; i < 9; i += 3) {
    if (
      gameCheckBoard[i] === gamePiece &&
      gameCheckBoard[i + 1] === gamePiece &&
      gameCheckBoard[i + 2] === gamePiece
    ) {
      return true;
    }
  }
}

function checkDiagonal(gamePiece) {
  if (
    gameCheckBoard[0] === gamePiece &&
    gameCheckBoard[4] === gamePiece &&
    gameCheckBoard[8] === gamePiece
  ) {
    return true;
  } else if (
    gameCheckBoard[2] === gamePiece &&
    gameCheckBoard[4] === gamePiece &&
    gameCheckBoard[6] === gamePiece
  ) {
    return true;
  }
}

function incrementXScore() {
  xScore++;
  xScoreLabel.innerHTML = xScore;
}

function incrementOScore() {
  oScore++;
  oScoreLabel.innerHTML = oScore;
}

function incrementTies() {
  amountOfTies++;
  tiesLabel.innerHTML = amountOfTies;
}

function oWinningSymbol() {
  winningSymbol.src = oIcon;
  winningColor.style.color = orange;
}

function xWinningSymbol() {
  winningSymbol.src = xIcon;
  winningColor.style.color = green;
}

// POP UP MESSAGE BUTTONS WIN LOSE DRAW

const nextRoundBtn = document.getElementById('next-round-btn');
const quitBtn = document.getElementById('quit-btn');

nextRoundBtn.addEventListener('click', newRound);

function newRound() {
  resetBoard();
  clearAllMessages();
  resetLogic();
}

function resetLogic() {
  gameCheckBoard = ['', '', '', '', '', '', '', '', ''];
  gameBoardTracking = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  turn = 0;
}

function resetScores() {
  xScore = 0;
  oScore = 0;
  amountOfTies = 0;

  oScoreLabel.innerHTML = oScore;
  xScoreLabel.innerHTML = xScore;
  tiesLabel.innerHTML = amountOfTies;
}

quitBtn.addEventListener('click', quitGame);

function quitGame() {
  resetBoard();
  resetLogic();
  clearAllMessages();
  hideBoard();
  resetScores();
  xGoesFirst();
}

function computerMove() {
  itIsTheCpuMove.innerHTML = '';
  if (turn === 9) {
    return;
  }
  if (checkForWin() === true) {
    return;
  } else {
    const image = document.createElement('img');
    image.src = piece ? xIcon : oIcon;
    if (gameCheckBoard[4] === '') {
      console.log('MIDDLE SQUARE!!');
      gameCheckBoard[4] = piece ? 'X' : 'O';
      piece = !piece;
      turnSymbol.src = piece ? './assets/icon-x.svg' : './assets/icon-o.svg';
      gameBoard[4].appendChild(image);
      let indexLocation = gameBoardTracking.indexOf(4);
      updateGameBoardTracking(indexLocation);
    } else {
      if (bestMove(piece ? 'X' : 'O')) {
        console.log('WINNING MOVE POSSIBLE');
        gameCheckBoard[blockingMove] = piece ? 'X' : 'O';
        piece = !piece;
        turnSymbol.src = piece ? './assets/icon-x.svg' : './assets/icon-o.svg';
        gameBoard[blockingMove].appendChild(image);
        let indexLocation = gameBoardTracking.indexOf(blockingMove);
        updateGameBoardTracking(indexLocation);
      } else if (bestMove(!piece ? 'X' : 'O')) {
        console.log('BEST MOVE POSSIBLE');
        console.log(blockingMove);

        gameCheckBoard[blockingMove] = piece ? 'X' : 'O';
        piece = !piece;
        turnSymbol.src = piece ? './assets/icon-x.svg' : './assets/icon-o.svg';
        gameBoard[blockingMove].appendChild(image);
        let indexLocation = gameBoardTracking.indexOf(blockingMove);
        updateGameBoardTracking(indexLocation);
      } else {
        console.log('RANDOM SQUARE!!!');
        let randomSquare = Math.floor(Math.random() * gameBoardTracking.length);
        let choosenSquare = gameBoardTracking[randomSquare];

        gameCheckBoard[choosenSquare] = piece ? 'X' : 'O';
        piece = !piece;
        turnSymbol.src = piece ? './assets/icon-x.svg' : './assets/icon-o.svg';
        gameBoard[choosenSquare].appendChild(image);
        let indexLocation = gameBoardTracking.indexOf(choosenSquare);
        updateGameBoardTracking(indexLocation);
      }
    }
    turn++;
    checkForWin();
  }
}

function updateGameBoardTracking(boardIndex) {
  gameBoardTracking.splice(boardIndex, 1);
}

let blockingMove;

function bestMove(checkfor) {
  let match = 0;
  for (let i = 0; i < cpuMoves.length; i++) {
    for (let j = 0; j < 2; j++) {
      if (gameCheckBoard[cpuMoves[i][j]] === checkfor) {
        match++;
        if (match === 2) {
          let thePiece = piece ? 'X' : 'O';
          let notThePiece = !piece ? 'X' : 'O';

          if (
            gameCheckBoard[cpuMoves[i][2]] === thePiece ||
            gameCheckBoard[cpuMoves[i][2]] === notThePiece
          ) {
            console.log('THAT SPACE IS OCCUPIED');
            console.log(notThePiece);
          } else {
            console.log('LETS BLOCK');
            blockingMove = cpuMoves[i][2];
            i = cpuMoves.length;
            return true;
          }
        }
      }
    }
    match = 0;
  }
  return false;
}

//END SQUARE IS THE WINNING MOVE
const cpuMoves = [
  //horizontal
  [0, 1, 2],
  [0, 2, 1],
  [1, 2, 0],
  [3, 4, 5],
  [3, 5, 4],
  [4, 5, 3],
  [6, 7, 8],
  [6, 8, 7],
  [7, 8, 6],
  //vertical
  [0, 3, 6],
  [0, 6, 3],
  [3, 6, 0],
  [1, 4, 7],
  [1, 7, 4],
  [4, 7, 1],
  [2, 5, 8],
  [2, 8, 5],
  [5, 8, 2],
  //diagonal
  [0, 4, 8],
  [0, 8, 4],
  [4, 8, 0],
  [2, 4, 6],
  [2, 6, 4],
  [4, 6, 2],
];
