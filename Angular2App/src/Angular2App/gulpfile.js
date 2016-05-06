/// <binding ProjectOpened='watch' />
"use strict";

var gulp = require("gulp"),
    lodash = require("lodash"),
    ts = require("gulp-typescript");

var tsProject = ts.createProject('tsconfig.json');

var nodeModulesToCopy = [
    '@angular',
    'rxjs',
    'angular2-in-memory-web-api',
    'systemjs',
    'zone.js',
    'reflect-metadata',
    'es6-shim'
];

gulp.task('copy-node-modules', function () {
    lodash.forEach(nodeModulesToCopy, function (path, _) {
        gulp.src('./node_modules/' + path + '/**/*')
            .pipe(gulp.dest('./wwwroot/lib/' + path));
    });
});

gulp.task('typescript', function () {
    var tsResult = tsProject.src().pipe(ts(tsProject));
    return tsResult.js.pipe(gulp.dest('wwwroot/js'));
});

gulp.task("watch", function () {
    gulp.watch(['./wwwroot/js/**/*.ts'], ['typescript']);
});