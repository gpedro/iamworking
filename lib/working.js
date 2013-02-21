#! /usr/bin/env node

var program = require('commander');

program
  .version('0.0.1')
  .parse(process.argv);

console.log(new Date);