var gulp = require('gulp');
var babel = require('gulp-babel');
var connect = require('gulp-connect');
var sourcemaps = require('gulp-sourcemaps');




gulp.task("default", function(){
    return gulp.src("src/app.js")
    .pipe(babel())
    .pipe(gulp.dest("dist"))
})