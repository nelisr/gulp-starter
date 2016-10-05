
	// Include modules requirements.
	var gulp = require( 'gulp' ),
		uglify = require( 'gulp-uglify' ),
		sass = require( 'gulp-sass' ),
		concat = require('gulp-concat'),
		cssmin = require( 'gulp-cssmin' ),
		watch = require( 'gulp-watch' ),
		imagemin = require( 'gulp-imagemin' ),
		clean = require('gulp-clean'),
		cleanDest = require('gulp-clean-dest');

	// Compile sass to css and mimify
	gulp.task('sass', function () {
		gulp.src(['../assets/scss/*.scss','../assets/scss/**/*.scss'])
			.pipe(sass.sync().on('error', sass.logError))
			.pipe(concat('style.min.css'))
			.pipe(cssmin())
			.pipe(gulp.dest('../build/css'));
	});

	// Mimifica arquivos JS e joga para dentro de 'build/js'
	gulp.task('jsmin', function() {
			gulp.src(['../assets/js/main.js','../assets/js/**/*.js'])
			   .pipe(concat('main.min.js'))
	           .pipe(uglify())
	           .pipe(gulp.dest('../build/js'));
	});

	// Comprime imagens
	gulp.task('imagecompress', function(){
		return gulp.src( ['../assets/images/*.{png,jpg,gif}', '../assets/images/**/*.{png,jpg,gif}' ])
		.pipe( imagemin({
			optimizationLevel: 7,
			progressive: true
		}))
		.pipe(cleanDest('../build/images'))
		.pipe(gulp.dest('../build/images'));
	});


	// copy fonts
	gulp.task('fonts',  function(){
		return gulp.src('../assets/fonts/*.{eot,svg,ttf,woff,woff2}')
		.pipe(cleanDest('../build/fonts'))
    .pipe(gulp.dest('../build/fonts'));
	});

	// Observa os arquivos para executar as tarefas
	gulp.task('watch', function() {

		gulp.watch('../assets/js/main.js',['jsmin']);
		gulp.watch('../assets/js/main.js', function (event) {
    	console.log(event);
  	});

	  gulp.watch('../assets/js/**/*.js',['jsmin']);
		gulp.watch('../assets/js/**/*.js', function (event) {
    	console.log(event);
  	});

	  gulp.watch('../assets/scss/style.scss',['sass']);
		gulp.watch('../assets/scss/style.scss', function (event) {
    	console.log(event);
  	});

	  gulp.watch('../assets/scss/**/*.scss',['sass']);
		gulp.watch('../assets/scss/**/*.scss', function (event) {
    	console.log(event);
  	});

		gulp.watch('../assets/images/*.{png,jpg,gif}',['imagecompress']);
		gulp.watch('../assets/images/*.{png,jpg,gif}', function (event) {
    	console.log(event);
  	});

		gulp.watch('../assets/images/**/*.{png,jpg,gif}',['imagecompress']);
		gulp.watch('../assets/images/**/*.{png,jpg,gif}', function (event) {
    	console.log(event);
  	});

		gulp.watch('../assets/fonts/*.{eot,svg,ttf,woff,woff2}', ['fonts']);
		gulp.watch('../assets/fonts/*.{eot,svg,ttf,woff,woff2}', function (event) {
    	console.log(event);
  	});

	});

	// Tarefa padrão
	gulp.task('default', ['jsmin','sass','imagecompress','fonts', 'watch']);
