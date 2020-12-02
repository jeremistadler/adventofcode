const fs = require('fs')

console.log('Starting...')

const inputClone = fs
  .readFileSync('./2019/2/input', {encoding: 'utf-8'})
  .split(',')
  .map(f => parseInt(f.trim(), 10))

for (let noun = 0; noun < 100; noun++) {
  for (let verb = 0; verb < 100; verb++) {
    const input = inputClone.slice()
    input[1] = noun
    input[2] = verb
    for (let i = 0; ; ) {
      const v = input[i]
      const a = input[input[i + 1]]
      const b = input[input[i + 2]]
      const outIndex = input[i + 3]

      if (v === 1) {
        input[outIndex] = a + b
        i += 4
      } else if (v === 2) {
        input[outIndex] = a * b
        i += 4
      } else if (v === 99) {
        break
      } else {
        throw new Error(v)
      }

      if (input[0] === 19690720) console.log({verb, noun})
    }
  }
}

console.log('...Done')
