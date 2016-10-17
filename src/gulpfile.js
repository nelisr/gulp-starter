
	// Include modules requirements.
	var gulp = require( 'gulp' ),
		uglify = require( 'gulp-uglify' ),
		sass = require( 'gulp-sass' ),
		concat = require('gulp-concat'),
		cssmin = require( 'gulp-cssmin' ),
		watch = require( 'gulp-watch' ),
		del = require('del'),
		clean = require('gulp-clean'),
		debug = require('gulp-debug');

	// delete files in build/images
	gulp.task('cleanimages', function(){
  		return gulp.src('../build/images', {read: false})
  		.pipe(debug({title: 'unicorn:'}))
        .pipe(clean({force: true}));
	});	

	// delete files in build/fonts
	gulp.task('cleanfonts', function(){
  		return gulp.src('../build/fonts', {read: false})
  		.pipe(debug({title: 'unicorn:'}))
        .pipe(clean({force: true}));
	});	

	// Compile sass to css and mimify
	gulp.task('sass', function () {
		gulp.src(['../assets/scss/*.scss','../assets/scss/**/*.scss'])
			.pipe(sass.sync().on('error', sass.logError))
			.pipe(concat('style.min.css'))
			.pipe(cssmin())
			.pipe(debug({title: 'unicorn:'}))
			.pipe(gulp.dest('../build/css'));
	});

	// Minify JS files and plays into'build/js'
	gulp.task('jsmin', function() {
			gulp.src(['../assets/js/main.js','../assets/js/**/*.js'])
			.pipe(concat('main.min.js'))
	       	.pipe(uglify())
			.pipe(debug({title: 'unicorn:'}))
	       	.pipe(gulp.dest('../build/js'));
	});

	// Comprime images
	gulp.task('images', ['cleanimages'], function(){
		return gulp.src( ['../assets/images/*.{png,jpg,gif}', '../assets/images/**/*.{png,jpg,gif}' ])
		.pipe(debug({title: 'unicorn:'}))
		.pipe(gulp.dest('../build/images'));
	});


	// Copy fonts
	gulp.task('fonts', ['cleanfonts'], function(){
		return gulp.src('../assets/fonts/*.{eot,svg,ttf,woff,woff2}')
		.pipe(debug({title: 'unicorn:'}))
    	.pipe(gulp.dest('../build/fonts'));
	});

	// watch files for execute tasks
	gulp.task('watch', function() {
	
		gulp.watch(['../assets/js/main.js','../assets/js/**/*.js'], ['jsmin']);

	  	gulp.watch(['../assets/scss/style.scss', '../assets/scss/**/*.scss'], ['sass']);

		gulp.watch(['../assets/images/*.{png,jpg,gif}','../assets/images/**/*.{png,jpg,gif}'], ['images']);

		gulp.watch('../assets/fonts/*.{eot,svg,ttf,woff,woff2}', ['fonts']);

	});

	// Task Default
	gulp.task('default', ['jsmin','sass','images','fonts', 'watch']);
