import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
export default class ForgotPasswordScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
    };
  }
  signIn = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(() => {
        alert('Password Reset link sent !');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../assets/bg2.webp')}
          style={styles.backgroundImage}>

           <Image
          source={require('../assets/forgotp1.png')} 
          style={{ width: 280, height: 280, marginTop: 10, alignSelf:'center'}} 
        />

          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 5,
              marginTop: 20,
              marginLeft: 20,
            }}>
            We got you covered!
          </Text>
          <Text
            style={{
              fontSize: 18,
              marginLeft: 20,

              marginBottom: 20,
            }}>
            Please enter your email to send password reset link!
          </Text>

          <TextInput
            style={styles.textinput}
            placeholder={'Enter Email'}
            placeholderTextColor={'#ab7261'}
            onChangeText={(val) => {
              this.setState({ email: val });
            }}
            value={this.state.email}

          />

          <TouchableOpacity
            style={[styles.button, { marginTop: 10 }]}
            onPress={() => {
              this.signIn();
            }}>
            <Text style={styles.buttonText}>Send mail</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginTop: 10, alignSelf:"center", padding:10 }}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Text styles={{color:'Black'}}> Back to Sign In </Text>
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
