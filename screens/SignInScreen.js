import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
export default class SignInScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      contact: '',
    };
  }
  signIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        alert('User signed in');

        this.props.navigation.navigate('HomeScreen');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
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
              marginTop: 10,
              marginLeft: 20,
            }}>
            Hello there!
          </Text>
          <Text
            style={{
              fontSize: 18,
              marginLeft: 20,
              marginBottom: 5,
            }}>
            Please Sign In to Continue
          </Text>

          <Image
            source={require('../assets/getstart.png')}
            style={{
              width: 300,
              height: 250,
              marginTop: 5,
              marginLeft: 35,
              marginBottom: 20,
            }}
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
          <TouchableOpacity
            style={{ alignSelf: 'flex-end', marginRight: 10 }}
            onPress={() =>
              this.props.navigation.navigate('ForgotPasswordScreen')
            }>
            <Text style={{ color: 'black' }}>Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { marginTop: 10 }]}
            onPress={() => {
              this.signIn();
            }}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignSelf: 'center', padding: 10 }}
            onPress={() => this.props.navigation.navigate('SignUpScreen')}>
            <Text style={{ color: 'black' }}>Not a user? Sign Up</Text>
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
    padding: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});
