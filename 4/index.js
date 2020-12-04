const fs = require('fs')

const input = fs.readFileSync('./4/input', {encoding: 'utf-8'}).split('\n')
const batches = []
let batch = null

for (const line of input) {
  const lineTrimmed = line.trim()
  if (batch == null || lineTrimmed === '') {
    batch = new Set(['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'])
    batches.push(batch)
  }

  if (lineTrimmed === '') continue

  lineTrimmed.split(' ').forEach(item => {
    let [name, val] = item.split(':')
    val = val.trim()
    const valInt = parseInt(val)

    if (name === 'byr') if (valInt < 1920 || valInt > 2002) return
    if (name === 'iyr') if (valInt < 2010 || valInt > 2020) return
    if (name === 'eyr') if (valInt < 2020 || valInt > 2030) return
    if (name === 'hcl')
      if (!(val.length === 7 && /\#[0-9a-f]+/.test(val))) return
    if (name === 'pid') if (!/^\d{9}$/.test(val)) return
    if (name === 'ecl')
      if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(val))
        return

    if (name === 'hgt') {
      const unit = val.substring(val.length - 2)
      const unitVal = parseInt(val.substr(0, val.length - 2))

      if (isNaN(unitVal)) return

      if (unit == 'cm') {
        if (unitVal < 150 || unitVal > 193) return
      } else if (unit == 'in') {
        if (unitVal < 59 || unitVal > 76) return
      } else return
    }

    batch.delete(name)
  })
}

console.log(batches.filter(f => f.size === 0).length)
