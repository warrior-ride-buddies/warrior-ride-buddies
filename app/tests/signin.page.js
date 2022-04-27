import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class SigninPage {
  constructor() {
    this.pageId = '#signin-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Open login page form through login button */
  async openLoginPage(testController) {
    await testController.click('#login-page-button');
  }

  /** Fills out and submits the form to signin, then checks to see that login was successful. */
  async signinDropdown(testController, username, password) {
    await testController.typeText('#signin-form-email', username);
    await testController.typeText('#signin-form-password', password);
    await testController.click('#signin-form-submit');
    await navBar.isLoggedIn(testController, username);
  }

  async signinPage(testController, username, password) {
    await testController.typeText('#signin-page-form-email', username);
    await testController.typeText('#signin-page-form-password', password);
    await testController.click('#signin-page-form-submit');
    await navBar.isLoggedIn(testController, username);
  }
}

export const signinPage = new SigninPage();
