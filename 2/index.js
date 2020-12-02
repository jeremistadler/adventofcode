const fs = require('fs')

console.log('Starting...')

const valid = fs
  .readFileSync('./2/input', {encoding: 'utf-8'})
  .split('\n')
  .filter(line => {
    const [ranges, letterAndColon, passwordStr] = line.split(' ')
    const [lowerStr, upperStr] = ranges.split('-')
    const lower = parseInt(lowerStr)
    const upper = parseInt(upperStr)
    const letter = letterAndColon.replace(':', '')
    const passwordLetters = passwordStr.split('')
    const count = passwordLetters.filter(p => p === letter).length

    const qq1 = passwordLetters[lower - 1] === letter
    const qq2 = passwordLetters[upper - 1] === letter

    if (qq1 && qq2) return false

    return qq1 || qq2
  })

console.log(valid.length)
console.log(valid)

console.log('...Done')
