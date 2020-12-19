let input = require('fs')
  .readFileSync('./19/input', 'utf-8')
  .split('\n')
  .map(f => f.trim())
  .filter(f => f.length > 0)

let allRules = new Map()
let constants = new Map()
let cache = new Map()
let messages = []

console.log('Part1:', run('part1'))
console.log('Part2:', run('part2'))

function run(part) {
  let sum = 0
  messages.length = 0
  cache.clear()
  constants.clear()
  allRules.clear()

  input.forEach(line => {
    if (!line.includes(': ')) return messages.push(line)

    let [ruleId, rest] = line.split(': ')

    if (rest.includes('"')) {
      constants.set(ruleId, rest.split('"')[1])
    } else {
      let [ruleId, ...words] = line.split(': ')

      if (words.length === 1 && words[0].startsWith('"')) {
        constants.set(ruleId, words[0].split('"')[1])
      } else {
        let rest = ''

        if (part === 'part2' && ruleId === '8') rest = '42 | 42 8'
        else if (part === 'part2' && ruleId === '11') rest = '42 31 | 42 11 31'
        else rest = words.join(' ')

        allRules.set(
          ruleId,
          rest.split(' | ').map(option => option.split(' ')),
        )
      }
    }
  })

  for (const msg of messages) {
    cache.clear()
    if (isMatchingRule(msg, 0, msg.length, '0')) sum += 1
  }

  return sum
}

function isMatchingList(line, startIndex, endIndex, rulesLeft) {
  if (startIndex === endIndex && rulesLeft.length === 0) return true

  if (rulesLeft.length === 0) return false
  if (startIndex === endIndex) return false

  for (let i = startIndex + 1; i < endIndex + 1; i++)
    if (
      isMatchingRule(line, startIndex, i, rulesLeft[0]) &&
      isMatchingList(line, i, endIndex, rulesLeft.slice(1))
    )
      return true

  return false
}

function isMatchingRule(text, startIndex, endIndex, rule) {
  let key = [rule, startIndex, endIndex].join(':')
  if (cache.has(key)) return cache.get(key)

  let isValid = false
  if (constants.get(rule)) {
    isValid =
      startIndex + 1 === endIndex && text[startIndex] === constants.get(rule)
  } else {
    for (const option of allRules.get(rule)) {
      if (isMatchingList(text, startIndex, endIndex, option)) {
        isValid = true
        break
      }
    }
  }

  cache.set(key, isValid)
  return isValid
}
