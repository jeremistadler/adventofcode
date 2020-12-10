let fs = require('fs')

let lines = fs
  .readFileSync('./10/input', {encoding: 'utf-8'})
  .split('\n')
  .filter(f => f.trim().length > 0)
  .map(f => parseInt(f))

lines.sort((a, b) => a - b)
lines.unshift(0)
lines.push(lines[lines.length - 1] + 3)

let diff1 = 0
let diff3 = 0
let last = 0

for (let i = 0; i < lines.length; i++) {
  const diff = lines[i] - last
  last = lines[i]

  if (diff === 1) diff1++
  if (diff === 3) diff3++
}

let cache = new Map()
function sumItems(i) {
  if (cache.has(i)) return cache.get(i)
  let sum = 0

  for (let ii = i + 1; ii < lines.length; ii++) {
    if (lines[ii] - lines[i] < 4) {
      if (ii === lines.length - 1) sum++
      else sum += sumItems(ii)
    }
  }

  cache.set(i, sum)
  return sum
}

console.log('Part1', {diff1, diff3, mul: diff1 * diff3})
console.log('Part2', sumItems(0))
