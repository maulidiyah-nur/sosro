var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');


gulp.task('sass', function(){
    return gulp.src([
        'app/scss/styles.scss',
        'node_modules/bootstrap/scss/bootstrap.scss'
    ])
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
        stream: true
    }))
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
})

gulp.task('watch', ['browserSync', 'sass'], function(){
    gulp.watch('app/scss/**/*.scss', ['sass']); 
    gulp.watch('app/**/*.html', browserSync.reload); 
    gulp.watch('app/js/**/*.js', browserSync.reload); 
})

gulp.task('js', function() {
    return gulp.src([
        'node_modules/jquery/docs/jquery.min.js',
        'node_modules/bootstrap/docs/js/bootstrap.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js',
        'node_modules/owl.carousel/docs/owl.carousel.min.js'
    ])
    .pipe(gulp.dest('app/js'))
})

gulp.task('css', function() {
    return gulp.src([
        'node_modules/owl.carousel/docs/assets/owl.carousel.min.css'
    ])
    .pipe(gulp.dest('app/css'))
})

gulp.task('useref', function(){
    return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('docs'))
});

gulp.task('images', function(){
    return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin({
        interlaced: true
    })))
    .pipe(gulp.dest('docs/images'))
});

gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('docs/fonts'))
})

gulp.task('html', function() {
    return gulp.src('app/html/**/*')
    .pipe(gulp.dest('docs/html'))
})

gulp.task('clean:docs', function() {
    return del.sync('docs');
})

gulp.task('build', function (callback) {
    runSequence('clean:docs', 
      ['sass', 'js', 'css', 'html', 'useref', 'images', 'fonts'],
      callback
    )
})

gulp.task('default', function (callback) {
    runSequence(['sass', 'js', 'css', 'browserSync', 'watch'],
        callback
    )
})