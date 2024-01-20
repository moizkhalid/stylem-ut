const gulp = require("gulp");
const { series } = require("gulp");
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify");
const csso = require("gulp-csso");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");

gulp.task("message", function (done) {
  console.log("Gulp is running!!");
  done();
});

// Copy All HTML files
gulp.task("copyHtml", function (done) {
  gulp.src("src/*.html").pipe(gulp.dest("dist"));
  done();
});
// Optimize
gulp.task("imageMin", function (done) {
  gulp.src("src/images/*").pipe(imagemin()).pipe(gulp.dest("dist/images"));
  done();
});

// Minify JS
gulp.task("minify", function (done) {
  gulp.src(["src/vendor/js/*.js", "src/js/*.js"]).pipe(sourcemaps.init()).pipe(uglify()).pipe(sourcemaps.write(".")).pipe(gulp.dest("dist/js"));
  done();
});

// Scripts
gulp.task("scripts", function (done) {
  gulp.src(["src/vendor/js/*.js", "src/js/*.js"]).pipe(sourcemaps.init()).pipe(concat("main.js")).pipe(uglify()).pipe(sourcemaps.write(".")).pipe(gulp.dest("dist/js"));
  done();
});

// CSS

gulp.task("styles", function (done) {
  gulp.src(["dist/css/*.css"]).pipe(sourcemaps.init()).pipe(concat("style.css")).pipe(csso()).pipe(sourcemaps.write(".")).pipe(gulp.dest("dist/css"));
  done();
});

gulp.task("default", gulp.series("message", "imageMin", "scripts", "styles"));

gulp.task("watch", function () {
  gulp.watch("src/vendor/js/*.js", gulp.series("scripts"));
  gulp.watch("src/js/*.js", gulp.series("scripts"));
  gulp.watch("src/css/*.css", gulp.series("styles"));
  gulp.watch("src/vendor/css/*.css", gulp.series("styles"));
  gulp.watch("src/images/*", gulp.series("imageMin"));
  // gulp.watch("src/*.html", gulp.series("copyHtml"));
});
