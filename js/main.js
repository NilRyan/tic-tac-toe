const boardWrapper = document.querySelector('.board-wrapper')
const scorePanel = document.querySelector('.score-panel');

// create the board
for (let i = 0; i < 9; i++) {
  const board = document.createElement('div');
  board.classList.add('panel', i);
  board.setAttribute('data-index', i);
  boardWrapper.appendChild(board);
}

//store data in an array, with functions to insert x, o, and clear the array altogether
const gameBoard = (() => {
  const boardArray = Array(9);
  const x = (index) => {
    if (boardArray[index] != 'X' && boardArray[index] != 'O') {
      boardArray[index] = 'X';
      boardWrapper.children[index].textContent = boardArray[index];
    }
  }
  const o = (index) => {
    if (boardArray[index] != 'X' && boardArray[index] != 'O') {
      boardArray[index] = 'O';
      boardWrapper.children[index].textContent = boardArray[index];
    }
  }
  //clears the board
  const clear = () => {
    boardArray.forEach((item, index) => {
      boardArray[index] = undefined;
      boardWrapper.children[index].textContent = '';
    })
  }
  //check board if game is won and clears the board
  const winCheck = (marker) => {
    //marker is X or O
    const vertical = [0, 3, 6].map(i => {
      return [i, i + 1, i + 2]
    });
    const horizontal = [0, 1, 2].map(i => {
      return [i, i + 3, i + 6]
    });
    const diagonal = [
      [2, 4, 6],
      [0, 4, 8]
    ];

    const winArray = [].concat(vertical).concat(horizontal).concat(diagonal);

    let result = winArray.some(indices => {

      return boardArray[indices[0]] === marker && boardArray[indices[1]] === marker && boardArray[indices[2]] === marker
    })
    if (result === true) {
      return marker;

    } else if (boardArray.filter(x => x === 'X' || x === 'O').length === 9) {
      return 'TIE';
    }
  }
  //display game result in board
  const displayResult = (result) => {
    if (result === 'X') {
      boardWrapper.children[0].textContent = 'Y';
      boardWrapper.children[1].textContent = 'O';
      boardWrapper.children[2].textContent = 'U';
      boardWrapper.children[3].textContent = 'W';
      boardWrapper.children[4].textContent = 'I';
      boardWrapper.children[5].textContent = 'N';
    } else if (result === 'TIE') {
      boardWrapper.children[3].textContent = 'T';
      boardWrapper.children[4].textContent = 'I';
      boardWrapper.children[5].textContent = 'E';
    } else if (result === 'O') {
      boardWrapper.children[0].textContent = 'T';
      boardWrapper.children[1].textContent = 'R';
      boardWrapper.children[2].textContent = 'Y';
      boardWrapper.children[6].textContent = 'A';
      boardWrapper.children[7].textContent = 'G';
      boardWrapper.children[8].textContent = 'N';
    }
  };
  //computer generates random
  const computer = () => {
    let index = Math.floor(Math.random() * 9);
    while (boardArray[index] === 'X' || boardArray[index] === 'O' && boardArray.includes(undefined)) {
      index = Math.floor(Math.random() * 9);
    }
    console.log(index);
    return index;
  }
  return {
    boardArray,
    x,
    o,
    clear,
    computer,
    winCheck,
    displayResult
  };

})();

//tie DOM elements (panels) with the game board data
boardWrapper.addEventListener('click', e => {
  e.stopPropagation();
  const index = e.target.dataset.index;
  console.log(index);
  gameBoard.x(index);
  setTimeout(function () {
    gameBoard.o(gameBoard.computer())
  }, 200);
  setTimeout(function () {
    gameBoard.displayResult(gameBoard.winCheck('X'));
    gameBoard.displayResult(gameBoard.winCheck('O'))
  }, 600);

})


//clearing the board using events
window.addEventListener('click', e => {
  e.stopPropagation;

  if (e.target.classList.contains('reset')) {
    gameBoard.clear();
  }
})