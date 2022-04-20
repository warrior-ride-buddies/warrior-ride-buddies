import React from 'react';
import { Grid, Header, Segment, Container } from 'semantic-ui-react';
import Footer from '../components/Footer';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const gridStyle = { paddingBottom: '5em', paddingTop: '5em', paddingLeft: '5em', paddingRight: '5em' };
    return (
      <Grid id='landing-page' verticalAlign='middle' textAlign='center'>
        <div id='landing-page-image1'>
          <Header as='h1' centered="true" style={{ padding: '200px', color: 'white', fontSize: '65px' }}>To connect UH Manoa students with similar commutes, enabling them to organize car-pools</Header>
        </div>
        <div className='accent-block'>
          <Header as='h2' inverted>Start off by creating your profile including your name, profile photo, UH email address, and neighborhood.</Header>
        </div>

        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3717.356025878127!2d-157.819300485067!3d21.296943983944583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13
                .1!3m3!1m2!1s0x7c006d989580d855%3A0xac63f2de838ed2f4!2sUniversity%20of%20Hawai%CA%BBi%20at%20M%C4%81no
                !5e0!3m2!1sen!2sus!4v1649541864645!5m2!1sen!2sus'
          style={{ overflow: 'hidden', opacity: '0.5', width: '100%', height: '300px', border: '0', allowFullScreen: '', loading: 'lazy', referrerPolicy: 'no-referrer-when-downgrade' }}/>
        <Segment style={{ padding: '0em' }} vertical>
          <Grid celled='internally' columns='equal' stackable>
            <Grid.Row textAlign='center'>
              <Grid.Column style={ gridStyle }>
                <Header as='h3' style={{ fontSize: '2em' }}>
                  Driving to school can be expensive
                </Header>
                <p style={{ fontSize: '1.33em' }}>Gasoline prices have soared in recent months and student parking passes are costly if you do not go to campus every day.</p>
              </Grid.Column>
              <Grid.Column style={ gridStyle }>
                <Header as='h3' style={{ fontSize: '2em' }}>
                  Carpooling is better for the environment
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  Carpooling can help with reducing pollution and Honolulu traffic by decreasing the number of drivers on the road.
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Grid.Row style={{ background: '#d4c8bc' }}>
          <Segment style={{ padding: '8em 0em' }} vertical>
            <Container text>
              <Header as='h3' style={{ fontSize: '2em' }}>
                How does it work for drivers?
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                {/* eslint-disable-next-line max-len */} {/* Breaking this paragraph up will look weird */}
                Input information about yourself and your car, you will also indicate at what times you will arrive on campus and where you will be coming from. Then you can either actively look for people to take to the UH Manoa campus or wait for someone to message you through the application to ask for a ride.
              </p>

              <Header as='h3' style={{ fontSize: '2em' }}>
                How does it work for carpoolers (aka riders)?
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                {/* eslint-disable-next-line max-len */} {/* Breaking this paragraph up will look weird */}
                First, input information about yourself, you will also indicate at what times you would like to arrive on campus and where you will be coming from. Then through the application, you will be able to filter and find drivers who are in your area and who will arrive at school at a suitable time. Once you find a suitable driver, message them through the app.
              </p>
            </Container>
          </Segment>
        </Grid.Row>
        <Footer/>
      </Grid>
    );
  }
}

export default Landing;
