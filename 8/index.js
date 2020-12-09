let fs = require('fs')
let lines = fs.readFileSync('./8/input', {encoding: 'utf-8'}).split('\n')

function part1() {
  let acc = 0
  let s = new Set()

  for (let i = 0; i < lines.length; i++) {
    if (s.has(i)) return acc
    s.add(i)

    let [ins, arg] = lines[i].split(' ')

    if (ins === 'acc') {
      acc += parseInt(arg.replace('+', ''))
    }

    if (ins === 'jmp') {
      i += parseInt(arg.replace('+', '')) - 1
    }
  }
}

function part2() {
  for (let ii = 0; ii < lines.length; ii++) {
    let acc = 0
    let s = new Set()

    for (let i = 0; i < lines.length; i++) {
      if (s.has(i)) break
      s.add(i)

      let [ins, arg] = lines[i].split(' ')

      // Change manually to acc and use the best value
      if (ii === i) ins = 'nop'

      if (ins === 'acc') {
        acc += parseInt(arg.replace('+', ''))
      }

      if (ins === 'jmp') {
        i += parseInt(arg.replace('+', '')) - 1
      }

      if (i === lines.length - 1) return acc
    }
  }
}

console.log('Part 1:', part1())
console.log('Part 2:', part2())
