const fs = require('fs')

let lines = fs.readFileSync('./6/input', {encoding: 'utf-8'}).split('\n')

let unique = new Set()
let countsPerLetter = {}
let batchSize = 0
let sum = 0

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim()

  if (line === '') {
    let inAll = [...unique].filter(c => countsPerLetter[c] === batchSize).length

    sum += inAll
    unique = new Set()
    countsPerLetter = {}
    batchSize = 0
  }

  if (line !== '') {
    batchSize++
    line.split('').forEach(c => {
      countsPerLetter[c] = (countsPerLetter[c] || 0) + 1
      unique.add(c)
    })
  }
}

console.log(sum)
