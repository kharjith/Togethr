import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Header, Icon } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import { Feather } from '@expo/vector-icons';

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      useremail: firebase.auth().currentUser.email,
      allevents: [],
    };
  }

  getevents = () => {
    db.collection('allevents').where("eventCompleted","==", false).onSnapshot((snapshot) => {
      var alle = [];
      snapshot.docs.map((doc) => {
        var event = doc.data();
        event['docId'] = doc.id;
        alle.push(event);
      });

      this.setState({ allevents: alle });
    });
  };

  componentDidMount() {
    this.getevents();
  }

  renderItem = ({ item }) => {
    return (
      
      <View>
        

        <TouchableOpacity
          style={{
            width: '95%',

            padding: 20,

            backgroundColor: '#E6F0E1',
            borderRadius: 10,
            margin: 10,
            marginTop: 15,
          }}
          onPress={() => {
            this.props.navigation.navigate('EventDetailsScreen', {
              event: item,
            });
          }}>
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

          <View
            style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
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
          </View>

          <View
            style={{ flexDirection: 'row', marginTop: 2, alignSelf: 'center' }}>
            <Text
              style={{ color: 'black', marginRight: 4, fontWeight: 'bold' }}>
              Learn more
            </Text>

            <Feather
              name="corner-right-up"
              size={15}
              color="black"
              style={{ alignSelf: 'flex-start' }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  keyExtractor = (item, index) => index.toString();
  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#dac1aa' }}>
        <Header
          centerComponent={{
            text: 'Explore Events',
            style: {
              margin: 2,
              padding: 2,
              fontWeight: 'bold',
              fontSize: 19,
              color: '#fff',
            },
          }}
          leftComponent={
            <Icon
              name="arrow-left"
              type="feather"
              color="#ffffff"
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              >
            </Icon>
          }
          backgroundColor={'#af9d89'}
        />

        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 17,
            textAlign: 'center',
            marginTop: 10,
          }}>
          Upcoming Events for you
        </Text>



        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.allevents}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  lineStyle: {
    width: '100%',
    borderBottomWidth: 1,
    margin: 10,
  },
});
