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
