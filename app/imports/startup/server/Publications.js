import { Meteor } from 'meteor/meteor';
import { Text } from '../../api/text/Text';
import { Contacts } from '../../api/contact/Contacts';
import { Conversations } from '../../api/conversation/Conversations';
import { Users } from '../../api/user/User';
import { Reports } from '../../api/report/Reports';

// User-level publication.

// eslint-disable-next-line consistent-return
Meteor.publish(Contacts.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    // console.log(username);
    const myChat1 = Contacts.collection.find({ $or: [{ userEmail1: username }, { userEmail2: username }] });
    return myChat1;
  }
});

Meteor.publish(Users.userPublicationName, function () {
  if (this.userId) {
    return Users.collection.find();
  }
  return this.ready();
});

// eslint-disable-next-line consistent-return
Meteor.publish(Text.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    const together = Text.collection.find({ $or: [{ receiver: username }, { sender: username }] });
    return together;
  }
});

Meteor.publish(Users.adminPublicationName, function () {
  if (this.userId) {
    return Users.collection.find();
  }
  return this.ready();
});

Meteor.publish(Contacts.adminPublicationName, function () {
  return Contacts.collection.find();
});

Meteor.publish(Reports.adminPublicationName, function () {
  return Reports.collection.find();
});

Meteor.publish(Conversations.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Conversations.collection.find({ 'users.username': username });
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
