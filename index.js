'use strict';

var through = require('through2');
var cheerio = require('cheerio');

var reImageSrc = /^((?:(?:http|https):\/\/)?(?:.+))(\.(?:gif|png|jpg|jpeg|webp|svg))$/;

var imageRetina = function(options){

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

			var tmpSrc = [src + ' 1x'];
			tmpSrc.push( src.replace(reImageSrc, '$1@2x$2 2x') );

			_this.attr('srcset', tmpSrc.join(', '));
		});
		// console.log($.html());

		file.contents = new Buffer( $.html() );

		cb(null, file);
	});
}


module.exports = imageRetina;