let input = require('fs')
  .readFileSync('./18/input', 'utf-8')
  .split('\n')
  .map(f => f.trim())
  .filter(f => f.length > 0)

let allSums = 0

input.forEach(line => {
  let chars = ('+ ' + line)
    .split('')
    .map(f => f.trim())
    .filter(f => f.length > 0)

  console.log(chars)

  allSums += consume(createReader(0, chars), 0).value
})

console.log('Result', {allSums})

function createReader(index, chars) {
  return () => {
    return {
      char: chars[index],
      next: createReader(index + 1, chars),
    }
  }
}

function consume(read) {
  let value = 0
  while (true) {
    let {char: op, next: firstCharReader} = read()
    if (op == null) return {value, next: firstCharReader}

    let {char: c2, next: opReader} = firstCharReader()
    console.log({op, c2})

    let nextVal = 0
    if (c2 == null) return {value, next: opReader}
    if (c2 === '(') {
      let r = consume(firstCharReader)
      nextVal = r.value
      read = r.next
    } else if (op === ')') return {value, next: firstCharReader}
    else {
      nextVal = parseInt(c2)
      if (isNaN(nextVal)) throw new Error('Unknown number ' + c2)
      read = opReader
    }

    if (op === '*') value = value * nextVal
    if (op === '+') value = value + nextVal
    if (op === '(') value = value + nextVal
  }
}
