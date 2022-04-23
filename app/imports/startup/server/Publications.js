import { Meteor } from 'meteor/meteor';
import { Conversations } from '../../api/conversation/Conversations';
import { Users } from '../../api/user/User';

// User-level publication.

Meteor.publish(Users.userPublicationName, function () {
  if (this.userId) {
    return Users.collection.find();
  }
  return this.ready();
});

Meteor.publish(Users.adminPublicationName, function () {
  if (this.userId) {
    return Users.collection.find();
  }
  return this.ready();
});

Meteor.publish(Conversations.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Conversations.collection.find({ usernames: username });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.

// Planning:roles publication
// Recommended code to publish roles for each user.

Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
