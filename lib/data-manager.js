var _ = require('underscore')
	, file = './lib/storage/data.json'
	, data = require('./storage/data.json')
	, jf = require('jsonfile');


function load (){
	return data;
}

function save(day){
	// todo: persistence
}

var today = {
	date: "2013-02-22",
	entry: ["10:30", "20:00"],
	leave: ["19:30", "22:00"]
};

_.extend(data, data, today);

jf.writeFile(file, data, function(err) {
    if(err) console.log(err);
});