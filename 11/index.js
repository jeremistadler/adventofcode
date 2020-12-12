let lines = require('fs')
  .readFileSync('./11/input', {encoding: 'utf-8'})
  .split('\n')
  .map(f => f.trim())
  .filter(f => f.length > 0)
  .map(f => f.split(''))

const WIDTH = lines[0].length
const HEIGHT = lines.length

function part1() {
  let current = lines.map(f => f.slice())
  let next = current.map(f => f.slice())

  function hasAdjacentOccupied(grid, x, y) {
    for (let yy = Math.max(0, y - 1); yy <= Math.min(HEIGHT - 1, y + 1); yy++) {
      for (
        let xx = Math.max(0, x - 1);
        xx <= Math.min(WIDTH - 1, x + 1);
        xx++
      ) {
        if (!(xx === x && yy === y) && grid[yy][xx] === '#') return true
      }
    }
    return false
  }

  function canBeFree(grid, x, y) {
    let count = 0

    for (let yy = Math.max(0, y - 1); yy <= Math.min(HEIGHT - 1, y + 1); yy++) {
      for (
        let xx = Math.max(0, x - 1);
        xx <= Math.min(WIDTH - 1, x + 1);
        xx++
      ) {
        if (!(xx === x && yy === y) && grid[yy][xx] === '#') {
          count++
          if (count >= 4) return true
        }
      }
    }
    return false
  }

  function nextLevel() {
    let changes = 0

    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        next[y][x] = current[y][x]

        if (current[y][x] === 'L') {
          if (!hasAdjacentOccupied(current, x, y)) {
            changes++
            next[y][x] = '#'
          }
        }

        if (current[y][x] === '#') {
          if (canBeFree(current, x, y)) {
            changes++
            next[y][x] = 'L'
          }
        }
      }
    }

    let t = current
    current = next
    next = t

    return changes
  }

  while (true) {
    let changes = Math.max(nextLevel(), nextLevel(), nextLevel())

    if (changes === 0) {
      let sum = 0
      current.forEach(line =>
        line.forEach(c => {
          if (c === '#') sum++
        }),
      )
      return sum
    }
  }
}

function part2() {
  let current = lines.map(f => f.slice())
  let next = current.map(f => f.slice())

  function hasAdjacentOccupied(grid, x, y) {
    for (let xx = x + 1; xx <= WIDTH - 1; xx++) {
      if (grid[y][xx] === '#') return true
      if (grid[y][xx] === 'L') break
    }

    for (let yy = y + 1; yy <= HEIGHT - 1; yy++) {
      if (grid[yy][x] === '#') return true
      if (grid[yy][x] === 'L') break
    }

    for (let xx = x - 1; xx >= 0; xx--) {
      if (grid[y][xx] === '#') return true
      if (grid[y][xx] === 'L') break
    }

    for (let yy = y - 1; yy >= 0; yy--) {
      if (grid[yy][x] === '#') return true
      if (grid[yy][x] === 'L') break
    }

    //

    for (let d = 1; ; d++) {
      let xx = x + d
      let yy = y + d
      if (xx > WIDTH - 1) break
      if (yy > HEIGHT - 1) break

      if (grid[yy][xx] === '#') return true
      if (grid[yy][xx] === 'L') break
    }

    for (let d = 1; ; d++) {
      let xx = x + d
      let yy = y - d
      if (xx > WIDTH - 1) break
      if (yy < 0) break

      if (grid[yy][xx] === '#') return true
      if (grid[yy][xx] === 'L') break
    }

    for (let d = 1; ; d++) {
      let xx = x - d
      let yy = y + d
      if (xx < 0) break
      if (yy > HEIGHT - 1) break

      if (grid[yy][xx] === '#') return true
      if (grid[yy][xx] === 'L') break
    }

    for (let d = 1; ; d++) {
      let xx = x - d
      let yy = y - d
      if (xx < 0) break
      if (yy < 0) break

      if (grid[yy][xx] === '#') return true
      if (grid[yy][xx] === 'L') break
    }

    return false
  }

  function canBeFree(grid, x, y) {
    let count = 0

    for (let xx = x + 1; xx <= WIDTH - 1; xx++) {
      if (grid[y][xx] === '#') {
        count++
        break
      }
      if (grid[y][xx] === 'L') break
    }

    for (let yy = y + 1; yy <= HEIGHT - 1; yy++) {
      if (grid[yy][x] === '#') {
        count++
        break
      }
      if (grid[yy][x] === 'L') break
    }

    for (let xx = x - 1; xx >= 0; xx--) {
      if (grid[y][xx] === '#') {
        count++
        break
      }
      if (grid[y][xx] === 'L') break
    }

    for (let yy = y - 1; yy >= 0; yy--) {
      if (grid[yy][x] === '#') {
        count++
        break
      }
      if (grid[yy][x] === 'L') break
    }

    //

    for (let d = 1; ; d++) {
      let xx = x + d
      let yy = y + d
      if (xx > WIDTH - 1) break
      if (yy > HEIGHT - 1) break

      if (grid[yy][xx] === '#') {
        count++
        break
      }
      if (grid[yy][xx] === 'L') break
    }

    for (let d = 1; ; d++) {
      let xx = x + d
      let yy = y - d
      if (xx > WIDTH - 1) break
      if (yy < 0) break

      if (grid[yy][xx] === '#') {
        count++
        break
      }
      if (grid[yy][xx] === 'L') break
    }

    for (let d = 1; ; d++) {
      let xx = x - d
      let yy = y + d
      if (xx < 0) break
      if (yy > HEIGHT - 1) break

      if (grid[yy][xx] === '#') {
        count++
        break
      }
      if (grid[yy][xx] === 'L') break
    }

    for (let d = 1; ; d++) {
      let xx = x - d
      let yy = y - d
      if (xx < 0) break
      if (yy < 0) break

      if (grid[yy][xx] === '#') {
        count++
        break
      }
      if (grid[yy][xx] === 'L') break
    }

    return count >= 5
  }

  function nextLevel() {
    let changes = 0

    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        next[y][x] = current[y][x]

        if (current[y][x] === 'L') {
          if (!hasAdjacentOccupied(current, x, y)) {
            changes++
            next[y][x] = '#'
          }
        }

        if (current[y][x] === '#') {
          if (canBeFree(current, x, y)) {
            changes++
            next[y][x] = 'L'
          }
        }
      }
    }

    let t = current
    current = next
    next = t

    return changes
  }

  while (true) {
    let changes = Math.max(nextLevel(), nextLevel(), nextLevel())

    if (changes === 0) {
      let sum = 0
      current.forEach(line =>
        line.forEach(c => {
          if (c === '#') sum++
        }),
      )
      return sum
    }
  }
}

console.log('Part 1', part1())
console.log('Part 2', part2())
