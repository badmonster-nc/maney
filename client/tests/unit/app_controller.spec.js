import sh from './spec_helper';

describe('App', ()=> {

    let scope, createController;

    beforeEach(inject(()=> {
        scope = sh.$rootScope.$new();
        createController = ()=> sh.$controller('AppController', {'$scope': scope});
    }));

    it('should be truthy', ()=> {
        let c = createController();
        expect(c.test()).toBeTruthy();
    });

});
