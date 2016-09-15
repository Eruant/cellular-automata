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
