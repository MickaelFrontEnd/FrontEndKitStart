// CONFIGURATION FILE FOR PATH
var CONFIG = require ('./gulpconfig');

// MODULES
var gulp = require ('gulp');
var postCss = require ('gulp-postcss');
var cssWring = require ('csswring');
var stylus = require ('gulp-stylus');
var autoprefixer = require ('autoprefixer');
var rename = require ('gulp-rename');
var browserSync = require ('browser-sync').create ();
var nodemon = require ('nodemon');
var pug = require ('gulp-pug');
var htmlBeautify = require ('gulp-html-beautify');
var imageMin = require ('gulp-imagemin');
var babel = require ('gulp-babel');
var uglify = require ('gulp-uglify');
var clean = require ('gulp-clean');

// TASK LIST
gulp.task ('browserSync', ['nodemon'], function () {
  browserSync.init (null,{
    proxy: CONFIG.SERVER.PROXY,
    port: '3002'
  });
});

gulp.task ('reload', function () {
  return browserSync.reload;
});

gulp.task ('views', function () {
  return gulp.src (CONFIG.VIEWS.SRC)
        .pipe (pug ({}))
        .pipe (htmlBeautify ({
          indent_size: 2,
          indent_with_tabs: true
        }))
        .pipe (gulp.dest (CONFIG.VIEWS.DEST));
});

gulp.task ('styles', function ()  {
  var processors = [
    cssWring,
    autoprefixer
  ];
  
  return gulp.src (CONFIG.STYLES.SRC)
        .pipe (stylus ())
        .pipe (postCss (processors))
        .pipe (rename ('global.min.css'))
        .pipe (gulp.dest (CONFIG.STYLES.DEST));
});

gulp.task ('js', function () {
  return gulp.src (CONFIG.SCRIPTS.SRC)
             .pipe (babel ({
               presets: ['env']
             }))
             .pipe (uglify ())
             .pipe (rename ('App.min.js'))
             .pipe (gulp.dest (CONFIG.SCRIPTS.DEST));
});

gulp.task ('images', function () {
    return gulp.src (CONFIG.IMAGES.SRC)
               .pipe (imageMin ())
               .pipe (gulp.dest (CONFIG.IMAGES.DEST));
});

gulp.task ('copyFonts', function () {
  return gulp.src (CONFIG.FONTS.SRC)
             .pipe (gulp.dest (CONFIG.FONTS.DEST));
});

gulp.task ('clean', function () {
  return gulp.src ('./dist', {read: false})
             .pipe (clean ());
});

gulp.task ('watch', function () {
  gulp.watch (CONFIG.STYLES.SRC,['styles', 'reload']);
  gulp.watch (CONFIG.VIEWS.SRC,['views', 'reload']);
  gulp.watch (CONFIG.SCRIPTS.SRC,['js', 'reload']);
  gulp.watch (CONFIG.IMAGES.SRC,['images', 'reload']);
  gulp.watch (CONFIG.FONTS.SRC,['copyFonts', 'reload']);
});

gulp.task ('build', ['clean','views','styles','images','copyFonts']);

gulp.task ('nodemon', function (cb) {
  var started = false;
  return nodemon ({
    script: './app/routes/index.js'
  }).on ('start',function () {
    if (!started) {
      started = true;
      cb ();
    }
  });
});

gulp.task ('serve',['build','watch','browserSync'], function (cb) {
  var started = false;
  return nodemon ({
    script: './app/routes/index.js'
  }).on ('start',function () {
    if (!started) {
      started = true;
      cb ();
    }
  });
});

gulp.task ('default',['build']);
