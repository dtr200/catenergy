let gulp = require('gulp'),
    less = require('gulp-less'),
    minify = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify-es').default,
    concat = require('gulp-concat'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    del = require('del');

gulp.task('less', function () {
    return gulp.src('less/style.less')
        .pipe(less())
        .pipe(postcss([
            autoprefixer({ browsers: ['last 5 version'] })
        ]))
        //.pipe(rename({ suffix: '.min' }))
        //.pipe(minify())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({ stream: true }))
});
gulp.task('watch', function () {
    gulp.watch(['less/**/*.less', 'less/*.less'], gulp.parallel('less'));
    gulp.watch('*.html', gulp.parallel('html'));
    gulp.watch('js/*.js', gulp.parallel('js'));
})

gulp.task('html', function () {
    return gulp.src('*.html')
        .pipe(browserSync.reload({ stream: true }))
})

gulp.task('js', function () {
    return gulp.src('js/*.js')
        //.pipe(concat('libs.min.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('js'))
        .pipe(browserSync.reload({ stream: true }))
})

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('copy', function () {
    gulp.src([
        'css/*.min.css',
        ['img/*.{png, svg, jpg}', 'img/**/*.{ png, svg, jpg } '],
        'js/*.min.js',
        '*.html'
    ], {
        base: 'template'
    })
        .pipe(gulp.dest('build'))
})

gulp.task('del', function () {
    return del.sync(['css/*.css', 'js/libs.min.js'])
})
gulp.task('default', gulp.parallel('browser-sync', 'watch'))