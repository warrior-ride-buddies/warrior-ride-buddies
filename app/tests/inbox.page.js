import { Selector } from 'testcafe';

class InboxPage {
  constructor() {
    this.pageId = '#inbox-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const inboxPage = new InboxPage();
