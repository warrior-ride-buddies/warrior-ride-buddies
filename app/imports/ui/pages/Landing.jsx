import React from 'react';
import { Grid, Header, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Grid id='landing-page' verticalAlign='middle' textAlign='center'>
        <Image src='/images/annie-spratt-QckxruozjRg-unsplash.jpg'/>
        <Header as='h1'>To connect UH Manoa students with similar commutes, enabling them to organize car-pools</Header>
        <Grid.Row>

        </Grid.Row>
        <Grid.Row style={{ height: '300px' }}>
          <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3717.356025878127!2d-157.819300485067!3d21.296943983944583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c006d989580d855%3A0xac63f2de838ed2f4!2sUniversity%20of%20Hawai%CA%BBi%20at%20M%C4%81noa!5e0!3m2!1sen!2sus!4v1649541864645!5m2!1sen!2sus'
              style={{ overflow: 'hidden', opacity: '0.3', width: '100%', height: '100%', border: '0', allowFullScreen: '', loading: 'lazy', referrerPolicy: 'no-referrer-when-downgrade' }}/>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Landing;
