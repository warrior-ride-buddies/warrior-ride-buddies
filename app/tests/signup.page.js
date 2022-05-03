import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class SignupPage {
  constructor() {
    this.pageId = '#signup-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async signupUser(testController, username, password) {
    await testController.typeText('#signup-form-email', username);
    await testController.typeText('#signup-form-password', password);
    await testController.typeText('#signup-form-password2', password);
    await testController.click('#signup-form-submit');
    await navBar.isLoggedIn(testController, username);
  }

  /** Add new data for new user */
  async updateInfo(testController, firstName, lastName, userType, address, carMake, carModel, carColor, carPlate) {
    await testController.typeText('#create-profile-firstName', firstName);
    await testController.typeText('#create-profile-lastName', lastName);
    await testController.typeText('#create-profile-userType', userType);
    await testController.typeText('#create-profile-address', address);
    await testController.typeText('#create-profile-carMake', carMake);
    await testController.typeText('#create-profile-carModel', carModel);
    await testController.typeText('#create-profile-carColor', carColor);
    await testController.typeText('#create-profile-carPlate', carPlate);
    await testController.click('#create-profile-submit');
    await testController.pressKey('enter');
  }
}

export const signupPage = new SignupPage();
