import React from 'react';
import { Card, Image, Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Message from './Message';
import AddMessage from './AddMessage';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Profile extends React.Component {
  render() {
    const profile = this.props.profile;
    return (
      <Card centered>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src={profile.image}
          />
          <Card.Header>{profile.firstName} {profile.lastName}</Card.Header>
          <Card.Meta>{profile.address}</Card.Meta>
          <Card.Description>
            {profile.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Link to={`/edit/${this.props.profile._id}`}>Edit</Link>
        </Card.Content>
        <Card.Content extra>
          <Feed>
            {this.props.messages.map((message, index) => <Message key={index} message={message}/>)}
          </Feed>
        </Card.Content>
        <Card.Content extra>
          <AddMessage owner={this.props.profile.owner} profileId={this.props.profile._id}/>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Profile);
