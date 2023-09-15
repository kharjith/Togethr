import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Header } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      useremail: firebase.auth().currentUser.email,
      allNotifications: [],
    };
  }
  getNotifications = () => {
    console.log('noti' + this.state.useremail);
    try {
      db.collection('allnotifications')
        .where('receiver', '==', this.state.useremail)
        .onSnapshot((snapshot) => {
          var alln = [];
          snapshot.docs.map((doc) => {
            var noti = doc.data();
            console.log(noti);
            noti['docId'] = doc.id;
            alln.push(noti);
          });

          this.setState({ allNotifications: alln });
        });
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    this.getNotifications();
  }
  renderItem = ({ item }) => {
    return (
      <View style={{backgroundColor:'fcebd5'}}> 
      <TouchableOpacity
        style={{
          width: '95%',
          justifyContent: 'space-between',
          flexDirection: 'row',
          padding: 20,
          borderWidth: 1,
          backgroundColor: '#d0ba98',
          borderRadius: 10,
          margin: 10,
        }}>
        <Feather
          name="arrow-right"
          size={25}
          color="white"
          style={{ alignSelf: 'center' , marginRight:5}}
        />
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          {item.message}
        </Text>
      </TouchableOpacity>
      </View>
    );
  };

  keyExtractor = (item, index) => index.toString();
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fcebd5' }}>
        <Header
          centerComponent={{
            text:"Welcome back.. :)",
            style: {
              margin: 2,
              padding: 2,
              fontWeight: 'bold',
              fontSize: 16,
              color: '#fff',
            },
          }}
          backgroundColor={'#af9d89'}
        />

        <View style={{ flex: 0.7, backgroundColor: '#fcebd5' }}>
          <Text style={styles.text2}> Notifications </Text>

          <FlatList
            data={this.state.allNotifications}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
        </View>
        <View
          style={{
            width: '100%',
            flex: 0.2,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#969D7C',
              borderRadius: 10,
            }}
            onPress={() => this.props.navigation.navigate('ExploreEvents')}>
            <Text style={styles.text3}> Explore Events </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              this.props.navigation.navigate('AddEventScreen');
            }}
            style={{
              backgroundColor: '#969D7C',
              borderRadius: 10,
            }}>
            <Text style={styles.fabText}>+ Create Event</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  text2: {
    marginTop: 10,
    fontSize: 18,
    alignSelf:'center'
  },
  text3: {
    fontSize: 18,
    margin: 10,
    alignSelf: 'center',
    color: 'white',
  },
  fabText: {
    fontSize: 18,
    margin: 10,
    alignSelf: 'center',
    color: 'white',
  },
});
