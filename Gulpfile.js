var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var cleancss = require('gulp-cleancss');

// Sass
// Static Server + watching scss files
gulp.task('serve', ['mobileCSS', 'belowFold', '900pxCSS'], function() {

    browserSync.init({
        watch: true,
        server: "./_site"
    });

    gulp.watch(['**/*.scss', '_site/*.html'], ['mobileCSS', 'belowFold', '900pxCSS']);
});

// Compile Sass into CSS as 3 tasks
// 1
gulp.task('mobileCSS', function() {
    return gulp.src("./sass/aboveFold.scss")
        .pipe(sass())
        .pipe(cleancss({keepBreaks: false}))
        .pipe(gulp.dest("./_includes"))
        .pipe(browserSync.stream());
});
// 2
gulp.task('belowFold', function() {
    return gulp.src("./sass/belowFold.scss")
        .pipe(sass())
        .pipe(cleancss({keepBreaks: false}))
        .pipe(gulp.dest("./_site/css/"))
});
// 3
gulp.task('900pxCSS', function() {
    return gulp
      .src("./sass/900px.scss")
      .pipe(sass())
      .pipe(cleancss({ keepBreaks: false }))
      .pipe(gulp.dest("./_site/css/"));
});

gulp.task('default', ['serve']);
