#! /usr/bin/env node
"use strict";

var  working = require('commander'),
     logger  = require('../lib/logger'),
     pkg     = require('../package.json');

logger.start();

// version
working.version(pkg.version);

// log entry hour
working
   .command('on')
   .description('add entry hour')
   .action(function(){
      logger.on();
   });

// log leave hour
working
   .command('off')
   .description('add leave hour')
   .action(function(){
      logger.off();
   });

// see today info
working
   .command('today')
   .description('show today hours')
   .action(function(){
      logger.today();
   });

// check whether entry hour was add
working
    .command('?')
    .description('check whether start hour was added')
    .action(function(){
       logger.question();
    });

// check whether entry hour was add
working
    .command('d')
    .description('check structure')
    .action(function(){
       logger.debug();
    });

working.parse(process.argv);

if(working.args === 0) {
   working.help();
}
