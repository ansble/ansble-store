var gulp = require('gulp')
    // , watch = require('gulp-watch')
    // , plumber = require('gulp-plumber')
    , concat = require('gulp-concat')
    , uglify = require('gulp-uglify')
    // , rename = require('gulp-rename')
    // , jshint = require('gulp-jshint')
    , sass = require('gulp-sass')
    , sourcemaps = require('gulp-sourcemaps')

    , mocha = require('gulp-mocha')

    , handlebars = require('gulp-handlebars')
    , defineModule = require('gulp-define-module')
    , declare = require('gulp-declare')
    
    //for restarting node on server file changes...
    , spawn = require('child_process').spawn
    , node;

gulp.task('default', ['localBuild'], function(){
    'use strict';

    gulp.watch([
                'public/javascripts/libs/*.js'
                , 'public/javascripts/app.js'
                , 'public/javascripts/components/**/*.js'
                , 'templates/*.html'
                , 'public/javascripts/components/**/*-template.html'
            ], function(){
        gulp.run('localBuild');
    });
});

gulp.task('server', function() {
    'use strict';

    if (node) {
        node.kill();
    }
    
    node = spawn('node', ['app.js'], {stdio: 'inherit'});

    node.on('close', function (code) {
        if (code === 8) {
          gulp.log('Error detected, waiting for changes...');
        }
    });
});

gulp.task('test', function (){
    'use strict';

    return gulp.src(['**/**_test.js', '!node_modules/**/*'], {read: false})
            .pipe(mocha({reporter: 'spec'}));
});

gulp.task('localBuild', ['buildTemplates'], function(){
    'use strict';
    
    gulp.src([
            'public/javascripts/libs/*.js'
            , '!public/javascripts/libs/zepto.min.js'
            , 'public/javascripts/app.js'
            , 'public/javascripts/built/templates.js'
            , './public/javascripts/components/**/*.js'
            ,'!./public/javascripts/components/**/*_test.js'
        ])
        .pipe(concat('app.js'))
        // .pipe(jshint())
        // .pipe(jshint.reporter('default'))
        .pipe(gulp.dest('public/javascripts/built/'))
        .pipe(uglify());
});

gulp.task('sass', function () {
    'use strict';

    gulp.src('./public/stylesheets/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./public/built/css'));
});

gulp.task('buildTemplates', function(){
    'use strict';

    gulp.src([
            './templates/*.html'
            , './public/javascripts/components/**/*-template.html'
        ])
        .pipe(handlebars())
        .pipe(defineModule('plain'))
        .pipe(declare({
          namespace: 'action.templates'
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('./public/javascripts/built/'));
});

gulp.task('build:prod', ['buildTemplates', 'localBuild'], function(){
    'use strict';
    
    gulp.src([
            'public/javascripts/action/*.min.js'
            , 'public/javascripts/built/*.min.js'
        ])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/javascripts/built/'));
});

gulp.task('dev', ['server', 'sass'], function () {
    'use strict';
    
    gulp.watch([
                './public/stylesheets/main.scss'
                , './public/stylesheets/colors.scss'
                , './public/fonts/fonts.scss'
                , './public/components/**/*.scss'
            ], ['sass']);

    gulp.watch([
            '!templates/*.js'
            , '!public/**/*.js'
            , '!node_modules/**/*.js'
            , '**/*.js'
            , 'templates/*.jst'
            , 'templates/*.def'
        ], ['server']);
});

process.on('exit', function() {
    'use strict';

    if (node) {
        node.kill();
    }
});