"use strict";

var storage = require('./storage');
var util    = require('./util');
var superb  = require('superb');
var abort   = util.abort;

function initialize() {

    if(!storage.getItem('history')) {
        storage.setItem('history', {});
    }

    if(!storage.getItem('status')) {
        storage.setItem('status', { status: false, since: util.now() });
    }
}

function getDiff(t1, t2) {
    return util.diff(t1, t2);
}

function getHistory() {
    return storage.getItem('history');
}

function getHistoryByDate(date) {
    var history = getHistory();
    return history[date];
}

function updateHistory(date, log) {
    var history = getHistory();
    history[date] = log;

    storage.setItem('history', history);
}

function addHistory(date, log) {
    var history = getHistory();
    var current = history[date];

    if (current === undefined) {
        history[date] = log;
    } else if(current instanceof Array) {
        // append
        history[date].push(log);
    } else {
        var old = history[date];
        history[date] = [old, log];
    }

    storage.setItem('history', history);
}

function addHistory(date, log) {
    var history = getHistory();
    var current = history[date];

    if (current === undefined) {
        history[date] = log;
    } else if(current instanceof Array) {
        // append
        history[date].push(log);
    } else {
        var old = history[date];
        history[date] = [old, log];
    }

    storage.setItem('history', history);
}

function getCurrentDate() {
    return util.parseDate(util.now());
}

function startHistory() {
    var history = {
      start: util.now(),
        end: false
    };

    addHistory(getCurrentDate(), history);
    console.log('you are a ' + superb() + ' programmer. lets rocks!');
}

function endHistory() {
    var current = getCurrentDate();
    var history = getHistoryByDate(current);
    if(history instanceof Array) {
        history[history.length - 1].end = util.now();
    } else {
        history.end = util.now();
    }

    updateHistory(current, history);
}

function setCurrentStatus(status) {
    storage.setItem('status', {
        status: status,
        since: util.now()
    });
}

function setOn() {
    startHistory();
    setCurrentStatus(true);
}

function setOff() {
    endHistory();
    setCurrentStatus(false);
}

function getCurrentStatus() {
    return storage.getItem('status');
}

function getTodayStreak() {
    var logs = getHistoryByDate(getCurrentDate());
    var streak = 'unknown';
    if(logs === undefined) {
        abort('No history for ' + util.humanDate(getCurrentDate()));
    } else if(logs instanceof Array) {
        if(logs.length === 1) {
            streak = { start: logs[0].start, end: logs[0].end };
        } else if(logs.length > 1) {
            streak = { start: logs[0].start, end: logs[logs.length - 1].end };
        }
    } else {
        streak = logs;
    }

    return { streak: streak, result: util.diffTime(streak.start, streak.end) };
}


module.exports = {
    start: function() {
        initialize();
    },

    on: function () {
        if (getCurrentStatus().status === true) {
            console.log('you already working!');
        } else {
            setOn();
        }
    },

    off: function () {
        var status = getCurrentStatus();
        if (status.status === false) {
            console.log('have you ever stopped to work a ' + util.timeago(status.since));
        } else {
            setOff();
        }
    },

    today: function () {
        var streak = getTodayStreak();
        console.log('today you\'ve worked ' + streak.result + '.');

        if(streak.result.indexOf('hours') > -1) {
            console.log('Congratulations, you\'re a ' + superb() + ' programmer');
        }
    },

    question: function() {
        var isWorking = getCurrentStatus().status;
        if(isWorking) {
            console.log('Obviously, isn\'t coincidence that I am known as ' + superb() + ' programmer.');
        } else {
            console.log('not yet, we need to regain stamina with a delicious coffee in your favorite mug.');
        }
    }

};