#! /usr/bin/env node

var  working = require('commander')
   , logger  = require('./logger')
   , pkg     = require('../package.json');

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
   .description('check whether start hour was add')
   .action(function(){
    	logger.question();
   });

working.parse(process.argv);
