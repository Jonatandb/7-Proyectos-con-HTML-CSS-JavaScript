const palleteContainer = document.getElementById('palleteContainer');
const colorValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
const PALLETE_SIZE = 5

const createPallete = () => {
  for (let i = 0; i < PALLETE_SIZE; i++) {
    const palletElement = document.createElement('div')
    palletElement.classList.add('palleteItem')
    palleteContainer.appendChild(palletElement)
  }
  updatePallete()
}

const colorize = element => {
  let color = '#'
  for (let i = 0; i < 6; i++) {
    const randomValue = colorValues[Math.floor(Math.random() * colorValues.length)]
    color += randomValue
  }
  element.style.backgroundColor = color
  element.innerHTML = `<span class='colorHex'>${color}</span>`
}

const updatePallete = () => {
  for (let i = 0; i < palleteContainer.children.length; i++) {
    colorize(palleteContainer.children[i])
  }
}

createPallete()