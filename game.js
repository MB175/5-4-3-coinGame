const pile1 = document.getElementById("pile1");
const pile2 = document.getElementById("pile2");
const pile3 = document.getElementById("pile3");
const turnCompleteButton = document.getElementById("turn-complete");

const piles = [pile1, pile2, pile3]

let currentPlayer = 1; // set to 2 if bot turn
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
//botTurn();

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

  let nonEmpty = [];
  for (let i = 0; i < piles.length; i++) {
    if (piles[i].children.length > 0) {
      nonEmpty.push(i);
    }
  }

    let largest = 0;
    for (let i = 0; i < nonEmpty.length; i++) {
      if (piles[nonEmpty[i]].children.length > piles[largest].children.length) {
        largest = nonEmpty[i];
      }
    }
    
    for (let i = 0; i < piles[largest].children.length; i++) {
      activePileAndTakeTurn(piles[largest])
    }

  switchPlayer();
}

