var gulp = require('gulp')
    // , watch = require('gulp-watch')
    // , plumber = require('gulp-plumber')
    , concat = require('gulp-concat')
    , uglify = require('gulp-uglify')
    // , rename = require('gulp-rename')
    // , jshint = require('gulp-jshint')
    , sass = require('gulp-sass')
    , sourcemaps = require('gulp-sourcemaps')

    , handlebars = require('gulp-handlebars')
    , defineModule = require('gulp-define-module')
    , declare = require('gulp-declare')

    , cp = require('child_process')
    , argv = require('yargs').argv

    , pkg = require('./package.json');

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

gulp.task('test', function (){
    'use strict';

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

gulp.task('dev', function () {
    'use strict';
    
    gulp.watch([
                './public/stylesheets/main.scss'
                , './public/stylesheets/colors.scss'
                , './public/fonts/fonts.scss'
                , './public/components/**/*.scss'
            ], ['sass']);
});