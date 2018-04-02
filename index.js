var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('scripts', function() {
    gulp.src('./public/js/*.js')
    .pipe(concat('WheelSlideShow.js'))
	.pipe(uglify())
    .pipe(gulp.dest('./dist/'))
	.on('end', () => {
		console.log('Done');
	});
})

gulp.task('load', function() {
    gulp.src('./public/js/*.js')
    .pipe(concat('WheelSlideShow.js'))
	.pipe(uglify())
    .pipe(gulp.dest('./../../FireShellStudio/FireShellStudio/public/widgets/WheelSlideshow/'))
	.on('end', () => {
		console.log('Load Done');
	});
})

gulp.start();