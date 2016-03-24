const scsslint = require('gulp-scss-lint');


module.exports = function (gulp, pipes, $, options) {

    pipes.jsLinters = ()=> {
        return gulp.src(['./' + options.src + '/src/**/**.js', '!**/bootstrap.js'])
            .pipe(pipes.plumberTask())
            .pipe($.eslint())
            .pipe($.eslint.format(require('eslint-friendly-formatter')))
            .pipe($.eslint.format('checkstyle', require('fs').createWriteStream('checkstyle.xml')));
    };

    pipes.cssLinters = ()=> {
        return gulp.src(options.scssFiles)
            .pipe(scsslint({
                'reporterOutputFormat': 'Checkstyle',
                'filePipeOutput': './scsslint-checkstyle.xml'
            }))
            .pipe(gulp.dest('./'));
    };

    pipes.htmlhint = ()=> {
        return gulp.src(options.htmlFiles)
            .pipe(pipes.plumberTask())
            .pipe($.htmlhint('.htmlhintrc'))
            .pipe($.htmlhint.reporter());
    };

    //Linters task
    gulp.task('jsLinters', 'Lance les linters jscs et jshint sur les fichiers javascript', pipes.jsLinters);

    gulp.task('cssLinters', 'Lance le linter SCSS (nécessite ruby et scss-lint gem)', pipes.cssLinters);

    gulp.task('htmlLinters', 'lance les linters HTML', pipes.htmlhint);

};

