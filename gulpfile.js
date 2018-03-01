const gulp = require('gulp'),
      watch = require('gulp-watch'),
      prefixer = require('gulp-autoprefixer'),
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      rigger = require('gulp-rigger'),
      cssmin = require('gulp-minify-css'),
      imagemin = require('gulp-imagemin'),
      pngquant = require('imagemin-pngquant'),
      rimraf = require('rimraf'),
      browserSync = require("browser-sync"),
      reload = browserSync.reload;

const path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/main.scss',
        img: 'src/img/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*'
    },
    clean: './build'
};

const config = {
    server: {
        baseDir: ["./build", './']
    },
    host: 'localhost',
    port: 3000,
    logPrefix: "Hillel"
};

// Html
gulp.task('html', () => {
    return gulp.src(path.src.html)
          .pipe(rigger())
          .pipe(gulp.dest(path.build.html))
          .pipe(reload({stream: true}));
});
// JavaScript
gulp.task('js', () => {
    return gulp.src(path.src.js)
          .pipe(rigger())
          .pipe(sourcemaps.init())
          .pipe(sourcemaps.write())
          .pipe(gulp.dest(path.build.js))
          .pipe(reload({stream: true}));
});
// Styles
gulp.task('style', () => {
    return gulp.src(path.src.style)
          .pipe(sourcemaps.init())
          .pipe(sass())
          .pipe(prefixer({
              browsers: ['last 2 versions'],
              cascade: false
          }))
          .pipe(cssmin())
          .pipe(sourcemaps.write())
          .pipe(gulp.dest(path.build.css))
          .pipe(reload({stream: true}));
});
// Images
gulp.task('image', () => {
    return gulp.src(path.src.img)
          .pipe(imagemin({
              progressive: true,
              svgoPlugins: [{removeViewBox: false}],
              use: [pngquant()],
              interlaced: true
          }))
          .pipe(gulp.dest(path.build.img))
          .pipe(reload({stream: true}));
});
// Clean
gulp.task('clean', (cb) => {
    rimraf(path.clean, cb);
});
// Webserver
gulp.task('webserver', () => {
    browserSync(config);
});
// Watch
gulp.task('watch', () => {
    watch([path.watch.html], (event, cb) => {
        gulp.start('html');
    });
    watch([path.watch.style], (event, cb) => {
        gulp.start('style');
    });
    watch([path.watch.js], (event, cb) => {
        gulp.start('js');
    });
    watch([path.watch.img], (event, cb) => {
        gulp.start('image');
    });
    watch([path.watch.fonts], (event, cb) => {
        gulp.start('fonts');
    });
});
// Build
gulp.task('build', ['html', 'js', 'style', 'image']);
// Default gulp
gulp.task('default', ['build', 'webserver', 'watch']);
