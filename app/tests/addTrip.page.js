import { Selector } from 'testcafe';

class AddTripPage {
  constructor() {
    this.pageId = '#add-trip';
    this.pageSelector = Selector(this.pageId);
  }

  async tripInput(testController) {
    await testController.click('#add-trip');
    await testController
      .click('#trip-day')
      .pressKey('Down')
      .pressKey('Enter');
    await testController
      .pressKey('Tab')
      .typeText('#trip-arrival-time', '1000am')
      .pressKey('Tab');
    await testController
      .pressKey('Tab')
      .typeText('#trip-departure-time', '0100pm');
    await testController
      .click('#trip-user-type')
      .pressKey('Up')
      .pressKey('Enter');
    await testController
      .click('#trip-submit');
  }
}

export const addTripPage = new AddTripPage();
