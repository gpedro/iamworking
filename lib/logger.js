var storage = require('node-persist');


/*
 logger structure

 {
  status: 'on' || 'off'
  history: [
    'ddmmyyyy': {
      start: <timestamp>
      end: <timestamp>
    }
    'ddmmyyyy': [{
      start: <timestamp>
      end: <timestamp>
    }]
  ]

 }
*/
