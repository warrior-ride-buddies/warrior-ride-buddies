import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { inboxPage } from './inbox.page';
import { listReportsPage } from './listreports.page';
import { mainPage } from './main.page';
import { userProfilesPage } from './userprofiles.page';
import { userProfilePage } from './userprofile.page';
import { signupPage } from './signup.page';
import { editprofilePage } from './editprofile.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const adminCredentials = { username: 'admin@foo.com', password: 'changeme' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout works', async (testController) => {
  await navBar.openSignInDropdown(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await mainPage.isDisplayed(testController);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that signup works', async (testController) => {
  const newMockUser = `user-${new Date().getTime()}@foo.com`;
  await navBar.gotoSignupPage(testController);
  await signupPage.signupUser(testController, newMockUser, credentials.password);
  await navBar.isLoggedIn(testController, newMockUser);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that chat inbox page and messages page shows up', async (testController) => {
  await navBar.openSignInDropdown(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.openInbox(testController);
  await inboxPage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that admin reports page shows up', async (testController) => {
  await navBar.openSignInDropdown(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await navBar.openListReports(testController);
  await listReportsPage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that main page shows up', async (testController) => {
  await navBar.openSignInDropdown(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.openMainPage(testController);
  await mainPage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that user profiles page shows up', async (testController) => {
  await navBar.openSignInDropdown(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.openUserProfilesPage(testController);
  await userProfilesPage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that user profile page works', async (testController) => {
  await navBar.openSignInDropdown(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await mainPage.isDisplayed(testController);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.openUserProfilePage(testController);
  await userProfilePage.isDisplayed(testController);
});

test.only('Test that edit profile works', async (testController) => {
  await navBar.openSignInDropdown(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await mainPage.isDisplayed(testController);
  await editprofilePage.editProfile(testController, 'testFirstName', 'testLastName', 'Honolulu 96817', 'Honda', 'Civic', 'Blue', 's3xy');
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});
