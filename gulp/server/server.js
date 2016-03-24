module.exports = {
    express: require('express'),
    path: require('path'),

    lr: null,
    app: null,
    server: null,

    startLiveReload: function (options) {
        this.lr = require('tiny-lr')();
        this.lr.listen(options.livereloadPort);
    },

    notifyLivereload: function (options) {
        this.lr.changed({
            body: {
                files: ['*']
            }
        });
    },

    stopExpress: function () {
        console.log('stop server');
        this.server.close();
    },

    startExpress: function (options) {
        let express = require('express');
        let bodyParser = require('body-parser');
        let path = require('path');

        this.app = express();
        if (options.liveReload) {
            console.log('START LIVE_RELOAD');
            this.app.use(require('connect-livereload')());
        }
        this.app.use('/', express.static(path.join(__dirname, '../../' + options.src)));

        // configure app to use bodyParser()
        // this will let us get the data from a POST
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(bodyParser.json());

        this.server = this.app.listen(options.port, ()=> {
            console.log('Express server listening on port %d', options.port, 'Exposing: ' + '/' + options.src);
        });
    }
};

