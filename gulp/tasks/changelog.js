module.exports = function (gulp, pipes, $, options) {
    let changelog = require('conventional-changelog');

    function makeChangelog(config) {
        let deferred = $.q.defer();
        changelog(config, function (err, log) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(log);
            }
        });
        return deferred.promise;
    }

    gulp.task('changelog', 'Génère le fichier CHANGELOG.md', ()=> {
        let changelogFile = 'CHANGELOG.md';
        let packageJson = require('../../package.json');
        let config = {
            file: changelogFile,
            repository: packageJson.repository.url,
            version: packageJson.version
        };
        return makeChangelog(config)
            .then((log)=> {
                $.fs.writeFileSync(changelogFile, log);
            });
    });
};

