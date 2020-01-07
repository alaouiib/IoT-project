const toRgb = require('hsl-to-rgb-for-reals')
const debug = require('debug')('hsl-to-hex')

function max (val, n) {
  debug('ensuring ' + val + ' is no more than ' + n)
  return (val > n) ? n : val
}

function min (val, n) {
  return (val < n) ? n : val
}

function cycle (val) {
  val = max(val, 1e7)
  val = min(val, -1e7)
  while (val < 0) { val += 360 }
  while (val > 359) { val -= 360 }
  return val
}

function hsl (hue, saturation, luminosity) {
  hue = cycle(hue)
  saturation = min(max(saturation, 100), 0)
  luminosity = min(max(luminosity, 100), 0)

  saturation /= 100
  luminosity /= 100

  let rgb = toRgb(hue, saturation, luminosity)

  return '#' + rgb
        .map(n => {
          return (256 + n).toString(16).substr(-2)
        })
        .join('')
}

module.exports = hsl
