function IndexPage() {

    this.getIndexPage = ()=> {
        browser.get('/');
    };

    this.getTopNav = ()=> {
        return element.all(by.css('.top-nav')).get(0);
    };
}

module.exports = IndexPage;
