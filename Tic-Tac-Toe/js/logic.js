
let activePlayer;
let cellElements = document.querySelectorAll(".cell");
let status = document.querySelector(".status");
let winningMsgElement = document.querySelector(".winning-msg");
let winningMsgContent = document.querySelector(".winning-msg-content");
let restartButton = document.querySelector('.res');

init();

//Determines state of the board at the start of game
function init() {
    activePlayer = 'O';
    status.innerHTML = "O's Turn!";
    winningMsgElement.classList.remove("show");
    status.classList.remove("notShow");
    for (let i = 0; i < cellElements.length; i++) {
        cellElements[i].innerText = '';
        cellElements[i].addEventListener('click', handleClick, { once: true });
        cellElements[i].classList.remove("clicked");

    }
}
//Switching Player(X/O) after each Turn
function switchPlayer() {
    activePlayer = (activePlayer == 'O') ? 'X' : 'O';
}
//Handling the click event on each cell
function handleClick(e) {
    let cell = e.target;
    //Putting value in the cell
    cell.innerText = activePlayer;

    cell.classList.add("clicked");
    //Checking for winner
    let winner = checkWin(activePlayer);
    if (winner) {
        winningMsgContent.innerText = activePlayer + " wins the Game! "
        winningMsgElement.classList.add("show");
        status.classList.add("notShow");
    }
    else if (checkDraw()) {
        winningMsgContent.innerText = "It's a Tie!";
        winningMsgElement.classList.add("show");
        status.classList.add("notShow");
    }
    else {
        switchPlayer();
        status.innerText = activePlayer + "'s Turn!"
    }

}
//Checking whether any player has won the game after each move
function checkWin(activePlayer) {
    //Winning Combos on the board
    const winningCombo = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    return winningCombo.some(combo => {
        return combo.every(item => {
            return cellElements[item].innerText == activePlayer;

        }
        )
    })
  
}
function checkDraw() {
    return [...cellElements].every(item => {
        return item.innerText.includes("X") || item.innerText.includes("O");
    })
}

//Event listener for restart button
restartButton.addEventListener('click', init);

