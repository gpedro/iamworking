#! /usr/bin/env node

var working = require('commander');

var hours = {};

// version
working.version('0.0.2');

// log start hour
working
   .command('on')
   .description('add start hour')
   .action(function(){
      // todo
   });

// log leave hour
working
   .command('off')
   .description('add leave hour')
   .action(function(){
      // todo
   });

// see today info
working
   .command('today')
   .description('show today hours')
   .action(function(){
      console.log(
		"\n \nYou started working at " + hours.starting + ".\n" + 
		"You left working at " + hours.leaving + ".\n \n");
   });

// check whether start hour was add
working
   .command('?')
   .description('check whether start hour was add')
   .action(function(){
    	if(hours.starting){
			console.log("\n\nYes, you are.\n\n");
		}
		else {
			console.log("\n\nNo, you are not.\n\n");
		}
   });

working.parse(process.argv);