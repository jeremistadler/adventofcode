let lines = require('fs')
  .readFileSync('./12/input', 'utf-8')
  .split('\n')
  .map(f => f.trim())
  .filter(f => f.length > 0)

function part1() {
  let dir = 0
  let x = 0
  let y = 0

  lines.forEach(line => {
    let inst = line[0]
    let num = parseInt(line.substr(1))

    if (inst === 'L') dir -= num
    if (inst === 'R') dir += num

    if (inst === 'N') y += num
    if (inst === 'E') x += num
    if (inst === 'S') y -= num
    if (inst === 'W') x -= num

    if (inst === 'F') {
      let dir2 = (dir + 360 * 100) % 360
      if (dir2 === 0) x += num
      else if (dir2 === 90) y -= num
      else if (dir2 === 180) x -= num
      else if (dir2 === 270) y += num
    }
  })

  return Math.abs(x) + Math.abs(y)
}

function part2() {
  let shipX = 0
  let shipY = 0

  let wayX = 10
  let wayY = 1

  lines.forEach(line => {
    let inst = line[0]
    let num = parseInt(line.substr(1))

    if (inst === 'F') {
      shipX += wayX * num
      shipY += wayY * num
    }

    if (inst === 'N') wayY += num
    if (inst === 'E') wayX += num
    if (inst === 'S') wayY -= num
    if (inst === 'W') wayX -= num
    if (inst === 'R' || inst === 'L') {
      if (inst === 'L') num = -num

      let dir = (num + 360 * 100) % 360
      dir /= 90

      let oldX = wayX
      let oldY = wayY

      if (dir === 0) {
      } else if (dir === 1) {
        wayX = oldY
        wayY = -oldX
      } else if (dir === 2) {
        wayX = -wayX
        wayY = -wayY
      } else if (dir === 3) {
        wayX = -oldY
        wayY = oldX
      }
    }
  })

  return Math.abs(shipX) + Math.abs(shipY)
}

console.log('Part 1', part1())
console.log('Part 2', part2())
