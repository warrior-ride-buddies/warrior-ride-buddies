import { Selector } from 'testcafe';

class NavBar {

  /** If someone is logged in, then log them out, otherwise do nothing. */
  async ensureLogout(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-current-user');
      await testController.click('#navbar-sign-out');
    }
  }

  async openSignInDropdown(testController) {
    await this.ensureLogout(testController);
    await testController.click('#login-dropdown');
  }

  /** Check that the specified user is currently logged in. */
  async isLoggedIn(testController, username) {
    const loggedInUser = Selector('#navbar-current-user').innerText;
    await testController.expect(loggedInUser).eql(username);
  }

  /** Check that someone is logged in, then click items to logout. */
  async logout(testController) {
    await testController.expect(Selector('#navbar-current-user').exists).ok();
    await testController.click('#navbar-current-user');
    await testController.click('#navbar-sign-out');
  }

  /** Pull down login menu, go to sign up page. */
  async gotoSignupPage(testController) {
    await this.ensureLogout(testController);
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-up');
  }

  /** Open the Chat Inbox */
  async openChatInbox(testController) {
    await testController.click('#inbox');
  }

  /** Open the Admin Reports Page */
  async openListReports(testController) {
    await testController.click('#admin');
  }

  /** Open the Main Page */
  async openMainPage(testController) {
    await testController.click('#home');
  }

  /** Open the Main Page */
  async openUserProfilesPage(testController) {
    await testController.click('#profiles');
  }

  /** Check that someone is logged in, then click items to logout. */
  async openUserProfilePage(testController) {
    await testController.expect(Selector('#navbar-current-user').exists).ok();
    await testController.click('#navbar-current-user');
    await testController.click('#navbar-profile');
  }
}

export const navBar = new NavBar();
