import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

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
  async editProfile(testController, firstName, lastName, homeLocation, positionLng, positionLat, carMake, carModel, carColor, carPlate) {
    await testController.click('#edit-profile');
    await testController.typeText('#edit-profile-firstName', firstName);
    await testController.typeText('#edit-profile-lastName', lastName);
    await testController.typeText('#edit-profile-homeLocation', homeLocation);
    await testController.typeText('#edit-profile-position.lng', positionLng);
    await testController.typeText('#edit-profile-position.lat', positionLat);
    await testController.typeText('#edit-profile-carMake', carMake);
    await testController.typeText('#edit-profile-carModel', carModel);
    await testController.typeText('#edit-profile-carColor', carColor);
    await testController.typeText('#edit-profile-carPlate', carPlate);
    await testController.click('#edit-profile-submit');
  }
}

export const editprofilePage = new EditprofilePage();
