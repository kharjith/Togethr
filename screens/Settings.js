import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';
import db from '../config';
import { LinearGradient } from 'expo-linear-gradient';
export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      firstName: '',
      contact: '',

      image: 'https://picsum.photos/id/237/200/300',
    };
  }
  getUserDetails = () => {
    db.collection('users')
      .where('email', '==', this.state.userId)
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
  logoutUser = () => {
    try {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert('Logging out..');

        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
      alert('An error occured. Please try again later.');
    }
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fcebd5' }}>
        <LinearGradient
          // Button Linear Gradient
          colors={['#e6f0e1', '#e6f0e1']}
          start={{ x: 0.1, y: 0.9 }}
          end={{ x: 0.9, y: 0.1 }}
          style={{
            flex: 0.2,
            padding: 10,
            justifyContent: 'center',
          }}>
          <View
            style={{
              paddingLeft: 5,
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../assets/femaleava.png')}
              style={{
                width: 100,
                height: 90,
                marginLeft: 20,
                borderColor: 'black',
                padding: 5,
                borderWidth: 2,
                borderRadius: 40,
                flex: 0.2,
              }}
            />

            <View
              style={{
                alignItems: 'flex-start',
                marginLeft: 10,
                flex: 0.8,
              }}>
              <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                {this.state.firstName}
              </Text>

              <Text style={{ marginTop: 5 }}>{this.state.userId}</Text>
              <Text style={{ marginTop: 5 }}>{this.state.contact}</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={{ flex: 0.7, padding: 10 }}>
          <View style={styles.ss}>
            <FontAwesome name={'user-circle-o'} size={24} color="black" />
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Profile');
              }}
              style={styles.sss}>
              <Text style={{ color: 'black', fontSize: 16 }}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.ss}>
            <AntDesign name={'mobile1'} size={24} color="black" />
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Aboutus');
              }}
              style={styles.sss}>
              <Text style={{ color: 'black', fontSize: 16 }}>About App</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.ss}>
            <AntDesign name={'customerservice'} size={24} color="black" />
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Feedback');
              }}
              style={styles.sss}>
              <Text style={{ color: '#000', fontSize: 16 }}>Feedback</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.ss}>
            <Ionicons name="log-out" size={27} color="black"></Ionicons>
            <TouchableOpacity
              onPress={() => {
                this.logoutUser();
              }}
              style={styles.sss}>
              <Text style={{ color: 'black', fontSize: 16 }}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 0.1 }}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ss: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  sss: {
    height: 50,
    width: '100%',
    borderBottomWidth: 1.5,
    justifyContent: 'center',
    borderBottomColor: 'black',
    marginHorizontal: 10,
  },
});
