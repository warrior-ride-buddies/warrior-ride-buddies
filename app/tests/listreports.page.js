import { Selector } from 'testcafe';

class ListReportsPage {
  constructor() {
    this.pageId = '#listreports-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const listReportsPage = new ListReportsPage();
