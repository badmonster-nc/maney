import ngAnimate from 'angular-animate';
import ngMaterial from 'angular-material';
import AppRunService from './app_run_service';
import AppController from './app_controller';
import CardComponent from '../card/card_component';
import AppConfigProvider from './app_config_provider';

let AppModule = angular
    .module('AppModule', [
        'ngAnimate',
        'ngMaterial'
    ])
    .config(doConfig)
    .run(AppRunService => AppRunService);

function doConfig(AppConfigProvider, APP_CONFIG) { 
    console.log('AppConfigService');
    AppConfigProvider.config = APP_CONFIG
}

let components = [
    AppRunService,
    AppController,
    CardComponent,
    AppConfigProvider
];

function bootstrapComponents(ngModule, comps) {
    comps.forEach((component) => {
        component(ngModule);
    });
}

bootstrapComponents(AppModule, components);

export default AppModule;
