module.exports = (gulp, pipes, $, options)=> {
    let server = require('../server/server.js');

    gulp.task('webdriver_update', 'Lance la mise à jour du webdriver', $.protractor.webdriver_update);

    gulp.task('::: TEST D\'INTEGRATION :::', 'Execute les TI avec protractor', ['webdriver_update', '::: DÉVELOPPEMENT :::'], (done)=> {

        let randomPort = options.port;
        options.port = randomPort;
        gulp.src(['e2e/*spec.js'])
            .pipe($.protractor.protractor({
                'configFile': 'client/tests/e2e/protractor.conf.js',
                'args': ['--baseUrl', 'http://localhost:5000'],
                'debug': false
            }))
            .on('error', (e)=> {
                $.util.log(e.toString());
                throw e;
            })
            .on('end', ()=> {
                server.stopExpress();
                done();
                console.log('fin des tests');
                process.exit(0);
            });
    });

    gulp.task('testInteg', 'Alias de ::: TEST D\'INTEGRATION :::', ['::: TEST D\'INTEGRATION :::'])

    gulp.task('elementor', 'Lance elementor', ['webdriver_update', 'server'], (cb)=> {
        let exec = require('child_process')
            .exec;
        exec('webdriver-manager start', (err, stdout, stderr)=> {
            console.log(stdout);
            console.log(stderr);
            cb(err);
        });
        setTimeout( () => {
            console.log('Webdriver demarré');
        }, 3000);
        exec('elementor http://localhost:' + options.port, (err, stdout, stderr)=> {
            console.log(stdout);
            console.log(stderr);
            cb(err);
        });
    });
};
