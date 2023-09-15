import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import { Icon } from 'react-native-elements';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Feather } from '@expo/vector-icons';
import db from '../config';
import firebase from 'firebase';

export default class EventDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      email: firebase.auth().currentUser.email,
      eventTitle: this.props.route.params.event['title'],
      eventdescription: this.props.route.params.event['description'],
      eventDate: this.props.route.params.event['eventDate'],
      eventTime: this.props.route.params.event['eventTime'],
      eventLocation: this.props.route.params.event['location'],
      eventcreteria: this.props.route.params.event['creteria'],
      eventfee: this.props.route.params.event['fee'],
      eventcreate: this.props.route.params.event['creationDate'],
      eventhost: this.props.route.params.event['host'],
      eventparticipants: this.props.route.params.event['participants'],
      docId: this.props.route.params.event['docId'],
      eventCompleted: this.props.route.params.event['eventCompleted'],
    };
  }

  getUserDetails = () => {
    db.collection('users')
      .where('email', '==', this.state.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            firstName: doc.data().name,
            contact: doc.data().contact,
          });
        });
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  };

  componentDidMount() {
    this.getUserDetails();
  }

  updateInterest = async () => {
    db.collection('allevents')
      .doc(this.state.docId)
      .update({
        participants: [...this.state.eventparticipants, this.state.email],
      });

    db.collection('allnotifications').add({
      receiver: this.state.eventhost,
      sender: this.state.email,
      message:
        this.state.firstName +
        ' is going to participate in your event ' +
        this.state.eventTitle +
        ' happening on ' +
        this.state.eventDate,
    });
    alert('Interest updated successfully');
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{
            text: 'Event Details',
            style: {
              fontWeight: 'bold',
              fontSize: 19,
              color: '#fff',
            },
          }}
          leftComponent={
            <Icon
              name="arrow-left"
              type="feather"
              color="white"
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              >
            </Icon>
          }
          backgroundColor={'#AF9D89'}
        />

        <KeyboardAwareScrollView
          style={{
            flex: 1,
            marginBottom: 50,
            marginLeft: 20,
            marginRight: 20,
          }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 30 }}>
            {this.state.eventTitle}
          </Text>

          <View style={{ flexDirection: 'row' }}>
            <Feather
              name="map-pin"
              size={20}
              color="black"
              style={{ alignSelf: 'flex-start', marginTop: 20 }}
            />

            <Text style={{ fontSize: 15, marginTop: 20, marginLeft: 5 }}>
              {this.state.eventLocation}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 3 }}>
            <Feather
              name="calendar"
              size={20}
              color="black"
              style={{ alignSelf: 'flex-start', marginTop: 5 }}
            />

            <Text style={{ fontSize: 15, marginTop: 5, marginLeft: 5 }}>
              {this.state.eventDate}
            </Text>

            <Feather
              name="clock"
              size={20}
              color="black"
              style={{ alignSelf: 'flex-start', marginTop: 5, marginLeft: 45 }}
            />

            <Text style={{ fontSize: 15, marginTop: 5, marginLeft: 5 }}>
              {this.state.eventTime}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 3 }}></View>

          <Text style={{ marginTop: 40, fontSize: 17, fontWeight: 'bold' }}>
            About the Event :
          </Text>

          <Text style={{ fontSize: 15, marginTop: 5, marginLeft: 5 }}>
            {this.state.eventdescription}
          </Text>

          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginTop: 20, fontSize: 15, fontWeight: 'bold' }}>
              Criteria
            </Text>
            <Feather
              name="info"
              size={20}
              color="black"
              style={{ alignSelf: 'flex-start', marginTop: 20 }}
            />
          </View>

          <Text style={{ fontSize: 15, marginTop: 5, marginLeft: 5 }}>
            {this.state.eventcreteria}
          </Text>

          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginTop: 30, fontSize: 15, fontWeight: 'bold' }}>
              Entry Fee :
            </Text>
            <Text style={{ marginTop: 30, fontSize: 15 }}>
              {this.state.eventfee}
            </Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginTop: 10, fontSize: 15, fontWeight: 'bold' }}>
              Event Posted on :
            </Text>
            <Text style={{ marginTop: 10, fontSize: 15 }}>
              {this.state.eventcreate}
            </Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginTop: 10, fontSize: 15, fontWeight: 'bold' }}>
              Event Posted by :
            </Text>
            <Text style={{ marginTop: 10, fontSize: 15 }}>
              {this.state.firstName}
            </Text>
          </View>

          <View style={{ alignSelf: 'center' }}>
            {!this.state.eventCompleted ? (
              <Text style={{ marginTop: 30, fontSize: 15 }}>
                {this.state.eventparticipants.length} participants have shown
                interest
              </Text>
            ) : (
              <Text style={{ marginTop: 30, fontSize: 15 }}>
                {this.state.eventparticipants.length} persons participated
              </Text>
            )}
            {this.state.eventparticipants.includes(this.state.email)  ? null : (
              <View style={{ alignSelf: 'center' }}>
                <Text style={{ marginTop: 5, fontSize: 15 }}>
                  Are you Interested?
                </Text>

                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    width: '70%',
                    padding: 10,
                    marginLeft: 20,
                    marginBottom: 30,
                    alignItems: 'center',
                    backgroundColor: '#988d49',
                    borderRadius: 15,
                  }}
                  onPress={() => {
                    this.updateInterest();
                  }}>
                  <Text style={{color:"white"}}> Yes, Im In </Text>
                </TouchableOpacity>
              </View>
            )}
            {this.state.eventhost == this.state.email &&
            !this.state.eventCompleted ? (
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  width: '70%',
                  padding: 10,
                  marginLeft: 20,

                  alignItems: 'center',
                  backgroundColor: '#988d49',
                  borderRadius: 15,
                }}
                onPress={() => {
                  db.collection('allevents')
                    .doc(this.state.docId)
                    .update({ eventCompleted: true });
                }}>
                <Text style={{color:"white"}}> Mark as completed </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
