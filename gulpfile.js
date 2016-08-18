/**
 * Created by SeongJung on 2016-08-11.
 */
var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var pkg = require('./package.json');

var banner = ['/*!\n',
    ' * Modified by racell -' + (new Date()).getFullYear(), '<%= pkg.author %>\n',
    ' * Start Bootstrap - Creative v1.1.1 (http://startbootstrap.com/template-overviews/creative)\n',
    ' * Copyright 2013-' + (new Date()).getFullYear(), ' Start Bootstrap\n',
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
    ' */\n',
    ''
    ].join('');

gulp.task('default', ['less', 'minify-css', 'minify-js', 'copy']);

gulp.task('less', function () {
    return gulp.src('less/index.less')
        .pipe(less())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('minify-css', function () {
    return gulp.src('css/index.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min'}))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('minify-js', function () {
    return gulp.src('js/index.js')
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('bootstrap', function () {
    return gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('vendor/bootstrap'));
});

gulp.task('jquery', function () {
    return gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('vendor/jquery'));
});

gulp.task('magnific-popup', function () {
    return gulp.src(['node_modules/magnific-popup/dist/*'])
        .pipe(gulp.dest('vendor/magnific-popup'));
});

gulp.task('scrollreveal', function () {
    return gulp.src(['node_modules/scrollreveal/dist/*.js'])
        .pipe(gulp.dest('vendor/scrollreveal'));
});

gulp.task('fontawesome', function () {
    return gulp.src([
        'node_modules/font-awesome/**',
        '!node_modules/font-awesome/**/*.map',
        '!node_modules/font-awesome/.npmignore',
        '!node_modules/font-awesome/*.txt',
        '!node_modules/font-awesome/*.md',
        '!node_modules/font-awesome/*.json'
    ])
        .pipe(gulp.dest('vendor/font-awesome'));
});

gulp.task('copy', ['bootstrap', 'jquery', 'fontawesome', 'magnific-popup', 'scrollreveal']);

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: ''
        }
    });
});

gulp.task('dev', ['browserSync', 'less', 'minify-css', 'minify-js'], function () {
    gulp.watch('less/*.less', ['less']);
    gulp.watch('css/*.css', ['minify-css']);
    gulp.watch('js/*.js', ['minify-js']);
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
});