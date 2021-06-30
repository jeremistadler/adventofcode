let input = require('fs')
  .readFileSync('./20/input', 'utf-8')
  .split('\n')
  .map(f => f.trim())
  .filter(f => f.length > 0)

let edges = new Map()
let tiles = []
let currentTile = null

for (let i = 0; i < input.length; i++) {
  const line = input[i]

  if (currentTile == null || line.startsWith('Tile ')) {
    if (currentTile != null) addTile(currentTile)
    currentTile = {
      id: line.split(' ')[1].split(':')[0],
      rows: [],
      edges: [],
    }
  } else currentTile.rows.push(line)
}
addTile(currentTile)

tiles.forEach(tile => {
  let matchingSum = tile.edges.filter(edge => {
    let matching = edges.get(edge)
    return matching.some(f => f !== tile.id)
  }).length

  tile.matchingSum = matchingSum
})

tiles.sort((a, b) => a.matchingSum - b.matchingSum)
console.log(tiles.map(f => f.id))

console.log(
  'Answer',
  tiles.slice(0, 4).reduce((sum, tile) => sum * parseInt(tile.id), 1),
)

function addEdge(str, id) {
  let prev = edges.get(str)
  if (prev === undefined) {
    edges.set(str, [id])
  } else prev.push(id)
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
    tile.rows[tile.rows.length - 1],
    left.join(''),
    right.join(''),

    tile.rows[0].split('').reverse().join(''),
    tile.rows[tile.rows.length - 1].split('').reverse().join(''),
    left.reverse().join(''),
    right.reverse().join(''),
  ]
}

function addTile(tile) {
  tiles.push(tile)
  tile.edges = tileToEdges(tile)
  tile.edges.forEach(edge => {
    addEdge(edge, tile.id)
  })
}
