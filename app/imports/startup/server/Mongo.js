import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/Profiles';
import { Users } from '../../api/user/User';

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

// Initialize the database with a default user data document.
function addUsers(data) {
  console.log(`  Adding: ${data.firstName}`);
  Users.collection.insert(data);
}

// Initialize the UsersCollection if empty.
if (Users.collection.find().count() === 0) {
  if (Meteor.settings.defaultUsers) {
    console.log('Creating user data.');
    Meteor.settings.defaultUsers.map(data => addUsers(data));
  }
}
