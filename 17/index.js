let input = require('fs')
  .readFileSync('./17/input', 'utf-8')
  .split('\n')
  .map(f => f.trim())
  .filter(f => f.length > 0)
  .map(f => f.split(''))

function part1() {
  let current = new Map()
  let next = new Map()
  let checked = new Set()

  input.forEach((line, y) => {
    line.forEach((letter, x) => {
      if (letter === '#') current.set(xyzToMap(x, y, 0), [x, y, 0])
    })
  })

  for (let i = 0; ; i++) {
    next.clear()
    checked.clear()

    for (const [, item] of current) {
      let [x, y, z] = item
      checkItem(x, y, z)
    }

    let tmp = next
    next = current
    current = tmp

    if (i === 5) return current.size
  }

  function checkItem(x, y, z) {
    let count = countNeightbours(current, x, y, z)
    if (count === 0) return

    const index = xyzToMap(x, y, z)

    if (current.has(index) === true) {
      if (count === 2 || count === 3) {
        next.set(index, [x, y, z])
      }
    } else {
      if (count === 3) {
        next.set(index, [x, y, z])
      }
    }

    for (let xx = x - 1; xx <= x + 1; xx++) {
      for (let yy = y - 1; yy <= y + 1; yy++) {
        for (let zz = z - 1; zz <= z + 1; zz++) {
          const i = xyzToMap(xx, yy, zz)
          if (checked.has(i) === false) {
            checked.add(i)
            checkItem(xx, yy, zz)
          }
        }
      }
    }
  }

  function countNeightbours(grid, x, y, z) {
    let count = 0

    for (let xx = x - 1; xx <= x + 1; xx++) {
      for (let yy = y - 1; yy <= y + 1; yy++) {
        for (let zz = z - 1; zz <= z + 1; zz++) {
          if (
            !(xx === x && yy === y && zz === z) &&
            grid.has(xyzToMap(xx, yy, zz))
          ) {
            count++
            if (count === 4) return count
          }
        }
      }
    }

    return count
  }

  function xyzToMap(x, y, z) {
    return x * 1000000 + y * 1000 + z
  }
}

function part2() {
  let current = new Map()
  let next = new Map()

  let checked = new Set()
  let queue = []

  input.forEach((line, y) => {
    line.forEach((letter, x) => {
      if (letter === '#') current.set(xyzwToMap(x, y, 0, 0), [x, y, 0, 0])
    })
  })

  for (let i = 0; ; i++) {
    next.clear()
    checked.clear()

    for (const [, item] of current) {
      let [x, y, z, w] = item

      const i = xyzwToMap(x, y, z, w)
      checked.add(i)
      queue.push(item)
    }

    while (queue.length > 0) {
      let [x, y, z, w] = queue.pop()
      checkItem(x, y, z, w)
    }

    let tmp = next
    next = current
    current = tmp

    if (i === 5) return current.size
  }

  function checkItem(x, y, z, w) {
    let count = countNeightbours(current, x, y, z, w)
    if (count === 0) return

    const index = xyzwToMap(x, y, z, w)

    if (current.has(index) === true) {
      if (count === 2 || count === 3) {
        next.set(index, [x, y, z, w])
      }
    } else {
      if (count === 3) {
        next.set(index, [x, y, z, w])
      }
    }

    for (let xx = x - 1; xx <= x + 1; xx++) {
      for (let yy = y - 1; yy <= y + 1; yy++) {
        for (let zz = z - 1; zz <= z + 1; zz++) {
          for (let ww = w - 1; ww <= w + 1; ww++) {
            const i = xyzwToMap(xx, yy, zz, ww)
            if (checked.has(i) === false) {
              checked.add(i)
              queue.push([xx, yy, zz, ww])
            }
          }
        }
      }
    }
  }

  function countNeightbours(grid, x, y, z, w) {
    let count = 0

    for (let xx = x - 1; xx <= x + 1; xx++) {
      for (let yy = y - 1; yy <= y + 1; yy++) {
        for (let zz = z - 1; zz <= z + 1; zz++) {
          for (let ww = w - 1; ww <= w + 1; ww++) {
            if (
              !(xx === x && yy === y && zz === z && ww === w) &&
              grid.has(xyzwToMap(xx, yy, zz, ww))
            ) {
              count++
              if (count === 4) return count
            }
          }
        }
      }
    }

    return count
  }

  function xyzwToMap(x, y, z, w) {
    return w * 1000000000 + x * 1000000 + y * 1000 + z
  }
}

console.log('Part 1', part1())
console.log('Part 2', part2())
