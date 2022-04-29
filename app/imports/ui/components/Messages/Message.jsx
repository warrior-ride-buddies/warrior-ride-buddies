import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Feed, Container, Segment, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Message extends React.Component {
  render() {
    const message = this.props.message;
    const from = this.props.users.filter(user => (user.owner === message.from));
    const ownMessage = message.from === Meteor.user().username;
    const position = ownMessage ? 'right' : 'left';
    const color = ownMessage ? 'teal' : 'grey';
    const nameDisplayed = ownMessage ? 'Me' : `${from[0].firstName} ${from[0].lastName}`
    return (
      <Feed.Event>
        <Feed.Content>
          <Segment basic floated={position}>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column textAlign='left'>
                  {nameDisplayed}
                </Grid.Column>
                <Grid.Column textAlign='right'>
                  <Feed.Summary>
                    <Feed.Date content={message.createdAt.toLocaleDateString('en-US')} />
                  </Feed.Summary>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Segment inverted color={color}>
              <Feed.Extra autoComplete="off">
                {message.message}
              </Feed.Extra>
            </Segment>
          </Segment>
        </Feed.Content>
      </Feed.Event>
    );
  }
}

// Require a document to be passed to this component.
Message.propTypes = {
  message: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default Message;
