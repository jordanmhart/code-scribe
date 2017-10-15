// Tic Tac Toe - by Jordan Hart
// Imagine a Tic Tac Toe board where each cell is labeled with a number from 1 to 9.
// The first cell is the top left, it would be 1, the top right would be the 3rd,
// and the bottom right is the final one, number 9. 

// COMMENT 1
var activePlayer = 'X'
var cellRegistry = {}
cellRegistry.X = []
cellRegistry.O = []


// COMMENT 2
function endTurn (cellId) {
  claimCell(cellId)
  if(victoryOccurred()) {
    console.log(activePlayer + ' WINS!')
  }
  toggleActivePlayer()
}

// COMMENT 3
function toggleActivePlayer () {
  if (activePlayer === 'X') {
    activePlayer = 'O'
  } else {
    activePlayer = 'X'
  }
}

// COMMENT 4
function claimCell (cellId) {
  cellRegistry[activePlayer].push(cellId)
}

// COMMENT 5
function victoryOccurred () {
  var solutionFound = false

  var solutions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
  ]

  solutions.forEach(function (solution) {
    var thisSolutionWorks = checkArrayForNums(solution[0], solution[1], solution[2])
    if (thisSolutionWorks) {
      solutionFound = true
    }
  })

  return solutionFound
}

function checkArrayForNums (num1, num2, num3) {
  var indexOfNum1 = cellRegistry[activePlayer].indexOf(num1)
  var indexOfNum2 = cellRegistry[activePlayer].indexOf(num2)
  var indexOfNum3 = cellRegistry[activePlayer].indexOf(num3)

  if (indexOfNum1 != -1 && indexOfNum2 != -1 && indexOfNum3 != -1) {
    return true
  } else {
    return false
  }
}

// simulated plays, this replaces an actual GUI where event handlers on the
// UI elements would trigger endTurn with the number of the cell that had been clicked
endTurn(4) // x plays first
endTurn(1) // o plays second
endTurn(7) // x's second turn
endTurn(5) // o's second turn
endTurn(8) // x's third turn
endTurn(9) // o's third turn, O wins!