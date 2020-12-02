const fs = require('fs')

console.log('Hello world!')

const input = fs
  .readFileSync('./1/input', {encoding: 'utf-8'})
  .split('\n')
  .map(f => parseInt(f, 10))

for (let x = 0; x < input.length; x++) {
  for (let y = 0; y < input.length; y++) {
    for (let z = 0; z < input.length; z++) {
      const sum = input[y] + input[x] + +input[z]

      if (sum === 2020)
        console.log(
          input[y],
          input[x],
          input[z],
          'sum: ',
          sum,
          'mul: ',
          input[y] * input[x] * input[z],
        )
    }
  }
}

console.log('Done')
