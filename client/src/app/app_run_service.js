export default (ngModule) =>
    ngModule.service('AppRunService', AppRunService);

/*@ngInject*/
class AppRunService {

    constructor() {

        console.log('AppRunService');
    }
}
