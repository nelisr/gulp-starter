
	// Include modules requirements.
	var gulp = require( 'gulp' ),
		uglify = require( 'gulp-uglify' ),
		sass = require( 'gulp-sass' ),
		concat = require('gulp-concat'),
		cssmin = require( 'gulp-cssmin' ),
		rename = require( 'gulp-rename' ),
		watch = require( 'gulp-watch' ),
		imagemin = require( 'gulp-imagemin' );

	// Compilar sass em css e mimifica
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
		gulp.src( ['../assets/images/*.{png,jpg,gif}', '../assets/images/**/*.{png,jpg,gif}' ])
		.pipe( imagemin({
			optimizationLevel: 7,
			progressive: true
		}))
		.pipe(gulp.dest('../build/images'));
	});

	// Observa os arquivos para executar as tarefas
	gulp.task('watch', function() {
	  gulp.watch('../assets/js/main.js',['jsmin']);
	  gulp.watch('../assets/js/**/*.js',['jsmin']);
	  gulp.watch('../assets/scss/style.scss',['sass']);
	  gulp.watch('../assets/scss/**/*.scss',['sass']);
	  gulp.watch('../assets/images/*.{png,jpg,gif}',['imagecompress']);
	  gulp.watch('../assets/images/**/*.{png,jpg,gif}',['imagecompress']);
	});

	// Tarefa padrão
	gulp.task('default', ['watch','jsmin','sass','imagecompress']);
