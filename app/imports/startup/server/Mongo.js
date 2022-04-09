import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/Profiles';

/* eslint-disable no-console */

// Initialize the database with a default data document.

function addProfile(data) {
  console.log(`  Adding: ${data.lastName} (${data.owner})`);
  Profiles.collection.insert(data);
}

if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default Profiles.');
    Meteor.settings.defaultProfiles.map(data => addProfile(data));
  }
}
