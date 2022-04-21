import { Selector } from 'testcafe';

class ChatInboxPage {
  constructor() {
    this.pageId = '#chatinbox-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async openMessagesPage(testController) {
    await testController.click('#goto-messages');
  }
}

export const chatInboxPage = new ChatInboxPage();
