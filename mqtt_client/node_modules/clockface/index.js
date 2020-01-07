var spawn = require('child_process').spawn
var ansi = require('ansi-escapes')
var faces = ['🕐','🕑','🕒','🕓','🕔','🕕','🕖','🕗','🕘','🕙','🕚','🕛']
var max = faces.length - 1

module.exports = function (opts) {
  opts = opts || {}
  opts.tick = 'tick' in opts ? opts.tick : 100
  opts.autostart = 'autostart' in opts ? opts.autostart : true

  var backwardTerminal = process.env.TERM_PROGRAM === 'Apple_Terminal'

  opts.out = opts.out || process.stdout
  var autostart = opts.autostart
  var out = opts.out
  var tick = opts.tick
  
  var face = 0
  display(faces[face], out)
  var id

  function start() {
    out.write(ansi.cursorHide)
    id = setInterval(function () {
      face += 1
      if (face > max) face = 0
      display(faces[face], out)
    }, tick)
  }

  if (autostart) start()

  function pause() {
    clearInterval(id)
    id = null
  }

  function stop() {
    pause()
    face = 0
    out.write(ansi.cursorShow)
  }

  function display(face, out, back) {
    out.write(ansi.cursorSavePosition + face + ansi.cursorRestorePosition)
    if (backwardTerminal) out.write(ansi.cursorBackward())
  }

  return {stop: stop, pause: pause, start: start}
}

