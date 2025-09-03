const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));

gulp.task('sass', function () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.series('sass', 'serve'));