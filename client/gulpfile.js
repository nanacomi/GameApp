const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

gulp.task('js', () => {
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest('./'));
});

gulp.task('default', () => {
  gulp.watch('./src/*.js', gulp.series('js'));
});