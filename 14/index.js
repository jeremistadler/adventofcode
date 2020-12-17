function part1() {
  let lines = require('fs')
    .readFileSync('./14/input', 'utf-8')
    .split('\n')
    .map(f => f.trim())
    .filter(f => f.length > 0)

  let mem = new Map()
  let maskOn = new Set()
  let maskOff = new Set()
  let added = new Set()

  for (const line of lines) {
    if (line.startsWith('mask')) {
      maskOff.clear()
      maskOn.clear()
      line
        .split(' ')[2]
        .split('')
        .forEach((maskLetter, index) => {
          if (maskLetter === 'X') return
          if (maskLetter === '1') maskOn.add(index)
          if (maskLetter === '0') maskOff.add(index)
        })
    } else {
      let address = parseInt(line.split('[')[1].split(']')[0])
      let prevValue = Array.from({length: 36}).map(() => '0')
      let val = parseInt(line.split(' ')[2])
      let valAsBinary = val.toString(2).padStart(36, '0')

      valAsBinary.split('').forEach((l, i) => {
        if (l === '1') {
          if (maskOff.has(i)) return
          prevValue[i] = '1'
        }
      })

      for (const i of maskOn) {
        prevValue[i] = '1'
      }

      mem.set(address, prevValue)
    }
  }

  return [...mem.values()].reduce((sum, prev) => {
    let cu = parseInt(prev.join(''), 2)
    return sum + parseInt(prev.join(''), 2)
  }, 0)
}

function part2() {
  let lines = require('fs')
    .readFileSync('./14/input', 'utf-8')
    .split('\n')
    .map(f => f.trim())
    .filter(f => f.length > 0)

  let mem = new Map()
  let mask = []

  for (const line of lines) {
    if (line.startsWith('mask')) {
      mask = line.split(' ')[2].split('')
    } else {
      let address = parseInt(line.split('[')[1].split(']')[0])
      let prevValue = Array.from({length: 36}).map(() => 0)
      let val = parseInt(line.split(' ')[2]).toString(2).padStart(36, '0')
      let binAddress = address
        .toString(2)
        .padStart(36, '0')
        .split('')
        .map(f => (f === '1' ? 1 : 0))

      val.split('').forEach((l, i) => {
        if (l === '1') {
          if (mask[i] === '0') return
          prevValue[i] = 1
        }
      })

      for (let i = 0; i < mask.length; i++) {
        if (mask[i] === '1') {
          prevValue[i] = 1
          binAddress[i] = 1
        }
      }

      saveFloating(binAddress, parseInt(line.split(' ')[2]), 0)
    }
  }

  function saveFloating(addr, value, i) {
    if (i === addr.length) {
      mem.set(parseInt(addr.join(''), 2), value)
      return
    }

    if (mask[i] === 'X') {
      let v0 = addr.slice()
      let v1 = addr.slice()
      v0[i] = 0
      v1[i] = 1
      saveFloating(v0, value, i + 1)
      saveFloating(v1, value, i + 1)
    } else saveFloating(addr, value, i + 1)
  }

  return [...mem.values()].reduce((sum, prev) => {
    return sum + prev
  }, 0)
}

console.log('Part 1', part1())
console.log('Part 2', part2())
