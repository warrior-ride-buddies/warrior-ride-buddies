import { Meteor } from 'meteor/meteor';
import { Users } from '../../api/user/User';
import { Contacts } from '../../api/contact/Contacts';
import { Conversations } from '../../api/conversation/Conversations';

/* eslint-disable no-console */

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

/* eslint-disable no-console */
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

function addConversations(data) {
  console.log(`  Adding conversation between: ${data.users[0].username}, ${data.users[1].username}`);
  Conversations.collection.insert(data);
}

// Initialize the ConversationsCollection if empty.
if (Conversations.collection.find().count() === 0) {
  if (Meteor.settings.defaultConversations) {
    console.log('Creating user data.');
    Meteor.settings.defaultConversations.map(data => addConversations(data));
  }
}
