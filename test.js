var patternbuffer = require('./patternbuffer.js');
var events = require('events');
var ev = new events.EventEmitter();

var f1 = function(data) {
	if (data.toString() === "test") {
		return 4;
	}
}

var f2 = function(data) {
	if (data.toString().indexOf('c')) {
		return data.toString().indexOf('c') + 1;
	}
}

var matchers = [f1,f2];
var pbuf = new patternbuffer.PatternBuffer(ev, matchers);
pbuf.on('message', function(message) {
	console.log(message.toString());
});
pbuf.on('error', function(err) {
	console.log(err.message);
});
ev.emit('data', new Buffer("te"));
ev.emit('data', new Buffer("st"));
ev.emit('error', new Error(':('));
ev.emit('data', new Buffer("abcd"));
ev.emit('data', new Buffer("abcd"));
