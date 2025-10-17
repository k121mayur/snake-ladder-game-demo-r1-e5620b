const boardSize = 10;
const snakes = { 16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78 };
const ladders = { 1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100 };

let playerPositions = [0, 0];
let currentPlayer = 0;

function createBoard() {
    const board = document.getElementById('board');
    for (let i = boardSize * boardSize; i > 0; i--) {
        const square = document.createElement('div');
        square.className = 'square';
        square.id = 'square-' + i;
        square.innerText = i;
        board.appendChild(square);
    }
}

function rollDice() {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    const newPosition = playerPositions[currentPlayer] + diceRoll;
    if (newPosition <= 100) {
        playerPositions[currentPlayer] = newPosition;
        updatePosition();
        checkWin();
        currentPlayer = (currentPlayer + 1) % 2;
        document.getElementById('currentPlayer').innerText = `Current Player: Player ${currentPlayer + 1}`;
    }
}

function updatePosition() {
    const currentSquare = playerPositions[currentPlayer];
    const token = document.createElement('div');
    token.className = 'token';
    const square = document.getElementById('square-' + currentSquare);
    square.appendChild(token);
    if (snakes[currentSquare]) {
        playerPositions[currentPlayer] = snakes[currentSquare];
    } else if (ladders[currentSquare]) {
        playerPositions[currentPlayer] = ladders[currentSquare];
    }
    document.getElementById('message').innerText = `Player ${currentPlayer + 1} rolled and moved to square ${playerPositions[currentPlayer]}`;
}

function checkWin() {
    if (playerPositions[currentPlayer] === 100) {
        document.getElementById('message').innerText = `Player ${currentPlayer + 1} wins!`;
        document.getElementById('rollDice').disabled = true;
    }
}

document.getElementById('rollDice').addEventListener('click', rollDice);
createBoard();