var events = require('events');

var PatternBuffer = function (stream, matchers) {
	this.stream = stream;
	this.matchers = matchers;
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

PatternBuffer.prototype.resetBuffer = function(index) {
	this.buffer = new Buffer(this.buffer.slice(index));
}

PatternBuffer.prototype.checkForMatches = function() {
	for (var i = 0; i < this.matchers.length; i++) {
		var index = this.matchers[i](this.buffer);
		if (index > 0) {
			this.emit('message',
				new Buffer(this.buffer.slice(0,index))
			);
			this.resetBuffer(index);
			return;
		}
	}
}

module.exports = {PatternBuffer: PatternBuffer};
