import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
export default class SignUpScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      contact: '',
      name: '',
    };
  }
  signUp = () => {
    if (this.state.password == this.state.confirmPassword) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((userCredential) => {
        
          db.collection('users').add({
            email: this.state.email.toLowerCase(),
            name: this.state.name,
            contact: this.state.contact,
            password: this.state.password,
          });
          this.props.navigation.navigate('HomeScreen');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
          // ..
        });
    } else {
      alert('Passwords dont match, please enter correctly');
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../assets/bg2.webp')}
          style={styles.backgroundImage}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 5,
              marginTop: 20,
              marginLeft: 20,
            }}>
            Hello again!
          </Text>
          <Text
            style={{
              fontSize: 18,
              marginLeft: 20,

              marginBottom: 20,
            }}>
            Please Sign up to Continue
          </Text>
          <TextInput
            style={styles.textinput}
            placeholder={'Enter Name'}
            placeholderTextColor={'#ab7261'}
            onChangeText={(val) => {
              this.setState({ name: val });
            }}
            value={this.state.name}
          />
          <TextInput
            style={styles.textinput}
            placeholder={'Enter contact'}
            placeholderTextColor={'#ab7261'}
            onChangeText={(val) => {
              this.setState({ contact: val });
            }}
            value={this.state.contact}

          />
          <TextInput
            style={styles.textinput}
            placeholder={'Enter Email'}
            placeholderTextColor={'#ab7261'}
            onChangeText={(val) => {
              this.setState({ email: val });
            }}
            value={this.state.email}

          />
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({ password: text })}
            placeholder={'Enter Password'}
            placeholderTextColor={'#ab7261'}
            value={this.state.password}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.textinput}
            placeholder={'Confirm Password'}
            placeholderTextColor={'#ab7261'}
            onChangeText={(val) => {
              this.setState({ confirmPassword: val });
            }}
            value={this.state.confirmPassword}
            secureTextEntry={true}

          />
          <TouchableOpacity
            style={[styles.button, { marginTop: 10 }]}
            onPress={() => {
              this.signUp();
            }}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignSelf: 'center', padding: 10 }}
            onPress={() => this.props.navigation.navigate('SignInScreen')}>
            <Text style={{ color: 'black' }}>Already an user? Sign In</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  textinput: {
    width: '75%',
    padding: 10,
    borderColor: '#969e7b',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
    alignSelf: 'center',
    margin: 10,
  },

  button: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#988d49',
    borderRadius: 15,
    alignSelf: 'center',
    padding:10
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});
