// global variables
const bird = document.querySelector("#bird")
const target = document.querySelector("#target")
const blood = document.querySelector("#blood")
const scoreDisplay = document.querySelector("#score")
const gunSound = document.querySelector(".shot")
const bestDisplay = document.querySelector("#best-score")
const timerDisplay = document.querySelector("#timer")
const levelDisplay = document.querySelector("#level")
const gameArea = document.querySelector("#game-area")

let score
let bestScore
let timeLeft = 20
let level = 1

let moveInterval = 1400
let gameTimer
let birdMovement
let levelCountdown

// gun shot game sound functions will go here
target.addEventListener("click", () => {
  gunSound.currentTime = 0
  gunSound.play()
  score += 10
  scoreDisplay.textContent = score
})

// Move target with mouse
window.addEventListener("mousemove", (event) => {
  target.style.left = event.pageX + "px"
  target.style.top = event.pageY + "px"
})

// her we will start game
const startGame = () => {
  score = 0
  timeLeft = 20
  scoreDisplay.textContent = score
  timerDisplay.textContent = timeLeft
  bestDisplay.textContent = bestScore

  countdownStart(() => {
    startLevel()
  })
}

// for now here i have given the  countdown before game starts in the same box but the final design will be implemented later
const countdownStart = (callback) => {
  let count = 3
  timerDisplay.textContent = "Start in " + count
  let startCount = setInterval(() => {
    count--
    if (count > 0) {
      timerDisplay.textContent = "Start in " + count
    } else {
      clearInterval(startCount)
      callback()
    }
  }, 1000)
}

// level one starts here
const startLevel = () => {
  levelDisplay.textContent = level
  moveBirdRandomly()

  gameTimer = setInterval(() => {
    timeLeft--
    timerDisplay.textContent = timeLeft
    if (timeLeft <= 0) {
      clearInterval(gameTimer)
      clearInterval(birdMovement)
      saveBestScore()
      levelUp()
    }
  }, 1000)

  birdMovement = setInterval(moveBirdRandomly, moveInterval)
}

// Move bird randomly avoiding corners because the bird without this logic appears more in the corner
function moveBirdRandomly() {
  const padding = 50
  const maxX = gameArea.clientWidth - bird.clientWidth - padding
  const maxY = gameArea.clientHeight - bird.clientHeight - padding

  const randomX = Math.floor(Math.random() * maxX) + padding / 2
  const randomY = Math.floor(Math.random() * maxY) + padding / 2

  bird.style.left = randomX + "px"
  bird.style.top = randomY + "px"
  bird.style.display = "block" // bird stays visible
}

// Save best score per level so that user can try to beat it their own best
function saveBestScore() {
  if (score > bestScore) {
    bestScore = score
    bestDisplay.textContent = bestScore
  }
}

// Level up logic
function levelUp() {
  if (level >= 3) {
    alert("Game Over! Final Best Score: " + bestScore)
    level = 1
    moveInterval = 1400
    return
  }

  let count = 3
  timerDisplay.textContent = "Next Level in " + count

  levelCountdown = setInterval(() => {
    count--
    timerDisplay.textContent = "Next Level in " + count
    if (count <= 0) {
      clearInterval(levelCountdown)
      level++
      if (level === 2) moveInterval = 900
      if (level === 3) moveInterval = 700
      startGame()
    }
  }, 1000)
}

// Hit detection — score increases instantly when bird is clicked
bird.addEventListener("click", (event) => {
  score += 10
  scoreDisplay.textContent = score
  showBlood(event.pageX, event.pageY)
})

// Blood effect on hit
function showBlood(x, y) {
  blood.style.left = x - 30 + "px"
  blood.style.top = y - 30 + "px"
  blood.classList.remove("hidden")

  setTimeout(() => {
    blood.classList.add("hidden")
  }, 200)
}

// Start game when clicking anywhere
document.body.addEventListener("click", function startClick(e) {
  document.body.removeEventListener("click", startClick)
  startGame()
})
