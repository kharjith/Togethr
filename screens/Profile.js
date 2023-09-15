import React, { Component } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  StyleSheet,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { Header, Icon, Avatar } from 'react-native-elements';


export default class ProfileScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: firebase.auth().currentUser.email,
      name: '',
      contact: '',
      docID: '',
    };
  }

  updateDetails = async () => {
    try {
      db.collection('users').doc(this.state.docID).update({
        name: this.state.name,
        contact: this.state.contact,
      });
      Alert.alert('Profile Updated');
      alert('Profile updated');
    } catch (e) {
      console.log(e);
    }
  };

  getUserDetails = () => {
    var email = this.state.email;
    db.collection('users')
      .where('email', '==', email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            email: data.email,
            name: data.name,
            contact: data.contact,
            isFemale: true,
            docID: doc.id,
          });
        });
      });
  };

  componentDidMount() {
    this.getUserDetails();
  }

  toggleGender = () => {
    this.setState((prevState) => ({
      isFemale: !prevState.isFemale,
    }));
  };

  saveProfileChanges = () => {
    this.props.navigation.goBack();
  };

  render() {
    const profileImage = this.state.isFemale
      ? require('../assets/femaleava.png')
      : require('../assets/malelast.png');

    return (
      
        <View style={styles.container}>
          <Header
            centerComponent={{
              text: 'Profile',
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
                  this.saveProfileChanges(); 
                }}>
                >
              </Icon>
            }
            backgroundColor={'#95ad95'}
          />

          <ScrollView
            style={{
              width: '100%',
              backgroundColor: '#e6f0e1',
              justifyContent: 'center',
            }}>
            <KeyboardAvoidingView>
              <Image source={profileImage} style={styles.profileImage} />

              <Text style={{ color: 'black', alignSelf: 'center' }}>
                {this.state.email}
              </Text>
              <TouchableOpacity
                onPress={this.toggleGender}
                style={styles.button}>
                <Text style={styles.buttonText1}>
                  Change Profile to {this.state.isFemale ? 'Male' : 'Female'}
                </Text>
              </TouchableOpacity>

              <TextInput
                style={styles.textinput}
                placeholder={'Username'}
                onChangeText={(text) => {
                  this.setState({
                    name: text,
                  });
                }}
                value={this.state.name}
              />
              <TextInput
                style={styles.textinput}
                placeholder={'Contact'}
                maxLength={10}
                keyboardType={'numeric'}
                onChangeText={(text) => {
                  this.setState({
                    contact: text,
                  });
                }}
                value={this.state.contact}
              />
              <TouchableOpacity
                style={styles.updateButton}
                onPress={() => {
                  this.updateDetails();
                  this.saveProfileChanges();
                }}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
     
    );
  }
}

const styles = StyleSheet.create({
  
  buttonText1: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    alignSelf: 'center',
  },
   container: {
    flex: 1,
    backgroundColor: '#beccc0', // Set the background color here
  },
  button: {
    backgroundColor: '#95ad95',
    padding: 5,
    borderRadius: 5,
    width: '80%',
    height: 30,
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
  },
  updateButton: {
    width: '80%',
    height: 30,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#95ad95',
    borderRadius: 20,
  },
  textinput: {
    marginTop: 5,
    marginBottom: 5,
    width: '85%',
    height: 50,
    borderColor: 'black',
    borderRadius: 20,
    borderBottomWidth: 1.5,
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
  },
});
