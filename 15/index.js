let input = require('fs')
  .readFileSync('./15/input', 'utf-8')
  .split(',')
  .map(f => f.trim())
  .filter(f => f.length > 0)
  .map(f => parseInt(f))

let map = new Map()

let lastNumber = 0
let turn = 0

input.forEach(item => {
  lastNumber = item
  turn++

  map.set(item, {lastSeen: turn, prevSeen: 0})
})

while (true) {
  turn++
  let item = map.get(lastNumber)
  let newNumber = 0

  if (item.prevSeen !== 0) {
    newNumber = item.lastSeen - item.prevSeen
  }
  lastNumber = newNumber

  let newItem = map.get(newNumber)
  if (newItem === undefined) {
    newItem = {lastSeen: turn, prevSeen: 0}
    map.set(newNumber, newItem)
  } else {
    newItem.prevSeen = newItem.lastSeen
    newItem.lastSeen = turn
  }

  if (turn >= 30000000) return console.log('RESULT', newNumber)
}
