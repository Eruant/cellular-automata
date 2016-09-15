'use strict'

const state = require('./state')
const rules = require('./rules')(57)
const applyRules = require('./applyRules')

const display = (data) => data
  .map(row => row.join(''))
  .join('\n')

const data = []

const size = 21

data.push(state(size * 2))

for (let i = 0; i < size; i++) {
  data.push(applyRules(data[data.length - 1], rules))
}

console.log(display(data))
