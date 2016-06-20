# gulp-img-retina
add img attribute 'srcset' for retina

## Prerequisites
You must have a 2x image in the folder which the original image in.

## Install

`npm install gulp-img-retina`

## Usage

``` js
var gulp = require('gulp');
var imgRetina = require('gulp-img-retina');

var retinaOpts = {
    // Your options here.
};

gulp.task('views', function() {

  return gulp.src('./views/**/*.html')
    .pipe(imgRetina(retinaOpts))
    .on('error', function(e) {
      console.log(e.message);
    })
    .pipe(gulp.dest('./build'));

});
```