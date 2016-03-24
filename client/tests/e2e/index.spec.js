let IndexPage = require('./index_page');
let Utils = require('./utils');


describe('E2E', ()=> {

    let page = new IndexPage();
    let utils = new Utils();

    describe('Index Page', ()=> {

        beforeEach(()=> {
            page.getIndexPage();
        });

        it('should have a header with .top-nav class applied', ()=> {
            expect(utils.hasClass(page.getTopNav(), 'top-nav')).toBeTruthy();
        });

    });
});
