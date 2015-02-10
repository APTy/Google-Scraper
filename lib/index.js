var request = require('request');
var cheerio = require('cheerio');
var url = require('url');
var async = require('async');


function getSerp(options, cb) {

	var start = 0;
	var linkBody = 'h3.r a';
	var nextBody = 'td.b a span';
	var hasNext = true;
	var page = 1;
	//var gLinks = [];

	async.whilst(
		function () {return (page <= options.pages && hasNext); },
		function (next) {
			async.waterfall(
			    [
			        function(callback) {
			        	getBody(options, callback);
			        },
			        function(html, callback) {
			            getLinks(html, callback);
			            
			        },
			        function(links, body, callback){
			        	isNext(links, body, callback);
			        	setTimeout(next, 3000);
			        }
			    ],
			    function(err, response) {
			    	if(err) throw err;
			    	cb(null, response);
			    }
			);
		},
		function (err) {
			
		}
	);

	function getBody(options, callback) {
		request('https://www.google.com/search?q=' + options.keyword + '&start=' + start,  function(err, res, body){
			callback(null, body);
		});
	};

	function getLinks(html, callback) {
		var gLinks = [];
		var $ = cheerio.load(html);
		var links = $(linkBody);
		$(links).each(function(i, link){
			var rawLink = $(link).attr('href').match("(?=http).*(?=&sa)");
			if(rawLink !== null) {
				gLinks.push(rawLink[0]);

			}
		})
		page++;
		callback(null, gLinks, $);
	};

	function isNext(gLinks, $, callback){
		if (($(nextBody).last().text() === 'Next') && page <= options.pages) {
			start+=10;
		}
		else{
			hasNext = false;
		}
		callback(null, gLinks);
	}
}
module.exports = getSerp;