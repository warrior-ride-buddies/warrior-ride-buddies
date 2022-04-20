import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Messages } from '../../api/message/Messages';
import { Users } from '../../api/user/User';
import { Conversations } from '../../api/conversation/Conversations';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.

Meteor.publish(Messages.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Messages.collection.find({ usernames: username });
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

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.

Meteor.publish(Conversations.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Conversations.collection.find();
  }
  return this.ready();
});

Meteor.publish(Messages.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Messages.collection.find();
  }
  return this.ready();
});

Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
