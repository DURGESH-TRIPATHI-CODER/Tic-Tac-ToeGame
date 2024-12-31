const continueButton = document.getElementById('continueButton');
const gameInterface = document.getElementById('game-interface');
const usernameInterface = document.getElementById('username-interface');
const turnIndicator = document.getElementById('turn-indicator');
const board = document.getElementById('board');
const resetButton = document.getElementById('resetButton');
const winModal = document.getElementById('winModal');
const modalMessage = document.getElementById('modalMessage');
const closeModal = document.getElementsByClassName('close')[0];

let currentPlayer = 'X';
let gameActive = false;
let usernames = {
    'X': '',
    'O': ''
};
let boardState = ['', '', '', '', '', '', '', '', ''];

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function createBoard() {
    board.innerHTML = '';
    boardState.fill('');
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedIndex = clickedCell.dataset.index;

    if (boardState[clickedIndex] || !gameActive) {
        return; // Cell already filled or game not active
    }

    boardState[clickedIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;
    checkResult();
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (boardState[a] === '' || boardState[b] === '' || boardState[c] === '') {
            continue;
        }
        if (boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        showWinModal(`${usernames[currentPlayer]} wins!`);
        gameActive = false;
        return;
    }

    if (!boardState.includes('')) {
        showWinModal("It's a draw!");
        gameActive = false;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateTurnIndicator();
}

function updateTurnIndicator() {
    turnIndicator.innerText = `${usernames[currentPlayer]}'s Turn (${currentPlayer})`;
}

function showWinModal(message) {
    modalMessage.innerText = message;
    winModal.style.display = 'block';
}

closeModal.onclick = function () {
    winModal.style.display = 'none';
    resetGame();
}

window.onclick = function (event) {
    if (event.target === winModal) {
        winModal.style.display = 'none';
        resetGame();
    }
}

continueButton.addEventListener('click', function () {
    usernames.X = document.getElementById('usernameX').value || 'Player X';
    usernames.O = document.getElementById('usernameO').value || 'Player O';
    usernameInterface.style.display = 'none';
    gameInterface.style.display = 'block';
    gameActive = true;
    createBoard();
    updateTurnIndicator();
});

resetButton.addEventListener('click', resetGame);

function resetGame() {
    boardState.fill('');
    currentPlayer = 'X';
    gameActive = true;
    createBoard();
    updateTurnIndicator();
}

