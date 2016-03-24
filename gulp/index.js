let gulp = require('gulp-help')(require('gulp'));

let plugins = require('gulp-load-plugins')({
    pattern: [
        'gulp-*',
        'del',
        'fs',
        'q'
    ],
    camelize: true,
    lazy: true,
});

let wrench = require('wrench');

let options = require('./options');

let pipes = {};

wrench.readdirSyncRecursive('./gulp/tasks')
    .filter((file)=> {
        return (/\.(js|coffee)$/i)
            .test(file);
    })
    .filter((file)=> {
        return !(/server/)
            .test(file);
    })
    .map((file)=> {
        require('./tasks/' + file)(gulp, pipes, plugins, options);
    });

// Start the tasks
gulp.task('default', ['::: DÉVELOPPEMENT :::']);


