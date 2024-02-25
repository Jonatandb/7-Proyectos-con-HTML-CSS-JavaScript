const usedLettersElement = document.getElementById('usedLetters')
const wordContainer = document.getElementById('wordContainer')
const startButton = document.getElementById('startButton')

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
ctx.canvas.width = 120
ctx.canvas.height = 160

// x  y  w  h
const bodyParts = [
  [4, 2, 1, 1], // Head
  [4, 3, 1, 2], // Body
  [3, 5, 1, 1], // Left Foot
  [5, 5, 1, 1], // Right Foot
  [3, 3, 1, 1], // Left Arm
  [5, 3, 1, 1]  // Right Arm
]

let selectedWord
let usedLetters
let mistakes
let hits

const addLetter = letter => {
  const letterElement = document.createElement('span')
  letterElement.innerHTML = letter
  usedLettersElement.appendChild(letterElement)
}

const addBodyPart = bodyPart => {
  ctx.fillStyle = '#fff'
  ctx.fillRect(...bodyPart)
}

const wrongLetter = () => {
  addBodyPart(bodyParts[mistakes])
  mistakes++
  if (mistakes == bodyParts.length) endGame()
}

const drawFace = () => {
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 0.05;

  ctx.moveTo(4.2, 2.2);
  ctx.lineTo(4.4, 2.4);
  ctx.moveTo(4.4, 2.2);
  ctx.lineTo(4.2, 2.4);

  ctx.moveTo(4.6, 2.2);
  ctx.lineTo(4.8, 2.4);
  ctx.moveTo(4.8, 2.2);
  ctx.lineTo(4.6, 2.4);
  ctx.stroke();

  ctx.beginPath();
  //     (x, y, radio, ángulo inicial, ángulo final, sentido antihorario)
  ctx.arc(4.5, 2.7, 0.1, 180, Math.PI, true);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 0.05;
  ctx.stroke();
}

const endGame = () => {
  document.removeEventListener('keydown', letterEvent)
  startButton.style.display = 'block'
  if (mistakes < bodyParts.length) {
    const jsConfetti = new JSConfetti()
    jsConfetti.addConfetti()
  } else {
    drawFace()
  }
}

const correctLetter = letter => {
  const { children } = wordContainer
  for (let i = 0; i < children.length; i++) {
    if (children[i].innerHTML == letter) {
      children[i].classList.remove('hidden')
      hits++
    }
  }
  if (hits == selectedWord.length) endGame()
}

const letterInput = letter => {
  if (selectedWord.includes(letter)) {
    correctLetter(letter)
  } else {
    wrongLetter()
  }
  addLetter(letter)
  usedLetters.push(letter)
}

const letterEvent = event => {
  const newLetter = event.key.toUpperCase()
  if (newLetter.match(/^[a-z]$/i) && !usedLetters.includes(newLetter)) {
    letterInput(newLetter)
  }
}

const drawWord = () => {
  selectedWord.forEach(letter => {
    const letterElement = document.createElement('span')
    letterElement.innerHTML = letter
    letterElement.classList.add('letter', 'hidden')
    wordContainer.appendChild(letterElement)
  });
}

const selectRandomWord = () => {
  const word = words[Math.floor(Math.random() * words.length)].toUpperCase()
  selectedWord = word.split('')
  console.log(selectedWord);
}

const drawHangman = () => {
  ctx.canvas.width = 120
  ctx.canvas.height = 160
  ctx.scale(20, 20)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#d95d39'
  //           x  y  w  h
  ctx.fillRect(0, 7, 4, 1)
  ctx.fillRect(1, 0, 1, 7)
  ctx.fillRect(2, 0, 3, 1)
  ctx.fillRect(4, 1, 1, 1)
}

const startGame = () => {
  usedLetters = []
  mistakes = 0
  hits = 0
  wordContainer.innerHTML = ''
  usedLettersElement.innerHTML = ''
  startButton.style.display = 'none'
  drawHangman()
  selectRandomWord()
  drawWord()
  document.addEventListener('keydown', letterEvent)
}

startButton.addEventListener('click', startGame)
