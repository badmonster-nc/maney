const del = require('del');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const exec = require('gulp-exec');
const templateCache = require('gulp-angular-templatecache');

module.exports = (gulp, pipes, $, options)=> {

    let gulpSequence = require('gulp-sequence')
        .use(gulp);

    pipes.delDist = ()=> {
        return del([`${options.dist}/**/*`]);
    };

    pipes.buildCss = ()=> {
        return gulp.src(`${options.src}/styles/index.scss`)
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe($.autoprefixer({
                cascade: false
            }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(`${options.src}/styles`));
    };

    pipes.minifyJs = ()=> {
        return gulp.src([`${options.src}/src/**/*.js`])
            .pipe($.babel({
                presets: ['es2015', 'stage-0']
            }))
            .pipe($.ngAnnotate())
            .pipe($.uglify({
                mangle: {toplevel: true},
                compress: true,
                preserveComments: false
            }))
            .pipe(gulp.dest(`${options.dist}/src/`));
    };

    pipes.copyClient = ()=> {
        return gulp
            .src([
                `${options.src}/**/*.*`,
                `!${options.src}/tests/**`,
                `!${options.src}/src/**/*.js`,
                `!${options.src}/styles/**/*.scss`
            ])
            .pipe(gulp.dest(`${options.dist}`));
    };

    //this is not used by default due to a race condition ie:Angular Material load before Angular
    pipes.buildDepcache = ()=> {
        return gulp.src([`${options.src}/config.js`])
            .pipe(exec(`jspm depcache ./${options.src}/src/bootstrap`))
    };

    //this is not used by default due to a it's absolute vs relative path, that makes it less generic
    pipes.buildTemplates = ()=> {
        return gulp.src([`${options.src}/src/**/*.html`])
            .pipe(templateCache('ng_templates.js', {standalone: 'true'}))
            .pipe(gulp.dest(`${options.src}/src/ng_templates`));
    };

    pipes.buildDist = (cb)=> {
        return gulpSequence('delDist', 'buildCss', 'copyClient', 'minifyJs', cb);
    };


    gulp.task('::: DISTRIBUABLE :::', '', pipes.buildDist);

    gulp.task('dist', 'Alias de ::: DISTRIBUABLE :::', ['::: DISTRIBUABLE :::'])

    gulp.task('delDist', '', pipes.delDist);

    gulp.task('minifyJs', '', pipes.minifyJs);

    gulp.task('copyClient', '', pipes.copyClient);

    gulp.task('buildDepcache', '', pipes.buildDepcache);

    gulp.task('buildTemplates', '', pipes.buildTemplates);

    gulp.task('buildCss', '', pipes.buildCss);

};
