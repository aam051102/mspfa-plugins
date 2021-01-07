const gulp = require("gulp");
const minify = require("gulp-minify");
const connect = require("gulp-connect");
const cleanCSS = require('gulp-clean-css');

function js(next) {
    gulp.src("./src/**/*.js")
        .pipe(minify({
            ext: {
                min: ".js"
            },
            noSource: true
        }).on("error", err => console.error(err)))
        .pipe(gulp.dest("./dist"))
        .pipe(connect.reload());

    next();
}

function css(next) {
    gulp.src("./src/**/*.css",)
        .pipe(cleanCSS())
        .pipe(gulp.dest("./dist"))
        .pipe(connect.reload());
    
    next();
}

function html(next) {
    gulp.src("./src/**/*.html",)
        .pipe(gulp.dest("./dist"))
        .pipe(connect.reload());
    
    next();
}

function txt(next) {
    gulp.src("./src/**/*.txt",)
        .pipe(gulp.dest("./dist"))
        .pipe(connect.reload());
    
    next();
}


gulp.task("build", function(next) {
    js(next);
    css(next);
    html(next);
    txt(next);
    
    next();
});