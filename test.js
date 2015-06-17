var patternbuffer = require('./pattern_buffer.js');
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
ev.emit('data', new Buffer("te"));
ev.emit('data', new Buffer("st"));