const gulp        = require('gulp');
const sass        = require('gulp-sass');
const minifycss   = require('gulp-clean-css');
const rename      = require("gulp-rename");
const uglify      = require('gulp-uglify');
const imagemin    = require('gulp-imagemin');
const babel       = require('gulp-babel');
const merge       = require('merge-stream');
const browserSync = require('browser-sync').create();


gulp.task('watch', ['browserSync', 'styles', 'scripts', 'fonts', 'sass', 'imagemin', 'uglify'], () => {
    gulp.watch('src/scss/main.scss', ['sass'])
    gulp.watch('src/js/main.js', ['uglify'])
    gulp.watch('src/img/*', ['imagemin'])
    gulp.watch("./*.html", browserSync.reload)
})

gulp.task('styles', () => {
    gulp.src('./node_modules/materialize-css/dist/css/*.min.css')
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('scripts', () => {
    const materialize = gulp.src('./node_modules/materialize-css/dist/js/*.min.js')
                            .pipe(gulp.dest('./dist/js'))
    const jquery      = gulp.src('./node_modules/jquery/dist/*.min.js')
                            .pipe(gulp.dest('./dist/js'))
    return merge(materialize, jquery)
})

gulp.task('fonts', () => {
    gulp.src('./node_modules/materialize-css/dist/fonts/roboto/*')
        .pipe(gulp.dest('./dist/fonts/roboto'))
})

gulp.task('minify-css', () => {
    return gulp.src('dist/css/style.css')
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css/'))
})

gulp.task('browserSync', () => {
    browserSync.init({
        server:'./'
    })
})

gulp.task('sass', () => {
    return gulp.src('src/scss/main.scss')
    .pipe(sass())
    .pipe(rename('style.min.css'))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.reload({
        stream: true
    }))
})

gulp.task('uglify', () => {
    gulp.src('src/js/main.js')
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(uglify())
    .pipe(rename('script.min.js'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(browserSync.reload({
        stream: true
    }))
})

gulp.task('imagemin', () => {
    gulp.src('src/img/*.+(png|jpg|gif|svg)')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img/'))
})

gulp.task('default', ['watch'])