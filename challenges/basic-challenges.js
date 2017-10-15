// Challenge 1
function sumNumbers (num1, num 2) {
  var sum = num1 + num2
  return sum
}

// Challenge 2
var myScores = [90, 68, 74, 93, 55]

// Comment Goes Here
function findHighestScore (scoreArray) {
  var highestScore = 0

  scoreArray.forEach(function (score) {
    if (score > highestScore) {
      highestScore = score
    }
  })

  return highestScore
}

findHighestScore(myScores)

