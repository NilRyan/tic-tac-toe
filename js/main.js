const boardWrapper = document.querySelector('.board-wrapper')

// create the board
for( let i = 0; i < 9 ; i++){
  const board = document.createElement('div');
  board.classList.add('panel');
  board.setAttribute('data-index', i);
  boardWrapper.appendChild(board);
}

//store data in an array, with functions to insert x, o, and clear the array altogether
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
  //check board if game is won
  const winCheck = (marker) => {
    //marker is X or O
    const vertical = [0,3,6].map(i=>{return[i,i+1,i+2]});
    const horizontal = [0,1,2].map(i=>{return[i,i+3,i+6]});
    const diagonal = [[2,4,6],[0, 4, 8]];
  
    const winArray = [].concat(vertical).concat(horizontal).concat(diagonal);
    
    let result = winArray.some(indices => { 

    return boardArray[indices[0]] === marker && boardArray[indices[1]] === marker && boardArray[indices[2]] === marker})
    if( result === true ){
      alert('Player ' + marker + ' won');
      gameBoard.clear();
    }
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
    boardArray, x, o, clear, computer, winCheck
  };

})();

//tie DOM elements (panels) with the game board data
boardWrapper.addEventListener('click', e => {
  e.stopPropagation();
  const index = e.target.dataset.index;
  console.log(index);
  gameBoard.x(index);
  setTimeout(function (){gameBoard.o(gameBoard.computer())}, 250);
  setTimeout(function () {
  gameBoard.winCheck('X');
  gameBoard.winCheck('O');  },
  300)
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