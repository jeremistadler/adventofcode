let fs = require('fs')
let lines = fs.readFileSync('./7/input', {encoding: 'utf-8'}).split('\n')

let map = new Map()

lines.forEach(line => {
  let [s1, s2] = line.split(' contain ')
  if (!s1 || !s2) return console.log({line, s1, s2})

  let items =
    s2.trim() === 'no other bags.'
      ? []
      : s2.split(', ').map(f => {
          let [c, ...o] = f.trim().replace('.', '').split(' ')
          let name = o.join(' ').trim()
          if (name.endsWith('bag')) name = name + 's'

          return {
            count: parseInt(c.trim()),
            name,
          }
        })

  map.set(s1, {name: s1, items})
})

function part1() {
  let sum = 0

  let canContain = name => {
    if (name === 'shiny gold bags') return true

    let val = map.get(name)
    for (let t of val.items) {
      let r = canContain(t.name)
      if (r) return r
    }
    return false
  }

  for (const key of map.keys()) {
    if (key !== 'shiny gold bags' && canContain(key, [])) {
      sum++
    }
  }

  console.log('Part1', sum)
}

function part2() {
  let canContain = name => {
    let val = map.get(name)
    let sum = 1

    for (let t of val.items) {
      sum += canContain(t.name) * t.count
    }

    return sum
  }

  console.log('Part2', canContain('shiny gold bags') - 1)
}

part1()
part2()
