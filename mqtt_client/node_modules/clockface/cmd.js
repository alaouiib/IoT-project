#!/usr/bin/env node

// clockface tick autostart

var clockface = require('./')
var args = process.argv.slice(2)
var tick = Number(args[0])
var autostart = args[1] !== 'false'

if (isNaN(tick)) tick = 100

var clock = clockface({
  autostart: autostart,
  tick: tick
})
process.on('exit', clock.stop)
process.on('SIGINT', clock.stop)