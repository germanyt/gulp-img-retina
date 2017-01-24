'use strict';

var through = require('through2');
var cheerio = require('cheerio');
var objectAssign = require('object-assign');

var reImageSrc = /^((?:(?:http|https):\/\/)?(?:.+))(\.(?:gif|png|jpg|jpeg|webp|svg))$/;

var defaultOptions = {
	decodeEntities: false,

	// suffix: {1: '', 2: '@2x', 3: '@3x', 4: '@4x'}
	suffix: {1: '', 2: '@2x', 3: '@3x'}
}

var imageRetina = function(options){

	options = objectAssign({}, defaultOptions, options);

	return through.obj(function(file, enc, cb){
		if (file.isNull()){
			cb(null, file);
			return;
		}

		if (file.isStream()){
			cb(new gutil.PluginError('gulp-img-retina', 'Streaming not supported'));
			return;
		}

		var content = file.contents.toString();

		var $ = cheerio.load( content, options );

		var imgList = $('img');

		imgList.each(function(item){
			var _this = $(this);
			var src = _this.attr('src');

			var tmpSrc = [];
			var match = src.match(reImageSrc);
			
			// not a valid src attribute
			if (match === null){
				return true;
			}

			for( var key in options.suffix ){
				tmpSrc.push( match[1]+options.suffix[key]+match[2]+' '+key+'x' );
			}

			_this.attr('srcset', tmpSrc.join(', '));
		});
		// console.log($.html());

		file.contents = new Buffer( $.html() );

		cb(null, file);
	});
}


module.exports = imageRetina;
