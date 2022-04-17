import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The UsersCollection. It encapsulates state and variable values for stuff.
 */
class UsersCollection {
  constructor() {
    // The name of this collection.
    this.name = 'UsersCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    const LocationSchema = new SimpleSchema({
      lat: Number,
      lng: Number,
    });
    this.schema = new SimpleSchema({
      firstName: String,
      lastName: String,
      userType: {
        type: String,
        allowedValues: ['Driver', 'Rider', 'Both'],
        defaultValue: 'Rider',
      },
      homeLocation: String,
      lat: Number,
      lng: Number,
      carMake: String,
      carModel: String,
      carColor: String,
      carPlate: String,
      owner: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {UsersCollection}
 */
export const Users = new UsersCollection();
