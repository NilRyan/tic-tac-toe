const boardWrapper = document.querySelector('.board-wrapper')

// create the board
for( let i = 0; i < 9 ; i++){
  const board = document.createElement('div');
  board.classList.add('panel');
  board.setAttribute('data-index', i);
  boardWrapper.appendChild(board);
}

//store data in an array, with functions to insert x, o, and clear the array the altogether
const gameBoard = (() => {
  const boardArray = Array(9);
  const x = (index) => {
    if(boardArray[index] != 'X' && boardArray[index] != 'O' ){
        boardArray[index] = 'X';
        boardWrapper.children[index].textContent = boardArray[index];
    }
  }
  const o = (index) => {
    if(boardArray[index] != 'X' && boardArray[index] != 'O' ){
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
  
  //computer generates random
  const computer = () => {
    let index = Math.floor(Math.random() * 9);
    while (boardArray[index] === 'X' || boardArray[index] === 'O' && boardArray.includes(undefined) ){
      index = Math.floor(Math.random() * 9);
    }
    console.log(index);
    return index;
  }
  return {
    boardArray, x, o, clear, computer
  };

})();

//tie DOM elements (panels) with the game board data
boardWrapper.addEventListener('click', e => {
  e.stopPropagation();
  const index = e.target.dataset.index;
  console.log(index);
  gameBoard.x(index);
  setTimeout(function (){gameBoard.o(gameBoard.computer())}, 250);

})




//clearing the board
window.addEventListener('click', e => {
  e.stopPropagation;
  
  if (e.target.classList.contains('top-bar')){
    gameBoard.clear();
  }
})



// const gameBoard = () => {
//   const boardArray = Array.from(boardWrapper.children.value);
//   console.table(boardArray);
// }