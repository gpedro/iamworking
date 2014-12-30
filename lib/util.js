"use strict";

var moment = require('moment');
var range = require('moment-precise-range');

var util = {
    diffTime: function(t1, t2) {
        t1 = moment(t1);
        t2 = moment(t2);

        return range.preciseDiff(t1, t2);
    },

    parseDate: function(date) {
        return moment(date).format('DDMMYYYY');
    },

    humanDate: function(date) {
        if (date instanceof Number) {
           return moment(date, 'x').format('DD/MM/YYYY');
        } else if (date instanceof String) {
            return moment(date, 'DDMMYYYY').format('DD/MM/YYYY');
        } else {
            return moment(date).format('DD/MM/YYYY');
        }
    },

    timeago: function(date) {
        return moment(date).fromNow();
    },

    now: function() {
        return parseInt(moment().format('x'), 10);
    },

    abort: function(str) {
        console.error(str);
        process.exit(1);
    }


};

module.exports = util;