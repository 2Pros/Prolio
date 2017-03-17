var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    browserSync = require('browser-sync').create();

gulp.task('sass', function() {
  return gulp.src('app/assets/sass/**/*.scss')
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(gulp.dest('app/assets/css'))
  .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['browserSync'], function() {
    gulp.watch('assets/sass/**/*.scss', ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('scripts', function() {
  return gulp.src('app/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./src/'));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
})

gulp.task('default', ['scripts', 'sass', 'watch']);