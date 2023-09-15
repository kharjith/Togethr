import React, { Component, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Icon} from "react-native-elements"
import DateTimePicker from '@react-native-community/datetimepicker';
import firebase from 'firebase';
import {
  FontAwesome,
} from '@expo/vector-icons';
import { Header } from 'react-native-elements';
import db from '../config';

export default class AddEventScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailid: firebase.auth().currentUser.email,

      title: '',
      description: '',
      date: new Date(),
      location: '',
      require: '',
      contact: '',
      fee: 0,
      freeEntryType: true,
      timestamp: '',
      hostname: '',
      show: false,
      time: '11:00',
      mode: 'date',
      picked: false,
    };
  }

  getUserDetails = () => {
    db.collection('users')
      .where('email', '==', this.state.emailid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            hostname: doc.data().name,
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

  addnewEvent = () => {
   
    if (
      this.state.title.length !== 0 &&
      this.state.description.length !== 0 &&
      this.state.location.length !== 0 &&
      this.state.require.length !== 0 &&
      this.state.date.length !== 0 &&
      this.state.time.length !== 0
    ) {
      db.collection('allevents').add({
        title: this.state.title,
        description: this.state.description,
        eventDate: this.state.date.toDateString(),
        eventTime: this.state.time,
        location: this.state.location,
        creteria: this.state.require,
        contact: this.state.contact,
        hostname: this.state.hostname,
        fee: this.state.fee,
        entryType: this.state.freeEntryType ? 'Free' : 'Chargeable',
        host: this.state.emailid,
        creationDate: new Date().toDateString(),
        eventCompleted: false,
        participants: [this.state.emailid],
      });

      alert('Event successfully created');
      Alert.alert('Event successfully created');
      this.props.navigation.goBack();
    } else {
      alert('Enter all details properly');
    }
  };

  render() {
    return (
      <View style={styles.container }>
        
          <Header
            centerComponent={{
              text: 'Add Events',
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
                color="#ffffff"
                onPress={() => this.props.navigation.goBack()}></Icon>
            }
            backgroundColor={'#AF9D89'}
          />
          {this.state.show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={this.state.date}
              mode={this.state.mode}
              is24Hour={true}
              display="default"
              onChange={(event, date) => {
                if (this.state.mode === 'date') {
                  var pickedDate = new Date(date);
                  var finalDate =
                    pickedDate.getDate() +
                    '/' +
                    pickedDate.getMonth() +
                    '/' +
                    pickedDate.getFullYear();

                  console.log(finalDate);
                  this.setState({ mode: 'time', date: pickedDate });
                } else {
                  var pickedTime = new Date(date);
                  var finalTime =
                    pickedTime.getHours() + ':' + pickedTime.getMinutes();
                  console.log(finalTime);

                  this.setState({ time: finalTime });

                  this.setState({ show: false });
                }
              }}
            />
          )}
          <KeyboardAwareScrollView style={{ flex: 1, marginBottom: 50, backgroundColor:'#e6f0e1' }}>
            <View style={styles.inputContainer}>
              <Text style={{ padding: 10, marginBottom: 5 }}>Event Title</Text>
              <TextInput
                style={styles.input}
                onChangeText={(val) => {
                  this.setState({ title: val });
                }}
                placeholderTextColor="#b0b0b0"
                multiline={true}
                placeholder="Eg: Plant trees or Visit Orphange..."
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={{ padding: 10, marginBottom: 5 }}>
                Event Description
              </Text>
              <TextInput
                style={[styles.input, { height: 100 }]}
                onChangeText={(val) => {
                  this.setState({ description: val });
                }}
                placeholder={'Details of the event...'}
                multiline={true}
                numberOfLines={2}
                placeholderTextColor="Black"></TextInput>
            </View>

            <View style={styles.inputContainer}>
              <Text style={{ padding: 10, marginBottom: 5 }}>
                Event Date and Time
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <FontAwesome
                  name={'calendar'}
                  size={20}
                  color={'af9d89'}
                  style={{ width: 20, height: 20, marginRight: 10 }}
                  onPress={() => {
                    this.setState({ show: true });
                  }}
                />
                <Text style={styles.input}>
                  {this.state.date.toDateString()}
                  <Text> at {this.state.time}</Text>
                </Text>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={{ padding: 10, marginBottom: 5 }}>
                Event Location
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={(val) => {
                  this.setState({ location: val });
                }}
                placeholder={'Event Occurring Place'}
                multiline={true}
                placeholderTextColor="Black"></TextInput>
            </View>

            <View style={styles.inputContainer}>
              <Text style={{ padding: 10, marginBottom: 5 }}>
                Participation Requirements
              </Text>
              <TextInput
                style={[styles.input, { height: 100 }]}
                onChangeText={(val) => {
                  this.setState({ require: val });
                }}
                placeholder={'Eg: Age, Restrictions etc...'}
                multiline={true}
                placeholderTextColor="Black"></TextInput>
            </View>

            <View style={styles.inputContainer}>
              <Text style={{ padding: 10, marginBottom: 5 }}>
                Entry fee (if there is any)
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={
                    this.state.freeEntryType
                      ? {
                          borderRadius: 20,
                          backgroundColor: '#969D7C',
                          width: '30%',
                          padding: 10,
                          margin: 10,
                        }
                      : {
                          borderRadius: 20,
                          backgroundColor: 'white',
                          width: '30%',
                          padding: 10,
                          margin: 10,
                        }
                  }
                  onPress={() => {
                    this.setState({ freeEntryType: true });
                  }}>
                  <Text
                    style={
                      this.state.freeEntryType === true
                        ? {
                            textAlign: 'center',
                            color: 'white',
                          }
                        : {
                            textAlign: 'center',
                            color: '#969D7C',
                          }
                    }>
                    Free
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    this.state.freeEntryType
                      ? {
                          borderRadius: 20,
                          backgroundColor: '#fff',
                          width: '40%',
                          padding: 10,
                          margin: 10,
                        }
                      : {
                          borderRadius: 20,
                          backgroundColor: '#969D7C',
                          width: '40%',
                          padding: 10,
                          margin: 10,
                        }
                  }
                  onPress={() => {
                    this.setState({ freeEntryType: false });
                  }}>
                  <Text
                    style={
                      this.state.freeEntryType
                        ? {
                            color: '#969D7C',

                            textAlign: 'center',
                          }
                        : {
                            color: '#fff',
                            textAlign: 'center',
                          }
                    }>
                    Chargeable
                  </Text>
                </TouchableOpacity>
              </View>
              {!this.state.freeEntryType ? (
                <View>
                  <TextInput
                    style={styles.input}
                    onChangeText={(val) => {
                      this.setState({ fee: val });
                    }}
                    placeholder={'Enter Participation fee Here'}
                    keyboardType={'numeric'}
                    placeholderTextColor="Black"></TextInput>
                </View>
              ) : null}
            </View>

            <TouchableOpacity
              style={{
                width: '50%',
                padding: 10,

                borderWidth: 1,
                borderRadius: 10,
                fontSize: 14,
                alignSelf: 'center',
                margin: 10,
                backgroundColor: '#95AD95',
              }}
              onPress={() => {
                this.addnewEvent();
              }}>
              <Text style={{ alignSelf: 'center' }}> Post </Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
       
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },

  input: {
    padding: 5,
    flex: 1,
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff55',
  },
  inputContainer: {
    marginTop: 10,
    alignSelf: 'center',
    marginBottom: 10,
    width: '85%',
    borderColor: '#b0b0b0',
    borderRadius: 5,
    borderWidth: 0.5,
  },
});
