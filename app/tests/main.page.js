import { Selector } from 'testcafe';

class MainPage {
  constructor() {
    this.pageId = '#main-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const mainPage = new MainPage();
