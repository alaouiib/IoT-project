# clockface 🕘

Animate the unicode clock faces, in the terminal

```sh
var clock = require('clockface')({
  out: process.stdout, //default
  autostart: true, //default
  tick: 100, //default
})

process.stdout.write('yaaaaay ')

setTimeout(() => clock.pause(), 10000)
setTimeout(() => clock.start(), 15000)
setTimeout(() => clock.stop(), 25000)
```

## Spawning

If we're doing an intensive sync operation the
clockface won't animate (event loop blocked).

Mostly in a terminal app, these are the time's
we want to give user feedback. 

Clockface comes with an executable

```sh
clockface <tick> <autostart>
```

So the solution is to spawn with stdio inherit.

```js
  var clock = spawn(__dirname + '/node_modules/.bin/clockface', {stdio: 'inherit'})
```