import { Selector } from 'testcafe';

class EditprofilePage {
  constructor() {
    this.pageId = '#edit-profile';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Fills out profile edit boxes and saves changes */
  async editProfile(testController, firstName, lastName, address, carMake, carModel, carColor, carPlate) {
    await testController.click('#navbar-current-user');
    await testController.click('#edit-profile');
    await testController
      .click('#edit-profile-firstName')
      .pressKey('ctrl+a delete')
      .typeText('#edit-profile-firstName', firstName);
    await testController
      .click('#edit-profile-lastName')
      .pressKey('ctrl+a delete')
      .typeText('#edit-profile-lastName', lastName);
    await testController
      .click('#edit-profile-address')
      .pressKey('ctrl+a delete')
      .typeText('#edit-profile-address', address);
    await testController
      .click('#edit-profile-carMake')
      .pressKey('ctrl+a delete')
      .typeText('#edit-profile-carMake', carMake);
    await testController
      .click('#edit-profile-carModel')
      .pressKey('ctrl+a delete')
      .typeText('#edit-profile-carModel', carModel);
    await testController
      .click('#edit-profile-carColor')
      .pressKey('ctrl+a delete')
      .typeText('#edit-profile-carColor', carColor);
    await testController
      .click('#edit-profile-carPlate')
      .pressKey('ctrl+a delete')
      .typeText('#edit-profile-carPlate', carPlate);
    await testController.click('#edit-profile-submit');
    await testController.pressKey('esc');
  }
}

export const editprofilePage = new EditprofilePage();
