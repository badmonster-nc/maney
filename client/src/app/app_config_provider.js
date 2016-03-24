export default (ngModule) =>
ngModule
    .provider('AppConfig', AppConfigProvider);

function AppConfigProvider() {

    this.config = {
        'secret': null,
        'endpoint': null,
        'data': null
    };

    this.$get = function AppConfigFactory() {
        return {
            config: this.config
        };
    };
}
