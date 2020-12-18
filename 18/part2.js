let allSums = 0

require('fs')
  .readFileSync('./18/input', 'utf-8')
  .split('\n')
  .map(f => f.trim())
  .filter(f => f.length > 0)
  .forEach(line => {
    let chars = line
      .split('')
      .map(f => f.trim())
      .filter(f => f.length > 0)
      .map(f => {
        if (['(', ')', '*', '+'].includes(f)) return f
        return parseInt(f)
      })

    let length = chars.length

    while (true) {
      reduce(chars)
      let newLength = chars.length
      if (newLength === length) {
        allSums += chars[0]
        return
      }
      length = newLength
    }
  })

console.log('Result', {allSums})

function reduce(chars) {
  for (let i = 0; i < chars.length - 2; i++) {
    const a = chars[i]
    const b = chars[i + 1]
    const c = chars[i + 2]
    const pre = chars[i - 1]
    const post = chars[i + 3]

    // Addition
    if (typeof a === 'number' && b === '+' && typeof c === 'number') {
      chars[i] = a + c
      chars.splice(i + 1, 2)
      continue
    }

    // Multiplication
    if (
      typeof a === 'number' &&
      b === '*' &&
      typeof c === 'number' &&
      pre !== '+' &&
      post !== '+'
    ) {
      chars[i] = a * c
      chars.splice(i + 1, 2)
      continue
    }

    // Unwrap paranthesis
    if (typeof b === 'number' && a === '(' && c === ')') {
      chars[i] = b
      chars.splice(i + 1, 2)
      continue
    }
  }
}
