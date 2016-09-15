(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'

module.exports = (row, rules) => {
  let nextRow = []

  row.forEach((cell, i) => {
    const left = row[i - 1] || row[row.length - 1]
    const right = row[i + 1] || row[0]

    for (let j = 0, len = rules.length; j < len; j++) {
      let rule = rules[j]
      if (rule.left.toString() === left.toString() && rule.self.toString() === cell.toString() && rule.right.toString() === right.toString()) {
        nextRow.push(rule.target)
      }
    }
  })

  return nextRow
}

},{}],2:[function(require,module,exports){
'use strict'

const state = require('./state')
const ruleFactory = require('./rules')
const applyRules = require('./applyRules')

const scale = 21

const canvas = window.document.createElement('canvas')
canvas.width = scale * 16
canvas.height = scale * 16

canvas.setAttribute('style', `
  width: ${scale * 64}px;
  height: ${scale * 64}px;
  image-rendering: pixelated;
`)

const ctx = canvas.getContext('2d')

window.document.body.appendChild(canvas)

const onColor = 'rgb(255, 100, 100)'
const offColor = 'rgb(100, 100, 100)'

const data = []
const rules = []

for (let i = 0; i < 256; i++) {
  data.push([state(scale)])      // create starting state
  rules.push(ruleFactory(i))  // generate rule set
}

const render = () => {
  data.forEach((block, blockIndex) => {
    ctx.save()
    let x = (blockIndex % 16) * scale
    let y = Math.floor((blockIndex / 16)) * scale
    ctx.translate(x, y)

    block.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        ctx.fillStyle = cell ? onColor : offColor
        ctx.fillRect(cellIndex, rowIndex, 1, 1)
      })
    })

    ctx.restore()
  })
}

const update = () => {
  data.forEach((block, blockIndex) => {
    const lastRow = data[blockIndex][data[blockIndex].length - 1]
    data[blockIndex].push(applyRules(lastRow, rules[blockIndex]))

    if (data[blockIndex].length > scale) {
      data[blockIndex].shift()
    }
  })
}

render()

setInterval(() => {
  update()
  render()
}, 500)

},{"./applyRules":1,"./rules":3,"./state":4}],3:[function(require,module,exports){
'use strict'

const convertToBinary = (n, pad) => {
  const str = n.toString(2)
  return pad.substring(0, pad.length - str.length) + str
}

const states = [0, 1, 2, 3, 4, 5, 6, 7].map(n => convertToBinary(n, '000'))
const rule = (n) => convertToBinary(n, '00000000')

module.exports = (n) => {
  return states.map((state, i) => {
    return {
      left: parseInt(state[0], 10),
      self: parseInt(state[1], 10),
      right: parseInt(state[2], 10),
      target: Math.abs(parseInt(rule(n)[i], 10) - 1)
    }
  })
}

},{}],4:[function(require,module,exports){
'use strict'

const randomBinary = () => Math.round(Math.random())

const randomRow = (length) => {
  let row = []

  for (let i = 0; i < length; i++) {
    row.push(randomBinary())
  }

  return row
}

module.exports = (data) => {
  if (!data) {
    return randomRow(10)
  }

  if (typeof data === 'number') {
    return randomRow(data)
  }

  return data.split('')
}

},{}]},{},[2]);
