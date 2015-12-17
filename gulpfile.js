// include gulp
var gulp = require('gulp');
var fs = require('fs');
var path = require('path');

// include plug-ins
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var merge = require('merge-stream');

// function to get directories in a directory
function getDirs(dir) {
	return fs.readdirSync(dir)
		.filter(function(file) {
			return fs.statSync(path.join(dir, file)).isDirectory();
		});
}

// sass task
gulp.task('sass', function() {

	gulp.src('./sass/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({
			includePaths : ['./sass']
		}).on('error', sass.logError))
		.pipe(sourcemaps.write('./sourcemaps'))
		.pipe(gulp.dest('./sass'));

});

// javascript task
gulp.task('javascript', function(){

	var scriptsPath = './js/dev';
	var scriptDest = './js/dist';
	var dirs = getDirs(scriptsPath);

	var tasks = dirs.map(function(folder) {

		return gulp.src(path.join(scriptsPath, folder, '/**/*.js'))
			.pipe(sourcemaps.init())
			.pipe(concat(folder + '.js'))
			.pipe(gulp.dest(scriptDest))
			.pipe(uglify())
			.pipe(rename(folder + '.min.js'))
			.pipe(sourcemaps.write('./sourcemaps'))
			.pipe(gulp.dest(scriptDest));

	});

	var root = gulp.src(path.join(scriptsPath, '/*.js'))
		.pipe(sourcemaps.init())
		.pipe(concat('main.js'))
		.pipe(gulp.dest(scriptDest))
		.pipe(uglify())
		.pipe(rename('main.min.js'))
		.pipe(sourcemaps.write('./sourcemaps'))
		.pipe(gulp.dest(scriptDest));

	return merge(tasks, root);

});

// reload task
gulp.task('reload', function() {

	browserSync.reload();

});

// watch task
gulp.task('watch', function() {

	gulp.watch('./sass/**/*.scss', ['sass']);
	gulp.watch('./js/dev/**/*.js', ['javascript']);
	gulp.watch(['./sass/**/*.css', './js/dist/**/*.js'], ['reload']);

});

// browsersync task
gulp.task('browser-sync', function() {

	browserSync({
		port: 8000,
		proxy: "locahost"
		notify: false,
		open: false,
		ui: {
			port: 8001,
			weinre: {
				port: 8002
			}
		}
	});

});

// default task
gulp.task('default', ['sass', 'javascript', 'watch', 'browser-sync']);
