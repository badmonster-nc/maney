import angular from 'angular';//eslint-disable-line
import mocks from 'angular-mocks';//eslint-disable-line
import ngModule from '../../src/app/app_module';

let specHelper = {};

beforeEach(function () {
    module(function ($provide) {
        $provide.constant('APP_CONFIG', { someUrl: '/dummyValue' });
    });
});


beforeEach(module(ngModule.name));

beforeEach(inject(function (_$rootScope_, _$compile_, _$injector_, _$timeout_, _$controller_, _$httpBackend_) {
    specHelper.$rootScope = _$rootScope_;
    specHelper.$compile = _$compile_;
    specHelper.$injector = _$injector_;
    specHelper.$timeout = _$timeout_;
    specHelper.$controller = _$controller_;
    specHelper.$httpBackend = _$httpBackend_;
}));

export default specHelper;

