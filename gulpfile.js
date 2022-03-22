var settings = {
        reload: true,
        scripts: true
};

/**
 * Paths to project folders
 */

var paths ={
        input: "src/",
        output: "dist/",
      
        scripts: {
            input: "src/js/*",
            polyfills: ".polyfill.js",
            output: "dist/js/"
        },
        html: {
            input: "src/*.html",
            output: "dist/"
        },


        reload: "./dist/"

}


/**
 * Gulp Packages
 */

const { series, watch, src, dest } = require('gulp');


// Scripts

var babel = require('gulp-babel');

// BrowserSync
const browserSync = require('browser-sync');


/**
 * Gulp Tasks
 */

// 

function buildHtmls(){
        return src(paths.html.input)
        .pipe(dest(paths.output));
}


// Lint, minify, and concatenate scripts
var buildScripts = function(done){

    // Make sure this feature is activated before running
	if (!settings.scripts) return done();


}



function startServer(done){


    // Make sure this feature is activated before running.
    if(!settings.reload) return done();

    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    })

    done();
}


function reloadBrowser(done) {
    if(!settings.reload) return done();
    browserSync.reload();
    done();
}

function watchSource(done){
    watch(paths.input, series(exports.build, reloadBrowser))
    done();
}

// Default tasks
// gulp

exports.default = series(startServer)
exports.build = series(buildHtmls)
exports.watch = series(
    exports.build,
    startServer,
    watchSource)
