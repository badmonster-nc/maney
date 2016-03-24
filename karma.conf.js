// Karma configuration
// Generated on Mon Aug 03 2015 10:58:11 GMT+1100 (Pacifique Centre)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jspm', 'jasmine'],


        jspm: {
            config: 'client/config.js',
            packages: 'client/jspm_packages/',
            loadFiles: [
                'client/tests/unit/**/*.js'
            ],
            serveFiles: [
                'client/src/**/*.*',
                'client/libs/**/*.*'
            ]
        },


        coverageReporter: {
            instrumenters: {isparta: require('isparta')},
            instrumenter: {
                '**/*.js': 'isparta'
            },
            instrumenterOptions: {
                isparta: {
                    babel: {
                        presets: ['es2015', 'stage-0']
                    }
                }
            },
            reporters: [
                {type: 'text-summary', subdir: '.'},
                {type: 'cobertura', subdir: '.', file: 'cobertura.xml'},
                {type: 'lcovonly', subdir: '.'},
                {type: 'html', subdir: 'html'}
            ]
        },

        // fix for PhantomJs & Coverage
        files: [
            'node_modules/babel-polyfill/dist/polyfill.js',
            'client/src/**/*.html'
        ],

        proxies: {
            '/base/jspm_packages/': '/base/client/jspm_packages/'
        },


        // list of files to exclude
        exclude: [],


        preprocessors: {
            'client/src/**/*.js': ['babel'],
            'client/libs/**/*.js': ['babel']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        plugins: [
            'karma-jspm',
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-coverage'
        ],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        browserNoActivityTimeout: 60000
    });
}
