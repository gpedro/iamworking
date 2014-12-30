"use strict";

var fs = require('fs');
var path = require('path');

function getPath(filename) {
    return path.join(__dirname, '..', 'data',filename);
}

function writeFile(filename, data) {
    fs.writeFileSync(getPath(filename), (data != null) ? JSON.stringify(data) : null, {flags:'w+', encoding: 'utf8'});
}

function createFile(filename) {
    writeFile(getPath(filename), null);
}


function readFile(filename) {
    try {
        var file = fs.readFileSync(getPath(filename), { flags: 'r', encoding: 'utf8'});
        return (file !== undefined) ? JSON.parse(file) : file;
    } catch(err) {
        if(err.code === 'ENOENT') { return undefined; }
        else { console.error(err); }
    }
    /*
    fs.readFile(getPath(filename), { flags: 'r', encoding: 'utf8'}, function(err, data) {
        if(err) {
            if(err.code === 'ENOENT') return undefined;
            else console.error(err);
        };

        return (data != undefined) ? JSON.parse(data) : data;
    });*/
}


module.exports = {

    setItem: function(key, value) {
        writeFile(key, value);
    },

    getItem: function(key) {
        return readFile(key);
    }

};
