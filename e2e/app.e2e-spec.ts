import { Missoni1Page } from './app.po';

describe('missoni1 App', () => {
  let page: Missoni1Page;

  beforeEach(() => {
    page = new Missoni1Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
