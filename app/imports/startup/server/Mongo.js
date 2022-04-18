import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Users } from '../../api/user/User';
import { Contacts } from '../../api/contact/Contacts';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

function addContacts(data) {
  console.log(`  Adding: ${data.userId1} contact to ${data.userId2}`);
  Contacts.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Contacts.collection.find().count() === 0) {
  if (Meteor.settings.defaultContacts) {
    console.log('Creating contacts.');
    Meteor.settings.defaultContacts.map(data => addContacts(data));
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
