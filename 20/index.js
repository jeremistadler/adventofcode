let input = require('fs')
  .readFileSync('./20/input', 'utf-8')
  .split('\n')
  .map(f => f.trim())
  .filter(f => f.length > 0)

let edges = new Map()
let tiles = []
let currentTile = null
let grid = new Map()

// for (let rowI = 1; rowI < size; rowI++) {
//   const row = tile.rows[rowI].split('')

//   for (let col = 1; col < row.length - 1; col++) {
//     if (row[col] === '#')
//       grid.set(xyzToMap(col - 1 + globalX, rowI - 1 + globalY), {
//         x: col - 1 + globalX,
//         y: rowI - 1 + globalY,
//       })
//   }
// }

for (let i = 0; i < input.length; i++) {
  const line = input[i]

  if (currentTile == null || line.startsWith('Tile ')) {
    if (currentTile != null) addTile(currentTile)
    currentTile = {
      id: line.split(' ')[1].split(':')[0],
      rows: [],
      edges: [],
      edgeTiles: [],
      edgeTilesSum: 0,
    }
  } else currentTile.rows.push(line)
}
addTile(currentTile)

// let sum = 0

// for (let tileI = 0; tileI < tiles.length; tileI++) {
//   for (let rowI = 1; rowI < tiles[tileI].rows.length - 1; rowI++) {
//     const row = tiles[tileI].rows[rowI].split('')

//     for (let col = 1; col < row.length - 1; col++) {
//       if (row[col] === '#') sum++
//     }
//   }
// }

// console.log(sum)

// for (let i = 1; i < 10; i++) {
//   console.log(sum - 15 * i)
// }

// 2425
// 2410
// 2395
// 2380
// 2365
// 2350
// 2335

tiles.forEach(tile => {
  tile.edgeTiles = tile.edges.slice(0, 4).map(edge => {
    let matching = edges.get(edge)
    return matching.find(f => f !== tile) ?? null
  })

  console.log(
    tile.id,
    tile.edgeTiles.map(f => (f == null ? f : f.id)),
  )

  tile.edgeTilesSum = tile.edgeTiles.filter(f => f !== null).length
})

function updateTileStats(tile) {
  tile.edges = tileToEdges(tile)

  tile.edgeTiles = tile.edges.slice(0, 4).map(edge => {
    let matching = edges.get(edge)
    return matching.find(f => f !== tile) ?? null
  })

  tile.edgeTilesSum = tile.edgeTiles.filter(f => f !== null).length
}

tiles.sort((a, b) => a.edgeTilesSum - b.edgeTilesSum)
let corners = tiles.slice(0, 4)

function flipHorizontal(tile) {
  for (let i = 0; i < tile.rows.length; i++) {
    tile.rows[i] = tile.rows[i].split('').reverse().join('')
  }
}

function rotate(tile) {
  let n = []
  let rows = tile.rows.map(r => r.split(''))

  for (let i = 0; i < tile.rows.length; i++) {
    n.push(new Array(rows.length))
  }

  for (let x = 0; x < rows.length; x++) {
    for (let y = 0; y < rows.length; y++) {
      var k = rows.length - 1 - y
      n[k][x] = rows[x][y]
    }
  }

  tile.rows = n.map(f => f.join(''))
}

function findOrgTop(tile, targetTop) {
  for (let flip = 0; flip < 2; flip++) {
    for (let rot = 0; rot < 4; rot++) {
      if (tile.rows[0] === targetTop) return
      rotate(tile)
    }
    flipHorizontal(tile)
  }

  console.log('top rot not found', tile.id, targetTop)
}

function findOrgRight(tile, target) {
  for (let flip = 0; flip < 2; flip++) {
    for (let rot = 0; rot < 4; rot++) {
      if (getLeftEdge(tile) === target) return
      rotate(tile)
    }
    flipHorizontal(tile)
  }

  console.log('right rot not found', tile.id, target)
}

{
  let topLeftCorner = corners.find(
    f => f.edgeTiles[0] !== null && f.edgeTiles[1] !== null,
  )
  console.log('Starting at', topLeftCorner.id)

  let currentEdge = topLeftCorner
  let starts = [currentEdge]

  while (true) {
    let lastEdge = currentEdge
    currentEdge = currentEdge.edgeTiles[0]

    if (currentEdge == null) break

    findOrgTop(currentEdge, lastEdge.rows[lastEdge.rows.length - 1])
    updateTileStats(currentEdge)
    starts.push(currentEdge)
  }

  for (let i = 0; i < starts.length; i++) {
    const start = starts[i]

    let curr = start
    console.log('Going down to', curr.id)

    let globalX = 0
    let globalY = i * 8
    addToGrid(curr, globalX, globalY)

    let last = curr
    curr = start.edgeTiles[1]

    while (true) {
      globalX += 8

      findOrgRight(curr, getRightEdge(last))
      updateTileStats(curr)
      addToGrid(curr, globalX, globalY)

      last = curr
      curr = curr.edgeTiles[1]

      if (curr == null) break

      console.log('Going right to', curr.id)
    }
  }

  let max = 0
  grid.forEach(item => {
    max = Math.max(item.x, item.y, max)
  })

  console.log({max})

  max = Math.ceil(max / 8) * 8

  let arrayGrid = []
  for (let y = 0; y < max; y++) {
    const arr = []
    arrayGrid.push(arr)

    for (let x = 0; x < max; x++) {
      arr.push(grid.has(xyzToMap(x, y)) ? '#' : '.')
    }
  }

  console.log(arrayGrid.map(f => f.join('')).join('\n'))
  console.log('Grid size', grid.size)
}

function addToGrid(tile, globalX, globalY) {
  let size = 7

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      grid.set(xyzToMap(globalX + x, globalY + y), {
        x: globalX + x,
        y: globalY + y,
      })
    }
  }
}

function xyzToMap(x, y) {
  return x * 100000 + y
}

function getRightEdge(tile) {
  let right = []
  tile.rows.forEach(row => {
    right.push(row[row.length - 1])
  })
  return right.join('')
}

function getLeftEdge(tile) {
  let l = []
  tile.rows.forEach(row => {
    l.push(row[0])
  })
  return l.join('')
}

function addEdge(str, tile) {
  let prev = edges.get(str)
  if (prev === undefined) {
    edges.set(str, [tile])
  } else prev.push(tile)
}

function tileToEdges(tile) {
  let left = []
  let right = []

  tile.rows.forEach(row => {
    left.push(row[0])
    right.push(row[row.length - 1])
  })

  return [
    tile.rows[0],
    right.join(''),
    tile.rows[tile.rows.length - 1],
    left.join(''),

    tile.rows[0].split('').reverse().join(''),
    right.reverse().join(''),
    tile.rows[tile.rows.length - 1].split('').reverse().join(''),
    left.reverse().join(''),
  ]
}

function addTile(tile) {
  tiles.push(tile)

  tile.edges = tileToEdges(tile)
  tile.edges.forEach(edge => {
    addEdge(edge, tile)
  })
}
