
	// Include modules requirements.
	var gulp = require( 'gulp' ),
		uglify = require( 'gulp-uglify' ),
		sass = require( 'gulp-sass' ),
		cssmin = require( 'gulp-cssmin' ),
		rename = require( 'gulp-rename' ),
		watch = require( 'gulp-watch' ),
		imagemin = require( 'gulp-imagemin' ),
		imageminGifsicle = require('imagemin-gifsicle'),
		imageminJpegtran = require('imagemin-jpegtran'),
		imageminOptipng = require('imagemin-optipng');


	// Mimifica arquivos JS e joga para dentro de 'build/js'
	gulp.task('jsmin', function() {
			gulp.src('../assets/js/main.js')
	           .pipe(uglify())
	           .pipe(rename({suffix: '.min'}))
	           .pipe(gulp.dest('../build/js')); 
	});

	// Compilar sass em css
	gulp.task('sass', function () { 
	    gulp.src('../assets/scss/style.scss') 
	        .pipe(sass()) 
	        .pipe(gulp.dest('../build/css/')); 
	});

	// Mimifica o CSS compilado
	gulp.task('cssmin', function () {
	    gulp.src('../build/css/style.css')
	        .pipe(cssmin())
	        .pipe(rename({suffix: '.min'}))
	        .pipe(gulp.dest('../build/css/'));
	});

	// Comprime imagens
	gulp.task('imagecompress', function(){
		gulp.src( '../assets/images/*.{png,jpg,gif}' )
		.pipe( imagemin({
			optimizationLevel: 7,
			progressive: true
		}))
		.pipe( gulp.dest( '../build/images/' ) );
	});

	// Observa os arquivos para executar as tarefas
	gulp.task('watch', function() {
	  gulp.watch('../assets/js/main.js',['jsmin']);
	  gulp.watch('../assets/scss/style.scss',['sass']);
	  gulp.watch('../build/css/style.css',['cssmin']); 
	}); 
	
	// Tarefa padrão 
	gulp.task('default', ['watch','jsmin','sass','cssmin','imagecompress']);
	    
	   