let fs = require('fs')
let lines = fs
  .readFileSync('./9/input', {encoding: 'utf-8'})
  .split('\n')
  .filter(f => f.trim().length > 0)
  .map(f => parseInt(f))

function part1() {
  let preamble = 25

  for (let i = preamble; i < lines.length; i++) {
    let line = lines[i]
    if (findNext(line, i - preamble, i) === false) return line
  }

  function findNext(s, searchStart, searchEnd) {
    for (let x = searchStart; x < searchEnd; x++) {
      for (let y = searchStart; y < searchEnd; y++) {
        const sum = lines[x] + lines[y]
        if (sum === s) return true
      }
    }
    return false
  }
}

function part2(key) {
  for (let size = 2; size < lines.length; size++) {
    for (let i = 0; i < lines.length; i++) {
      const ss = lines.slice(i, i + size)
      if (ss.length !== size) continue

      const sum = ss.reduce((sss, a) => sss + a, 0)
      if (sum === key) {
        ss.sort((a, b) => a - b)
        return ss.pop() + ss.shift()
      }
    }
  }
}

let key = part1()
console.log('Part 1:', key)
console.log('Part 2:', part2(key))
