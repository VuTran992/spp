const { series, watch, src, dest, parallel } = require('gulp');
const del = require('del');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

//
const browserSync = require('browser-sync');

//scripts
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

//styles
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');


var settings = {
    reload: true,
    scripts: true
};
/**
 * Paths to project folders
 */

var paths = {
    input: "src/",
    output: "dist/",
    styles: {
        input: "src/scss/**/*.{scss, sass, css}",
        output: "dist/styles/"
    },
    scripts: {
        vendor: [
            "src/vendors/jquery/jquery-3.6.0.min.js",
            "src/vendors/popper/popper.min.js",
            "src/vendors/bootstrap/bootstrap.min.js"
        ],
        input: "src/js/**/*.js",
        polyfills: ".polyfill.js",
        output: "dist/scripts/"
    },
    html: {
        input: "src/*.html",
        output: "dist/"
    },
    reload: "./dist/"
};


// Lint, minify, and concatenate scripts
function scripts(done) {

    // concat vendors
    src(paths.scripts.vendor)
        .pipe(concat('vendor.js'))
        .pipe(dest(paths.scripts.output));

    // concat js
    src(paths.scripts.input)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(dest(paths.scripts.output));

    return done();
};

// Sass, Postcss

function styles() {
    var plugins = [
        autoprefixer(),
        cssnano()
    ];

    return src(paths.styles.input)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write())
        .pipe(dest(paths.styles.output));
}

// Html

function html() {
    return src(paths.html.input)
        .pipe(dest(paths.output));
}

function cleanDist(cb) {
    del.sync(paths.output);
    return cb();
}

function startServer(done) {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    done();
}

function reloadBrowser(done) {
    if (!settings.reload) return done();
    browserSync.reload();
    done();
}

function watchSource(done) {
    watch(paths.input, series(exports.build, reloadBrowser));
    done();
}

/**
 * Gulp Tasks
 */

// 


exports.build = series(
    cleanDist,
    parallel(scripts, styles, html)
);
exports.watch = series(
    exports.build,
    startServer,
    watchSource);


exports.default = series(exports.build);