const state = require('./state')
const rules = require('./rules')

const display = (data) => data
  .map(row => row.join(''))
  .join('\n')
  .replace(/0/g, ' ')
  .replace(/1/g, '#')

const data = []

// create the first row
data.push(state(20))

console.log(display(data))
console.log(rules(72))
