const images = ['1.gif', '2.gif', '3.gif', '4.gif', '5.gif', '6.gif'];
const cards = shuffle(images.concat(images)); // Shuffle for random placement

const gameContainer = document.getElementById('game');
let firstCard = null;
let secondCard = null;
let lockBoard = false;

const rows = 3;
const cols = 4;

let cardIndex = 0;

function createGameBoard() {
  for (let i = 0; i < rows; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement('td');
      const card = document.createElement('img');
      card.src = 'Moon.gif';
      card.dataset.index = cardIndex;
      card.dataset.image = cards[cardIndex];
      card.width = 100;
      card.height = 100;
      card.onclick = function () {
        onCardClick(this);
      };
      cell.appendChild(card);
      row.appendChild(cell);
      cardIndex++;
    }
    gameContainer.appendChild(row);
  }
}

function onCardClick(card) {
  if (lockBoard || card === firstCard) return;

  card.src = card.dataset.image;

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  lockBoard = true;

  if (firstCard.dataset.image === secondCard.dataset.image) {
    firstCard.onclick = null;
    secondCard.onclick = null;
    resetTurn();
  } else {
    setTimeout(function()  {
      firstCard.src = 'Moon.gif';
      secondCard.src = 'Moon.gif';
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function shuffle(array) {
  return array.sort(function()  {Math.random() - 0.5});
}

createGameBoard();
