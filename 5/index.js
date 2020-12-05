const fs = require('fs')

let lines = fs.readFileSync('./5/input', {encoding: 'utf-8'}).split('\n')

const ALLlines = []

const letters = ['F', 'B']
const SEATS = ['L', 'R']

letters.forEach(l1 => {
  letters.forEach(l2 => {
    letters.forEach(l3 => {
      letters.forEach(l4 => {
        letters.forEach(l5 => {
          letters.forEach(l6 => {
            letters.forEach(l7 => {
              SEATS.forEach(s1 => {
                SEATS.forEach(s2 => {
                  SEATS.forEach(s3 => {
                    const lll = l1 + l2 + l3 + l4 + l5 + l6 + l7 + s1 + s2 + s3
                    ALLlines.push(lll)
                  })
                })
              })
            })
          })
        })
      })
    })
  })
})

const uniqueItems = []

const linesSet = new Set(lines)
ALLlines.forEach(l => {
  if (!linesSet.has(l)) uniqueItems.push(l)
})

let maxid = 0
let seenIds = []
const seenSet = new Set()

uniqueItems.forEach(line => {
  let rowMax = 127
  let rowMin = 0

  let colMax = 7
  let colMin = 0

  line.split('').forEach(char => {
    if (char === 'F') {
      rowMax = Math.floor(rowMin + (rowMax - rowMin) / 2)
    }
    if (char === 'B') {
      rowMin = Math.ceil(rowMin + (rowMax - rowMin) / 2)
    }
    if (char === 'L') {
      colMax = Math.floor(colMin + (colMax - colMin) / 2)
    }
    if (char === 'R') {
      colMin = Math.ceil(colMin + (colMax - colMin) / 2)
    }
  })

  const row =
    rowMin === rowMax
      ? rowMin
      : rowMin === 0
      ? Math.ceil(rowMax / 2)
      : Math.ceil(rowMin + rowMax / rowMin / 2)
  const col =
    colMin === colMax
      ? colMin
      : colMin === 0
      ? Math.ceil(colMax / 2)
      : Math.ceil(colMin + colMax / colMin / 2)

  const id = row * 8 + col

  maxid = Math.max(id, maxid)

  if (!seenSet.has(id)) {
    seenSet.add(id)
    seenIds.push(id)
  }

  console.log({row, col, id})
})
