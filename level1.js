// global variables
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
let level = 1
let moveInterval = 1200
let gameTimer
let birdMovement

// start the game
document.body.addEventListener("click", function startClick() {
  document.body.removeEventListener("click", startClick)
  startGame()
})

// move the target image (png) format with the mouse
window.addEventListener("mousemove", (event) => {
  const targetWidth = target.offsetWidth / 2
  const targetHeight = target.offsetHeight / 2

  target.style.left = event.pageX - targetWidth + "px"
  target.style.top = event.pageY - targetHeight + "px"
})

// clicking on the bird will be count as a shot which will increase the score by 10, play the sound and show blood effect.
bird.addEventListener("click", (event) => {
  score += 10
  scoreDisplay.textContent = score
  showBlood(event.pageX, event.pageY)

  // hide and respawn bird after 1s
  bird.style.display = "none"
  setTimeout(() => {
    moveBirdRandomly()
  }, 1000)
})

// clicking on the bird will be count as a shot which will increase the score by 10, play the sound and show blood effect.
bird.addEventListener("click", () => {
  gunSound.currentTime = 0
  gunSound.play()
  score += 10
  scoreDisplay.textContent = score
})

// here the score resets for the level, the timer starts again from 10secs. starts the countdown before the game starts

const startGame = () => {
  score = 0
  timeLeft = 10
  scoreDisplay.textContent = score
  timerDisplay.textContent = timeLeft
  countdownStart(startLevel)
}

// starts the game after initial countdown of 3s
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

// shows the current level, spawn the bird randomly and displays times up as soon as timer ends.

const startLevel = () => {
  levelDisplay.textContent = level
  moveBirdRandomly()
  gameTimer = setInterval(() => {
    timeLeft--
    timerDisplay.textContent = timeLeft
    if (timeLeft <= 0) {
      clearInterval(gameTimer)
      clearInterval(birdMovement)
      timerDisplay.textContent = "Time`s Up!"
      bird.style.display = "none"
    }
  }, 1000)
  birdMovement = setInterval(moveBirdRandomly, moveInterval)
}

// Bird Movement made random here in which the bird will be visible on the screen in random places
const moveBirdRandomly = () => {
  const maxX = gameArea.clientWidth - bird.clientWidth
  const maxY = gameArea.clientHeight - bird.clientHeight
  const randomX = Math.random() * maxX
  const randomY = Math.random() * maxY
  bird.style.left = randomX + "px"
  bird.style.top = randomY + "px"
  bird.style.display = "block"
}

// here i positioned the blood effect behind the bird, as soon as bird is hit the blood hides after a very shot delay of 0.3s
const showBlood = (x, y) => {
  blood.style.left = x - 30 + "px"
  blood.style.top = y - 30 + "px"
  blood.classList.remove("hidden")
  setTimeout(() => {
    blood.classList.add("hidden")
  }, 200)
}
