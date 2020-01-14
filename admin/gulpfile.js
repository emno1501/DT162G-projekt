"use strict";

const { src, dest, watch, series, parallel } = require("gulp");
const babel = require("gulp-babel");
const sass = require("gulp-sass");
sass.compiler = require("node-sass");
const sourcemaps = require("gulp-sourcemaps");

//Sökvägar
const files = {
    jsPath: "src/*.js",
    scssPath: "src/scss/*.scss",
}

/*JavaScript-task: Översätt senare versioner av EcmaScript 
till ES5 och lägg översatt fil i public-katalogen */
function jsTask() {
    return src(files.jsPath)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write("./"))
        .pipe(dest("public"))
}

//Task: Kopiera och konvertera SCSS-filer till en CSS-fil och minifiera CSS-filen
function scssTask() {
    return src(files.scssPath)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
        .pipe(sourcemaps.write("./"))
        .pipe(dest("public/css"))
}

//Task: Watcher
function watchTask() {
    watch([files.jsPath, files.scssPath], 
        parallel( 
            jsTask, 
            scssTask)  
    )
}

exports.default = series(
    parallel( 
        jsTask, 
        scssTask),
    watchTask
);