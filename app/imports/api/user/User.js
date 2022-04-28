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
    const positionSchema = new SimpleSchema({
      lat: Number,
      lng: Number,
    });

    const tripSchema = new SimpleSchema({
      day: {
        type: Number,
        allowedValues: [0, 1, 2, 3, 4, 5, 6], //  0 is Sunday, 1 is Monday...
      },
      arrivalTime: Number, // minutes
      departureTime: Number,
      userType: {
        type: String,
        allowedValues: ['driver', 'rider', 'both'],
        defaultValue: 'both',
      },
    });

    this.schema = new SimpleSchema({
      firstName: String,
      lastName: String,
      homeLocation: String,
      position: positionSchema,
      trips: {
        type: Array,
        optional: true,
      },
      'trips.$': { type: tripSchema },
      userType: String,
      carMake: { type: String, optional: true },
      carModel: { type: String, optional: true },
      carColor: { type: String, optional: true },
      carPlate: { type: String, optional: true },
      owner: String,
      image: String,
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
