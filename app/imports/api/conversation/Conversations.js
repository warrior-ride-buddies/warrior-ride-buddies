import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

class ConversationsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ConversationsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    const messageSchema = new SimpleSchema({
      message: String,
      from: String,
      createdAt: Date,
    });
    const userSchema = new SimpleSchema({
      username: String,
      firstName: String,
      lastName: String,
      image: String,
    });
    this.schema = new SimpleSchema({
      users: {
        type: Array,
      },
      'users.$': { type: userSchema },
      messages: {
        type: Array,
        optional: true,
      },
      'messages.$': { type: messageSchema },
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the ConversationsCollection.
 * @type {ConversationsCollection}
 */
export const Conversations = new ConversationsCollection();
