'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);
/*
gulp.task('modules', function() {
    sources = [
      './geolocation.js',
      //'./node_modules/prismjs/themes/prism-dark.css',
    ]
    gulp.src( sources ).pipe(gulp.dest('./public/modules/'));
});

gulp.task('copy-modules', ['modules']);*/

build.initialize(gulp);
