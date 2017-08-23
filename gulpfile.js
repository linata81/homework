var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    BrowserSync     = require('browser-sync'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglifyjs'),
    cssnano         = require('gulp-cssnano'),
    rename          = require('gulp-rename')    
    del             = require('del'),
    imagemin        = require('gulp-imagemin'),
    pngquant        = require('imagemin-pngquant'),
    cache           = require('gulp-cache'),
    autoprefixer    = require('gulp-autoprefixer'),
    cssunit         = require('gulp-css-unit');

gulp.task('sass', function() {
    return gulp.src('app/sass/**/*.+(scss|sass)')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8'], { cascade: true}))
    .pipe(cssunit({
        type : "px-to-rem",
        rootSize: 16 
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(BrowserSync.reload({stream: true}))
});

gulp.task('scripts', function() {
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
});
gulp.task('css-libs', ['sass'], function() {
    return gulp.src('app/css/libs.css')
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'));
});

gulp.task('browser-sync', function() {
    BrowserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    })
});

gulp.task('clean', function() {
    return del.sync('dist')
});

gulp.task('clear', function() {
    return cache.clearAll();
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*')
    .pipe(cache(imagemin({
        interlaced: true,
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    })))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function() {
    gulp.watch('app/sass/**/*.+(scss|sass)', ['sass']);
    gulp.watch('app/**/*.html', BrowserSync.reload);
    gulp.watch('app/js/**/*.js', BrowserSync.reload);
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {
    var buildCss = gulp.src([
        'app/css/main.css',
        'app/css/*.css'
        // 'app/css/libs.min.css',
        // 'app/css/fonts.css'
    ])
    .pipe(gulp.dest('dist/css'));

    var buildSvg = gulp.src('app/svg/*.svg')
    .pipe(gulp.dest('dist/svg'));

    var buildPHP = gulp.src('app/*.php')
    .pipe(gulp.dest('dist'));

    var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));

    var buildJS = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'));

    var buildHtmlAll = gulp.src('app/html/**/*.html')
    .pipe(gulp.dest('dist/html'));

    var buildHtmlRoot = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));
});
gulp.task('default', ['watch']);