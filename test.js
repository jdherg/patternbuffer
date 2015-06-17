var patternbuffer = require('./patternbuffer.js');
var events = require('events');
var ev = new events.EventEmitter();

var f1 = function(data) {
	return data.toString() === "test";
}

var filters = [f1];
var pbuf = new patternbuffer.PatternBuffer(ev, filters);
pbuf.on('message', function(message) {
	console.log(message.toString());
});
pbuf.on('error', function(err) {
	console.log(err.message);
});
ev.emit('data', new Buffer("te"));
ev.emit('data', new Buffer("st"));
ev.emit('error', new Error(':('));