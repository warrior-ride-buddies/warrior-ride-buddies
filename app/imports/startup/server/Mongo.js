import { Meteor } from 'meteor/meteor';
import { Users } from '../../api/user/User';
import { Conversations } from '../../api/conversation/Conversations';

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

// Initialize the database with a default user data document.
function addConversations(data) {
  console.log(`  Adding conversation between: ${data.usernames[0]}, ${data.usernames[1]}`);
  Conversations.collection.insert(data);
}

// Initialize the UsersCollection if empty.
if (Conversations.collection.find().count() === 0) {
  if (Meteor.settings.defaultConversations) {
    console.log('Creating user data.');
    Meteor.settings.defaultConversations.map(data => addConversations(data));
  }
}