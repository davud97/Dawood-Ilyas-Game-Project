const bird = document.querySelector("#bird")
const target = document.querySelector("#target")
const blood = document.querySelector("#blood")
const scoreDisplay = document.querySelector("#score")
const gunSound = document.querySelector("#shot")
const timerDisplay = document.querySelector("#timer")
const levelDisplay = document.querySelector("#level")
const gameArea = document.querySelector("#game-area")
const gameOver = document.querySelector("#gameOver")

let score = 0
let timeLeft = 10
let level = 2
let moveInterval = 900
let gameTimer
let birdMovement

// Start the game
document.body.addEventListener("click", function startClick() {
  document.body.removeEventListener("click", startClick)
  startGame()
})

// Move target with mouse
window.addEventListener("mousemove", (event) => {
  const targetWidth = target.offsetWidth / 2
  const targetHeight = target.offsetHeight / 2
  target.style.left = event.pageX - targetWidth + "px"
  target.style.top = event.pageY - targetHeight + "px"
})

// Bird click = shot
bird.addEventListener("click", (event) => {
  gunSound.currentTime = 0
  gunSound.play()
  score += 10
  scoreDisplay.textContent = score
  showBlood(event.pageX, event.pageY)

  // hide and respawn bird after 1s
  bird.style.display = "none"
  setTimeout(() => {
    moveBirdRandomly()
  }, 1000)
})

const startGame = () => {
  score = 0
  timeLeft = 10
  scoreDisplay.textContent = score
  timerDisplay.textContent = timeLeft
  countdownStart(startLevel)
}

const countdownStart = (callback) => {
  let count = 3
  timerDisplay.textContent = "Start in " + count
  const startCount = setInterval(() => {
    count--
    if (count > 0) {
      timerDisplay.textContent = "Start in " + count
    } else {
      clearInterval(startCount)
      callback()
    }
  }, 1000)
}

const startLevel = () => {
  levelDisplay.textContent = level
  moveBirdRandomly()
  birdMovement = setInterval(moveBirdRandomly, moveInterval)

  gameTimer = setInterval(() => {
    timeLeft--
    timerDisplay.textContent = timeLeft
    if (timeLeft <= 0) {
      clearInterval(gameTimer)
      clearInterval(birdMovement)
      timerDisplay.textContent = "Time's up!"
    }
  }, 1000)
}

const moveBirdRandomly = () => {
  const padding = 50
  const maxX = gameArea.clientWidth - bird.clientWidth - padding
  const maxY = gameArea.clientHeight - bird.clientHeight - padding
  const randomX = Math.floor(Math.random() * maxX) + padding / 2
  const randomY = Math.floor(Math.random() * maxY) + padding / 2
  bird.style.left = randomX + "px"
  bird.style.top = randomY + "px"
  bird.style.display = "block"
}

const showBlood = (x, y) => {
  blood.style.left = x - 30 + "px"
  blood.style.top = y - 30 + "px"
  blood.classList.remove("hidden")
  setTimeout(() => {
    blood.classList.add("hidden")
  }, 300)
}
