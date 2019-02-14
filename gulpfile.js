let gulp = require("gulp");
let sass = require("gulp-sass");
let concat = require("gulp-concat");
let clean = require("gulp-clean-css");

gulp.task("sass", function () {
    return gulp.src(["./scss/*.scss","!.scss/common.scss"])
        .pipe(sass())
        .pipe(clean())
        .pipe(gulp.dest("./css"))
})

gulp.task("concat",function(){
    return gulp.src("./css/*.css")
        .pipe(concat("style.css"))
        .pipe(gulp.dest("./css"))
})

gulp.task("watch",function(){
    return gulp.watch("./scss/*.scss",gulp.series("sass"))
})

gulp.task("dev",gulp.series("sass","watch"))