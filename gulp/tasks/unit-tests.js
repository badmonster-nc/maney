module.exports = function (gulp, pipes, $, options) {
    let Server = require('karma')
        .Server;

    /**
     * Watch for file changes and re-run tests on each change
     */
    gulp.task('::: TEST UNITAIRE :::', 'Lances les tests karma à la sauvegarde sur les navigateurs Firefox, Chrome et PhantomJS',
        (done)=> {
            new Server({
                configFile: __dirname + '/../../karma.conf.js',
                browsers: options.karmaBrowser,
                autoWatch: options.karmaAutoWatch,
                singleRun: options.karmaSingleRun,
                reporters: ['progress'],
                preprocessors: {}
            }, ()=> {
                done();
            }).start();
        });

    gulp.task('testUnit', 'Alias de ::: TEST UNITAIRE :::', ['::: TEST UNITAIRE :::'])

    gulp.task('::: COVERAGE REPORT :::', 'Generates the coverage report',
        (done)=> {
            new Server({
                configFile: __dirname + '/../../karma.conf.js',
                browsers: options.karmaBrowser,
                autoWatch: options.karmaAutoWatch,
                singleRun: options.karmaSingleRun,
                preprocessors: {
                    'client/src/**/*.js': ['babel'],
                    'client/libs/**/*.js': ['babel'],
                    'client/src/**/*.js': ['coverage'],
                    'client/libs/**/*.js': ['coverage']
                },
            }, ()=> {
                done();
            }).start();
        });

    gulp.task('test', 'Alias de ::: COVERAGE REPORT :::', ['::: COVERAGE REPORT :::'])

};
