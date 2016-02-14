/**
 * Created by ethan-liu on 16/1/5.
 */
'use strict';

var gulp = require('gulp');
var gutil = require("gulp-util");
var clean = require('gulp-clean');
var webpack = require("webpack");
var config = require('./webpack.config.js');

gulp.task('clean', function(){
    return gulp.src('assets', {read: false}).pipe(clean());
});

gulp.task('build-backend', function(done) {
    webpack(config).run(function(err, stats) {
        if(err) {
            console.log('Error', err);
        }
        else {
            console.log(stats.toString());
        }
        done();
    });
});