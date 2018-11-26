"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var del = require("del");
//var run = require("run-sequence");
var server = require("browser-sync").create();
/*var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");*/

var uglify = require('gulp-uglify-es').default;
var pump = require('pump');

gulp.task("style", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("source/css"))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"));
  //.pipe(server.stream());
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png, jpg, svg}")
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("webp", function () {
  return gulp.src("source/img/content/**/*.{jpg,png}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("source/img/content"));
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2,otf,ttf,eot}",
    "source/img/**",
    "source/**/*.html"
  ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task('compress', function (cb) {
  pump([
        gulp.src('source/js/*.js'),
        uglify(),
        rename({ suffix: '.min' }),
        gulp.dest('build/js')
    ],
    cb
  );
});

gulp.task(
  "build",
  gulp.series(
    "clean",
    "copy",
    "style",
    "compress"
  )
);

gulp.task("serve", function () {
  server.init({
    server: "build/",
    notify: true,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("style"));
  gulp.watch("source/*.html", gulp.series("copy")).on("change", server.reload);
});

