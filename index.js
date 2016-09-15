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
