module.exports = function (gulp, pipes, $, options) {
    let gulpSequence = require('gulp-sequence')
        .use(gulp);
    let server = require('../server/server.js');

    pipes.plumberTask = ()=> {
        return $.plumber({
            errorHandler: options.errorHandler
        });
    };

    gulp.task('notifyLivereload', 'Notifie le serveur qu\'il doit recharger la page', ()=> {
        return server.notifyLivereload(options);
    });

    gulp.task('htmlWatcher', 'Lance le watcher des fichiers HTML', (cb)=> {
        let tasks = [];
        if (options.htmlLinters) {
            tasks.push('htmlLinters');
        }

        if (options.liveReload) {
            tasks.push('notifyLivereload');
        }

        return gulpSequence(...tasks)(cb);
    });

    gulp.task('jsWatcher', 'Lance le watcher des fichiers javascript', (cb)=> {

        let tasks = [];
        if (options.jsLinters) {
            tasks.push('jsLinters');
        }

        if (options.liveReload) {
            tasks.push('notifyLivereload');
        }

        return gulpSequence(...tasks)(cb);
    });

    gulp.task('sassWatcher', 'Lance le watcher des fichiers scss', (cb)=> {

        let tasks = ['buildCss'];

        options.cssLinters = false; // the linter doesn't work ( you can try to fix it ಠ_ಠ )

        if (options.cssLinters) {
            tasks.push('cssLinters');
        }

        if (options.liveReload) {
            tasks.push('notifyLivereload');
        }

        return gulpSequence(...tasks)(cb);
    });

    gulp.task('watch', 'Lance les watchers sur les fichiers html, javascript et scss', ()=> {
        if (options.watchHtml) {
            gulp.watch(options.htmlFiles, ['htmlWatcher']);
        }

        if (options.watchJs) {
            gulp.watch(options.jsFiles, ['jsWatcher']);
        }

        if (options.watchCss) {
            gulp.watch(options.scssFiles, ['sassWatcher']);
        }
    });

    gulp.task('::: DÉVELOPPEMENT :::', 'Lance le serveur de dev', ['watch'], ()=> {
        server.startExpress(options);
        if (options.liveReload) {
            server.startLiveReload(options);
        }
    });

    gulp.task('dev', 'Alias de ::: DÉVELOPPEMENT :::', ['::: DÉVELOPPEMENT :::']);

    gulp.task('::: RUN DISTRIBUABLE :::', 'Lance le serveur de dev', [], ()=> {
        options.src = options.dist;
        options.liveReload = false;
        server.startExpress(options);
    });

    gulp.task('runDist', 'alias de ::: TEST DISTRIBUABLE :::', ['::: TEST DISTRIBUABLE :::']);

};
