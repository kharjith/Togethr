import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Header, Icon } from 'react-native-elements';

export default class AboutUsScreen extends Component {
  settingscreen = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{
            text: 'About the app',
            style: {
              margin: 2,
              padding: 2,
              fontWeight: 'bold',
              fontSize: 19,
              color: 'black',
            },
          }}
          leftComponent={
            <Icon
              name="arrow-left"
              type="feather"
              color="black"
              onPress={() => {
                this.settingscreen();
              }}>
              >
            </Icon>
          }
          backgroundColor={'#e6c36f'}
        />
        <ScrollView style={styles.content}>
          <Text style={styles.title}>Introduction</Text>
          <Text style={styles.description}>
            Welcome to our app! This is a platform designed to bring people
            together through exciting events, meaningful connections, and shared
            experiences. Our app is here to make it easier for you to discover,
            join, and organize a wide range of events, from social gatherings
            and workshops to community activities and much more.
          </Text>
          <Text style={styles.title}>Key Features</Text>
          <Text style={styles.description}>
            <Text style={styles.title2}>Discover Events :</Text> Browse through
            a diverse range of events happening in your area or of your
            interest.{'\n'}
            <Text style={styles.title2}>Easy Participation:</Text> Joining
            events is just a tap away{'\n'}
            <Text style={styles.title2}>Create Your Events:</Text> Have a great
            idea for an event? Create and organize events that match your
            passions.{'\n'}
            <Text style={styles.title2}>
              Connect with Like-minded Individuals:
            </Text>{' '}
            Our app is not just about events; it's about fostering connections.
            Meet people who share your interests and expand your social circle.
            {'\n'}
            <Text style={styles.title2}>Stay Updated:</Text> Get notifications
            about upcoming events, event updates, and relevant information,
            ensuring you never miss out on exciting opportunities.{'\n'}
          </Text>

          <Text style={styles.title}>Our Mission</Text>
          <Text style={styles.description}>
            Our mission is to create a space where people can come together,
            learn, grow, and create memories. We believe in the power of human
            connection and the enrichment With our app, we aim to simplify event
            discovery and make it possible for you to engage with your community
            in a meaningful way.
          </Text>

          <Text style={styles.title}>The Importance of Social Activities</Text>
          <Text style={styles.description}>
            Social events play a vital role in our lives, fostering connections,
            personal growth, and a sense of belonging. They provide unique
            opportunities to interact with others, learn new things, and create
            lasting memories.Organizing events sharpens leadership and planning
            skills, boosting self-assurance, and showcasing creativity and
            organization.
          </Text>

          <Text style={styles.title}>Kick Off Your Journey: </Text>
          <Text style={styles.description}>
            Embark on a journey of exploration, connection, and enjoyment by
            becoming a part of our vibrant community.You're not just discovering
            events; you're embracing a lifestyle of connection, enrichment, and
            celebration. Join our community today and let's make every day an
            opportunity to create memories and connect with those who matter.
          </Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ece1c1',
  },
  content: {
    flex:1,
    marginBottom:100,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title2: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
});
