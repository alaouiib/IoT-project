const hsl = require('../')
const {test} = require('tap')

test('pure white', function ({is, end}) {
  const expected = '#ffffff'
  const actual = hsl(0, 100, 100)
  const it = 'max saturation and luminosity should return pure white'
  is(actual, expected, it)
  end()
})
