var gulp = require('gulp');
var babel = require('gulp-babel');

/** Prod */
gulp.task('babel', function babelCompile() {
    return gulp.src(['src/app.js', 'src/**/*.js'])
        .pipe(babel())
        .pipe(gulp.dest('./.tmp'));
});

gulp.task('default', ['babel']);