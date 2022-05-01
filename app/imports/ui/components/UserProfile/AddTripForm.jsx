import React from 'react';
import { AutoForm, ErrorsField, SubmitField, SelectField } from 'uniforms-semantic';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Users } from '../../../api/user/User';
import Parse from '../../../api/parse/parse';

const tripSchema = new SimpleSchema({
  day: {
    type: String,
    allowedValues: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], //  0 is Sunday, 1 is Monday...
  },

  userType: {
    type: String,
    allowedValues: ['driver', 'rider', 'both'],
    defaultValue: 'both',
  },
});
const bridge = new SimpleSchema2Bridge(tripSchema);

// const dotwAllowed = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dotwAllowed = [0, 1, 2, 3, 4, 5, 6];

/** Renders the Page for adding a document. */
class AddMessage extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    // eslint-disable-next-line no-undef
    let arrivalTime = document.getElementsByName('arrivalTime')[0].value;
    // eslint-disable-next-line no-undef
    let departureTime = document.getElementsByName('departureTime')[0].value;
    arrivalTime = Parse.timeToNum(arrivalTime);
    departureTime = Parse.timeToNum(departureTime);
    if (Number.isNaN(departureTime) && Number.isNaN(arrivalTime)) {
      // Both are NaN which is not allowed
      swal('Error', 'You need to input either an arrival time or departure time', 'error');
    } else {
      if (Number.isNaN(departureTime)) {
        departureTime = '';
      }
      if (Number.isNaN(arrivalTime)) {
        arrivalTime = '';
      }
      let day = data.day;
      const userType = data.userType;
      day = Parse.stringToNumDay(day);
      const trips = this.props.user.trips;
      trips.push({ day, arrivalTime, departureTime, userType });
      Users.collection.update({ _id: this.props.user._id }, { $set: { trips: trips } },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            formRef.reset();
          }
        });
    }
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
        <SelectField allowedValues={dotwAllowed.filter(x => !(this.props.user.trips.map((trip) => trip.day)).includes(x)).map((num) => Parse.dayToString(num))} name='day' autoComplete="off"/>
        <label>Arriving to UH at:</label>
        <input type='time' name='arrivalTime' autoComplete="off"/>
        <label>Leaving UH at:</label>
        <input type='time' name='departureTime' autoComplete="off"/>
        <SelectField name='userType' autoComplete="off"/>
        <SubmitField value='Create trip'/>
        <ErrorsField/>
      </AutoForm>
    );
  }
}

AddMessage.propTypes = {
  user: PropTypes.object,
};

export default AddMessage;
