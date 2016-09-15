'use strict'

module.exports = (row, rules) => {
  let nextRow = []

  row.forEach((cell, i) => {
    const left = row[i - 1] || row[row.length - 1]
    const right = row[i + 1] || row[0]

    for (let j = 0, len = rules.length; j < len; j++) {
      let rule = rules[j]
      if (rule.left === left && rule.self === cell && rule.right === right) {
        nextRow.push(rule.target)
      }
    }
  })

  return nextRow
}
