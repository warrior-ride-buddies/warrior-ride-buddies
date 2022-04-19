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

    const rideSchema = new SimpleSchema({
      time: Date,
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
      arrivals: {
        type: Array,
        optional: true,
      },
      'arrivals.$': { type: rideSchema },
      departures: {
        type: Array,
        optional: true,
      },
      'departures.$': { type: rideSchema },
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
