import { MayneyPage } from './app.po';

describe('mayney App', () => {
  let page: MayneyPage;

  beforeEach(() => {
    page = new MayneyPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
