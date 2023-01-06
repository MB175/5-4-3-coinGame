const pile1 = document.getElementById("pile1");
const pile2 = document.getElementById("pile2");
const pile3 = document.getElementById("pile3");
const turnCompleteButton = document.getElementById("turn-complete");

let currentPlayer = 1;
let activePile = null;
let coinRemoved = false

function drawCoins() {
    pile1.innerHTML = "";
    pile2.innerHTML = "";
    pile3.innerHTML = "";
    for (let i = 0; i < 5; i++) {
        const coin = document.createElement("div");
        coin.classList.add("coin");
        pile1.appendChild(coin);
    }
    for (let i = 0; i < 3; i++) {
        const coin = document.createElement("div");
        coin.classList.add("coin");
        pile2.appendChild(coin);
    }
    for (let i = 0; i < 4; i++) {
        const coin = document.createElement("div");
        coin.classList.add("coin");
        pile3.appendChild(coin);
    }
}

function removeCoin(pile) {
    if (pile.children.length > 0) {
        pile.removeChild(pile.lastChild);
        coinRemoved = true
    }
}

function checkGameOver() {
    if (pile1.children.length + pile2.children.length + pile3.children.length === 1) {
        alert(`Player ${currentPlayer} loses!`);
        return true;
    }
    return false;
}

function switchPlayer() {

    if (!coinRemoved) return
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    console.log(currentPlayer)
    if (checkGameOver()) {
        return;
    }

    if (activePile != null) activePile.style.border = ""

    activePile = null;
    coinRemoved = false;

    if (currentPlayer !== 1) {
        botTurn()
    }
}

function takeTurn() {
    if (activePile !== null) {
        removeCoin(activePile);
    }
}

function activePileAndTakeTurn(pile) {
    if (activePile === null) {
        activePile = pile;
        pile.style.border = "thick solid green"
    }
    if (activePile === pile) {
        takeTurn();
    }

}

drawCoins();


pile1.addEventListener("click", () => {
    activePileAndTakeTurn(pile1)

});
pile2.addEventListener("click", () => {
    activePileAndTakeTurn(pile2)
});
pile3.addEventListener("click", () => {
    activePileAndTakeTurn(pile3)
});
turnCompleteButton.addEventListener("click", () => {
    switchPlayer();
});


function botTurn() {

    console.log("Bot turn")

    if (pile1.children.length === 1) {
        activePileAndTakeTurn(pile1);
    } else if (pile2.children.length === 1) {
        activePileAndTakeTurn(pile1)
    } else if (pile3.children.length === 1) {
        activePileAndTakeTurn(pile1)
    } else {

        const piles = [pile1, pile2, pile3];
        var filter = piles.filter(value => Object.keys(value).length !== null)
        const chosenPile = filter[Math.floor(Math.random() * filter.length)];

        const numCoinsToRemove = Math.floor(Math.random() * (chosenPile.children.length + 1));
        for (let i = 0; i < numCoinsToRemove; i++) {
            activePileAndTakeTurn(chosenPile)
        }
    }

    switchPlayer();
}