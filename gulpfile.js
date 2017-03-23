var gulp = require('gulp'),
    //concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    useref = require('gulp-useref'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    del = require('del'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create();

gulp.task('sass', function() {
  return gulp.src('app/assets/sass/styles.scss')
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(gulp.dest('app/assets/css'))
  .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['browserSync'], function() {
    gulp.watch('app/assets/sass/**/*.scss', ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

// gulp.task('scripts', function() {
//   return gulp.src('app/*.js')
//     .pipe(concat('all.js'))
//     .pipe(gulp.dest('./src/'));
// });

 gulp.task('useref', function(){
   return gulp.src('./*.html')
     .pipe(useref())
     .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
    // Setting interlaced to true
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function() {
  return gulp.src('bower_components/material-design-iconic-font/dist/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
});

gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    ['sass', 'useref', 'images', 'fonts'],
    callback
  )
})

gulp.task('default', function (callback) {
  runSequence(['sass', 'useref', 'browserSync', 'watch'],
    callback
  )
})