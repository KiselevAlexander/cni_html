'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    notify = require("gulp-notify"),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    htmlInjector = require("bs-html-injector"),
    inline_image = require('gulp-base64-image'),
    fileinclude = require('gulp-file-include'),
    htmlmin = require('gulp-htmlmin'),
    clean = require('gulp-clean'),
    jsonminify = require('gulp-jsonminify');


var PUBLIC_DIR = 'public';

var path = {
    build: {
        html: PUBLIC_DIR + '/',
        assets: PUBLIC_DIR + '/assets/',
        js: PUBLIC_DIR + '/js/',
        css: PUBLIC_DIR + '/css/',
        staticCSS: PUBLIC_DIR + '/css/',
        img: PUBLIC_DIR + '/images/',
        fonts: PUBLIC_DIR + '/fonts/',
        pages: PUBLIC_DIR + '/pages/',
        localization: PUBLIC_DIR + '/locales/'
    },
    src: {
        html: 'src/html/*.html',
        assets: 'src/assets/**/*.*',
        js: 'src/js/**/*.js',
        style: 'src/scss/*.scss',
        staticCSS: 'src/scss/css/**/*.css',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.{ttf,otf,eot,woff,css}',
        pages: 'src/pages/*',
        localization: 'src/locales/**/*.json'
    },
    watch: {
        html: 'src/**/*.html',
        assets: 'src/assets/**/*.*',
        js: 'src/js/**/*.js',
        style: ['src/scss/**/*.scss'],
        staticCSS: 'src/css/**/*.css',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.{ttf,otf,eot,woff,css}',
        pages: 'src/pages/*.htm',
        localization: 'src/locales/**/*.json'
    },
    clean: './public'
};

const config = {
    server: {
        baseDir: "./public"
    },
    tunnel: false,
    host: 'localhost',
    port: 3000,
    logPrefix: "CNI",
    open: true
};


const VENDORS = [
    'nodelist-foreach-polyfill',
    'core-js',
    'jquery',
    'swiper',
    'wheel-indicator',
    'device-detect',
    'i18next',
    'i18next-xhr-backend'
];

// Set NODE_ENV to production
gulp.task('apply-prod-environment', () => {
    process.stdout.write('Setting NODE_ENV to \'production\'\n');
    process.env.NODE_ENV = 'production';

    if (process.env.NODE_ENV !== 'production') {
        throw new Error('Failed to set NODE_ENV to production');
    } else {
        process.stdout.write('Successfully set NODE_ENV to production\n');
    }
});


// Clean JS and CSS Directories
gulp.task('clean', () => gulp
    .src([
        path.build.js,
        path.build.css,
        path.build.fonts,
        path.build.img,
        path.build.localization
    ], {read: false})
    .pipe(clean()).on('error', (e) => console.error(e)));


gulp.task('webserver', function () {
    browserSync.use(htmlInjector, {
        files: "src/*.html"
    });
    browserSync.init(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('html', function () {
    gulp.src(path.src.html)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            context: {
                logo: ''
            }
        })
            .on("error", notify.onError(function (error) {
                return "Error: " + error.message;
            })))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('assets', function () {
    gulp.src(path.src.assets)
        .pipe(gulp.dest(path.build.assets))
        .pipe(reload({stream: true}));
});

gulp.task('pages:build', function () {
    gulp.src(path.src.pages)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.pages))
        .pipe(reload({stream: true}));
});


/**
 * JAVASCRIPT
 */

const browserify = require('browserify');
const rename = require('gulp-rename');
const buffer = require('gulp-buffer');
const streamify = require('gulp-streamify');
const source = require('vinyl-source-stream');




gulp.task('vendors', () => {
    const vendor = 'vendors.js';
    const b = browserify();

    VENDORS.forEach((lib) => {
        b.require(lib, {
            expose: lib
        });
    });

    return b.bundle()
        .pipe(source(vendor))
        .pipe(rename({
            suffix: '.bundle'
        }))
        .pipe(streamify(uglify()))
        .pipe(buffer())
        .pipe(gulp.dest(path.build.js))
        .on('error', (e) => console.error(e));
});

