var gulp = require('gulp'),
	// BrowserSync requires
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	// Other module requires
	markdown = require('gulp-markdown');


// browser-sync task
gulp.task('browser-sync', ['markdown'], function(){
	browserSync.init(null, {
		server: {
			baseDir: './app/dist',
			directory: false
		},
		debugInfo: false,
        open: true,
	}, function (err, bs) {
        //require('opn')(bs.options.url);
        console.log('Started connect web server on ' + bs.options.url);
    });
});

// Other tasks
gulp.task('markdown', function(){
	gulp.src('app/src/*.md')
		.pipe(markdown())
		.pipe(gulp.dest('app/dist'))
		.pipe(reload({stream:true, once:true}));
});

// Watch task
gulp.task('watch', ['markdown', 'browser-sync'], function(){
	gulp.watch('app/src/*.md', ['markdown', reload]);
	gulp.watch('app/dist/*.html', reload);
});