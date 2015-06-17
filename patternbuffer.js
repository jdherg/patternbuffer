var events = require('events');

var PatternBuffer = function (stream, filters) {
	this.stream = stream;
	this.filters = filters;
	this.buffer = new Buffer('');
	events.EventEmitter.call(this);
	var pbuf = this;

	stream.on('data', function(data) {
			pbuf.updateBuffer(data);
			pbuf.checkForMatches();
		});

	stream.on('end', function() {
		pbuf.emit('end');
		});

	stream.on('error', function(err) {
		pbuf.emit('error', err);
	});
}

PatternBuffer.prototype.__proto__ = events.EventEmitter.prototype;

PatternBuffer.prototype.updateBuffer = function(data) {
	this.buffer = Buffer.concat([this.buffer, data]);
}

PatternBuffer.prototype.resetBuffer = function() {
	this.buffer = new Buffer('');
}

PatternBuffer.prototype.checkForMatches = function() {
	for (var i = 0; i < this.filters.length; i++) {
		if(this.filters[i](this.buffer)) {
			this.emit('message', this.buffer);
			this.resetBuffer();
			return;
		}
	}
}

module.exports = {PatternBuffer: PatternBuffer};