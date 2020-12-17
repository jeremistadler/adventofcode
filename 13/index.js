let [startStr, busesStr] = require('fs')
  .readFileSync('./13/input', 'utf-8')
  .split('\n')
  .map(f => f.trim())
  .filter(f => f.length > 0)

let busesRaw = busesStr.split(',')
let start = parseInt(startStr)

function part1() {
  let buses = busesRaw
    .map(timeStr => {
      if (timeStr === 'x') return null
      let period = parseInt(timeStr)

      let next = Math.ceil(start / period) * period
      let timeLeft = next - start

      return {id: period, timeLeft}
    })
    .filter(f => f != null)
    .sort((a, b) => a.timeLeft - b.timeLeft)

  return buses[0].timeLeft * buses[0].id
}

function part2() {
  let totalTime = 0
  let increaseBy = 1

  busesRaw.forEach((id, offset) => {
    if (id === 'x') return
    let time = parseInt(id, 10)

    do {
      totalTime += increaseBy
    } while ((totalTime + offset) % time !== 0)

    const t1 = totalTime

    do {
      totalTime += increaseBy
    } while ((totalTime + offset) % time !== 0)

    increaseBy = totalTime - t1
    totalTime = t1
  })

  return totalTime
}

console.log('Part 1', part1())
console.log('Part 2', part2())
