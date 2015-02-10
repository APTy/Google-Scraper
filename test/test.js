var assert = require("assert");

var findSerp = require('../lib/index');

var options = {
		keyword : 'c9 shroud',
		pages : 5
	};

describe('getLinks()', function() {
	it('position', function(done){
		findSerp(options, function(err, rank){
			var posLink = (rank != null);
			assert(posLink, 'success');
			done();
		});
	});
});