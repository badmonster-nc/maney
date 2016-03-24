//require('babel/register');

exports.config = {

    specs: [
        './**/*.spec.js'
    ],
    directConnect: true,
    baseUrl: 'http://localhost:5000',
    onPrepare: function () {
        require('babel-core/register')({presets: ['es2015','stage-0']})
    }

};
