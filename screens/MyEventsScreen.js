import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Header} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

export default class MyEventsScreen extends Component {
  constructor() {
    super();
    this.state = {
      useremail: firebase.auth().currentUser.email,
      allevents: [],
      completedEvents: [],
      completedEventsSelection: false,
    };
  }

  getevents = () => {
    db.collection('allevents')
      .where('participants', 'array-contains', this.state.useremail)
      .onSnapshot((snapshot) => {
        var alle = [];
        var allCe = [];
        snapshot.docs.map((doc) => {
          var event = doc.data();
          event['docId'] = doc.id;
          event.eventCompleted ? allCe.push(event) : alle.push(event);
        });

        this.setState({ allevents: alle, completedEvents: allCe });
      });
  };

  componentDidMount() {
    this.getevents();
  }
  handleCancelEvent(item) {
    item.participants.map((participant) => {
      db.collection('allnotifications').add({
        receiver: participant,
        sender: this.state.useremail,
        message:
          item.title +
          ' happening on'  +
          item.eventDate +
          ' has been cancelled    due to some reasons. Apologies for inconvinence..',
        eventId: item.docId,
      });
    });

    db.collection('allevents').doc(item.docId).delete();
    alert('Event Cancelled Succesfully');
  }
  renderItem = ({ item }) => {
    console.log(item.eventDate);
    return (
      <TouchableOpacity
        style={{
          width: '95%',

          padding: 20,

          backgroundColor: '#d0ba98',
          borderRadius: 10,
          margin: 10,
          marginTop: 15,
        }}
        onPress={() => {
          this.props.navigation.navigate('EventDetailsScreen', { event: item });
        }}>
        {this.state.useremail == item.host ? (
          <Text style={{ color: 'black', textAlign: 'center' }}>
            An Event Created by you
          </Text>
        ) : (
          <Text style={{ color: 'black', textAlign: 'center' }}>
            An Event Created by {item.hostname}
          </Text>
        )}

        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: 4,
          }}>
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 17 }}>
            {item.title}.
          </Text>
        </View>

        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text
            style={{ color: 'black' }}
            ellipsizeMode="tail"
            numberOfLines={2}>
            {item.description}....
          </Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 3 }}>
          <Feather
            name="map-pin"
            size={15}
            color="black"
            style={{ alignSelf: 'flex-start', marginTop: 3 }}
          />

          <Text style={{ color: 'black', marginLeft: 4, marginTop: 3 }}>
            {item.location}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 3 }}>
          <Feather
            name="calendar"
            size={15}
            color="black"
            style={{ alignSelf: 'flex-start', marginTop: 3 }}
          />

          <Text style={{ color: 'black', marginLeft: 4, marginTop: 3 }}>
            {item.eventDate}
          </Text>
        </View>

        <View style={styles.lineStyle}></View>

        <View
          style={{
            flexDirection: 'row',
            padding: 5,
            margin: 5,
            width: '100%',
            justifyContent: 'space-between',
            marginTop: 3,
          }}>
          <Text style={{ color: 'black' }}>
            {item.participants.length} Participant is interested
          </Text>
          {this.state.useremail == item.host && !item.eventCompleted ? (
            <TouchableOpacity
              onPress={() => {
                this.handleCancelEvent(item);
              }}
              style={{
                padding: 5,
                margin: 5,
                marginRight: 10,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                backgroundColor: '#969a7d',
                borderRadius: 5,
                marginTop: 3,
              }}>
              <Feather name="trash-2" size={15} color="white" />
              <Text
                style={{
                  marginRight: 5,
                  fontSize: 14,
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                Delete
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  keyExtractor = (item, index) => index.toString();
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#e6f0e1' }}>
        <Header
          centerComponent={{
            text: 'My Events',
            style: {
              margin: 2,
              padding: 2,
              fontWeight: 'bold',
              fontSize: 19,
              color: '#fff',
            },
          }}
          backgroundColor={'#af9d89'}
        />

        <View style={styles.rectangle}>
          <TouchableOpacity
            style={
              this.state.completedEventsSelection
                ? styles.button
                : styles.selectedButton
            }
            onPress={() => {
              this.setState({ completedEventsSelection: false });
            }}>
            <Text
              style={
                this.state.completedEventsSelection
                  ? {
                      color: 'black',
                      fontSize: 14,
                    }
                  : { color: 'white', fontSize: 14 }
              }>
              Upcoming
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              this.state.completedEventsSelection
                ? styles.selectedButton
                : styles.button
            }
            onPress={() => {
              this.setState({ completedEventsSelection: true });
            }}>
            <Text
              style={
                this.state.completedEventsSelection
                  ? {
                      color: 'white',
                      fontSize: 14,
                    }
                  : { color: 'black', fontSize: 14 }
              }>
              Completed
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          {this.state.completedEventsSelection ? (
            <FlatList
              data={this.state.completedEvents}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
            />
          ) : (
            <FlatList
              data={this.state.allevents}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
            />
          )}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              this.props.navigation.navigate('AddEventScreen');
            }}
            style={styles.touchableOpacityStyle}>
            <Text style={styles.fabText}>+</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  rectangle: {
    alignSelf: 'center',
    backgroundColor: '#e6f0e1',
    marginTop: 20,
    width: '80%',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lineStyle: {
    width: '100%',
    borderBottomWidth: 1,
    margin: 10,
  },
  selectedButton: {
    backgroundColor: '#969D7C',
    width: '45%',
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fff',
    width: '45%',
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableOpacityStyle: {
    alignSelf: 'center',
    marginBottom: 90,
    width: '30%',
    height: '10%',

    backgroundColor: '#969d7c',
    borderRadius: 25,
  },
  fabText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 40,
  },
});
