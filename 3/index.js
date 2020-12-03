const fs = require('fs')

const input = fs.readFileSync('./3/input', {encoding: 'utf-8'}).split('\n')

const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
]

let multiplied = 0

slopes.forEach(([right, down]) => {
  let col = 0
  let trees = 0
  const lines = input.map(f => f.split(''))

  for (let row = down; row < lines.length; row += down) {
    col += right

    const line = lines[row]
    const wrappedCol = col % line.length

    if (line[wrappedCol] === '#') trees++
  }

  console.log({right, down, t: trees})

  if (multiplied === 0) multiplied = trees
  else multiplied = multiplied * trees
})

console.log({multiplied})

console.log('Done 🎉')
