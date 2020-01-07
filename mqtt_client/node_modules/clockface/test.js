
function basic () {
  var clock = require('./')()
  process.stdout.write('Your clock sir...: ') 
  setTimeout(function () {
    clock.pause()
    setTimeout(function () {
      clock.start()
      setTimeout(clock.stop, 5000)
    }, 1000)
  }, 5000)
}


basic()