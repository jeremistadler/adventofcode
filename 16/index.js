let input = require('fs')
  .readFileSync('./16/input', 'utf-8')
  .split('\n')
  .map(f => f.trim())
  .filter(f => f.length > 0)

let rulesLines = input.slice(0, input.indexOf('your ticket:'))
let nearbyLines = input.slice(input.indexOf('nearby tickets:') + 1)
let myTicket = input
  .slice(input.indexOf('your ticket:') + 1, input.indexOf('nearby tickets:'))[0]
  .split(',')
  .map(f => parseInt(f))

let rules = []

rulesLines.forEach(line => {
  let innerL = []

  line
    .split(': ')[1]
    .split(' or ')
    .forEach(inner => {
      let [start, end] = inner.split('-')
      innerL.push([parseInt(start), parseInt(end)])
    })

  let indexes = new Set()

  myTicket.forEach((_, i) => {
    indexes.add(i)
  })

  rules.push({name: line.split(': ')[0], list: innerL, indexes})
})

let next = nearbyLines
  .map(line => {
    const values = line.split(',')
    return values.map((valStr, fieldIndex) => {
      let value = parseInt(valStr)
      return rules.map(rule => {
        let isValid = rule.list.some(r => value >= r[0] && value <= r[1])

        return {
          isValid,
          rule,
          fieldIndex,
          value,
        }
      })
    })
  })
  .filter(line => line.every(field => field.filter(f => f.isValid).length > 0))

next.forEach(line => {
  line.forEach(field => {
    field.forEach(fieldRule => {
      if (fieldRule.isValid === false) {
        fieldRule.rule.indexes.delete(fieldRule.fieldIndex)
      }
    })
  })
})

rules.forEach(rule => {
  if (rule.name.startsWith('departure')) {
    console.log(rule.name, rule.indexes)
  }
})
