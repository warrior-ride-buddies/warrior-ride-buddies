import React from 'react';
import { Feed, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Message extends React.Component {
  render() {
    const message = this.props.message;
    return (
      <Feed.Event >
        <Feed.Content>
          <Feed.Summary>
            {message.from}
            <Feed.Date content={message.createdAt.toLocaleDateString('en-US')} />
          </Feed.Summary>
          <Feed.Extra autoComplete="off">
            {message.message}
          </Feed.Extra>
        </Feed.Content>
      </Feed.Event>
    );
  }
}

// Require a document to be passed to this component.
Message.propTypes = {
  message: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Message);