const fs = require('fs');
const babelify = require('babelify');
const envify = require('envify/custom');
const babelrc = JSON.parse(fs.readFileSync('./.babelrc', 'utf8'));
const babelifyPresets = babelify.configure(babelrc);


gulp.task('javascript', function () {
    const b = browserify('./src/js/index.js', {
        transform: [babelifyPresets],
        bundleExternal: false
    })
        .transform(envify({
            NODE_ENV: process.env.NODE_ENV || 'development',
            DEBUG: true
        }), {
            global: true
        });

    const res = b.bundle()
        .on('error', (e) => console.error('\x1b[31m', 'Bundle error: ', '\x1b[0m', e.message))
        .pipe(source('script.js'))
        .pipe(rename({
            suffix: '.bundle'
        }))
        .pipe(streamify(uglify()))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .on('error', (e) => console.error(e));

        if (process.env.NODE_ENV !== 'production') {
            res.pipe(reload({stream: true}));
        }

    return res;

});

gulp.task('styles', function () {

    const b = gulp.src(path.src.style);

    b// .pipe(sourcemaps.init())
        .pipe(sass({
                includePaths: ['src/scss/'],
                outputStyle: 'compressed',
                sourceMap: true,
                errLogToConsole: true,
                functions: inline_image({url:'src/img/'})
            })
                .on("error", notify.onError(function (error) {
                    return "Error: " + error.message;
                }))
        )
        .pipe(prefixer())
        .pipe(cssmin())
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css));

    if (process.env.NODE_ENV !== 'production') {
        b.pipe(reload({stream: true}));
    }

});

gulp.task('staticCSS', function () {

    const b = gulp.src(path.src.staticCSS);

    b// .pipe(sourcemaps.init())
        .pipe(sass({
                includePaths: ['src/scss/'],
                outputStyle: 'compressed',
                sourceMap: true,
                errLogToConsole: true,
                functions: inline_image({url:'src/img/'})
            })
                .on("error", notify.onError(function (error) {
                    return "Error: " + error.message;
                }))
        )
        .pipe(prefixer())
        .pipe(cssmin())
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.staticCSS));

    if (process.env.NODE_ENV !== 'production') {
        b.pipe(reload({stream: true}));
    }

});

gulp.task('images', function () {
    const b = gulp.src(path.src.img);

    b.pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}, {convertStyleToAttrs: false}],
        use: [pngquant()],
        interlaced: true
    }))
        .pipe(gulp.dest(path.build.img));

    if (process.env.NODE_ENV !== 'production') {
        b.pipe(reload({stream: true}));
    }
});

gulp.task('fonts', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('localization', function() {
    const b = gulp.src(path.src.localization);

    b.pipe(streamify(jsonminify()))
        .pipe(gulp.dest(path.build.localization));

    if (process.env.NODE_ENV !== 'production') {
        b.pipe(reload({stream: true}));
    }

});

gulp.task('build_project' , [
    'html',
    'assets',
    'vendors',
    'javascript',
    'styles',
    'staticCSS',
    'fonts',
    'images',
    'localization'
]);

gulp.task('build',  ['apply-prod-environment', 'clean'], () => {

    gulp.start('build_project');

});


gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html');
    });

    watch([path.watch.pages], function(event, cb) {
        gulp.start('assets');
    });

    watch([path.watch.pages], function(event, cb) {
        gulp.start('pages:build');
    });

    watch(path.watch.style, function(event, cb) {
        setTimeout(function(){
            gulp.start('styles');
        }, 600);
    });

    watch(path.watch.staticCSS, function(event, cb) {
        setTimeout(function(){
            gulp.start('staticCSS');
        }, 600);
    });

    watch([path.watch.js], function(event, cb) {
        gulp.start('javascript');
    });

    watch([path.watch.img], function(event, cb) {
        gulp.start('images');
    });

    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts');
    });

    watch([path.watch.localization], function(event, cb) {
        gulp.start('localization');
    });

});

gulp.task("default", ['build_project', 'webserver'], function () {
    gulp.start('watch');
    reload({stream: true});
});