
let activePlayer;
let cells = document.querySelectorAll(".cell");
let status = document.querySelector(".status");

//Switching Player(O/X) after each Turn
function switchPlayer() {
    activePlayer = (activePlayer == 'O') ? 'X' : 'O'
}
//Pushing X/O into the boxes
function pushValue() {
    this.innerText = activePlayer;
    let winner = checkWin();
    if (!winner) {
        this.removeEventListener('click', pushValue)
        switchPlayer();
        status.innerText = activePlayer + "'s Turn!"

    }
    else if (winner == "Tie") {
        this.removeEventListener('click', pushValue);
        status.innerText = "It's a Tie!";
        for (let i = 0; i < cells.length; i++) {
            cells[i].addEventListener('click', init);
        }
    }
    else {
        status.innerText = winner + " wins the Game! Congrats"
        for (let i = 0; i < cells.length; i++) {
            cells[i].addEventListener('click', init);
        }
    }
}
//Checking whether any player has won the game after each move
function checkWin() {
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
    let winner = null;
    let cval = [];
    for (let i = 0; i < cells.length; i++) {
        cval[i] = cells[i].innerText;
    }
    for (let i = 0; i < winningCombo.length; i++) {
        if (cval[winningCombo[i][0]] &&
            cval[winningCombo[i][0]] == cval[winningCombo[i][1]] &&
            cval[winningCombo[i][1]] == cval[winningCombo[i][2]]) {
            cells[winningCombo[i][0]].classList.add("win");
            cells[winningCombo[i][1]].classList.add("win");
            cells[winningCombo[i][2]].classList.add("win");
            winner = cval[winningCombo[i][0]];
            break;
        }
    }
    //Condition for Tie
    if (winner == null && cval.includes("") == false) {
        winner = "Tie";
    }
    return winner;
}


document.querySelector('#res').addEventListener('click', init);

function init() {
    activePlayer = 'O';
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].removeEventListener('click', init);
        cells[i].addEventListener('click', pushValue);
        cells[i].classList.remove("win");
    }
    status.innerHTML = "O's Turn!";
}
init();
