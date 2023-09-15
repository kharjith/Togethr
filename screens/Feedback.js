import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Header, Icon } from 'react-native-elements';
import firebase from 'firebase';

export default class FeedbackScreen extends Component {
  constructor() {
    super();
    this.state = {
      rating: null,
      feedback: '',
    };
  }

  submitRating = () => {
    const { rating } = this.state;

    if (rating === null) {
      alert('Please select a rating.');
    }
  };

  savefeedback = () => {
    this.props.navigation.goBack();
  };

  submitFeedback = () => {
    const { feedback } = this.state;
    const user = firebase.auth().currentUser;

    if (feedback.trim() === '') {
      Alert.alert('Error', 'Please enter your feedback.');
    } else {
      firebase
        .firestore()
        .collection('feedback')
        .add({
          user: user ? user.email : 'Anonymous',
          feedback: feedback,
          timestamp: new Date(),
        });

      Alert.alert('Feedback Submitted');
      alert('Thanks For your Feedback');
      this.savefeedback();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{
            text: 'Feedback',
            style: styles.headerText,
          }}
          backgroundColor={'#AF9D89'}
          leftComponent={
            <Icon
              name="arrow-left"
              type="feather"
              color="#ffffff"
              onPress={() => {
                this.savefeedback();
              }}>
              >
            </Icon>
          }
        />

        <Text style={styles.heading}>Rate Our App</Text>
        <View style={styles.ratingContainer}>


          <TouchableOpacity
            onPress={() => this.setState({ rating: 1 })}
            style={[
              styles.ratingButton,
              this.state.rating === 1 && styles.selectedRating,
            ]}>
            <Text style={styles.emoticon}>😞</Text>
          </TouchableOpacity>

          
        


          <TouchableOpacity
            onPress={() => this.setState({ rating: 2 })}
            style={[
              styles.ratingButton,
              this.state.rating === 2 && styles.selectedRating,
            ]}>
            <Text style={styles.emoticon}>😐</Text>
          </TouchableOpacity>


          <TouchableOpacity
            onPress={() => this.setState({ rating: 3 })}
            style={[
              styles.ratingButton,
              this.state.rating === 3 && styles.selectedRating,
            ]}>
            <Text style={styles.emoticon}>😃</Text>
          </TouchableOpacity>

         <TouchableOpacity
            onPress={() => this.setState({ rating: 4 })}
            style={[
              styles.ratingButton,
              this.state.rating === 4 && styles.selectedRating,
            ]}>
            <Text style={styles.emoticon}>😇</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.setState({ rating: 5 })}
            style={[
              styles.ratingButton,
              this.state.rating === 5 && styles.selectedRating,
            ]}>
            <Text style={styles.emoticon}>🤩</Text>
          </TouchableOpacity>

        </View>
        <TouchableOpacity style={styles.button} onPress={this.submitRating}>
          <Text style={styles.buttonText}>Submit Rating</Text>
        </TouchableOpacity>

        <Text style={styles.heading}>We'd Love to Hear Your Feedback</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your feedback"
          multiline
          onChangeText={(text) => this.setState({ feedback: text })}
        />
        <TouchableOpacity style={styles.button} onPress={this.submitFeedback}>
          <Text style={styles.buttonText}>Submit Feedback</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ratingButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#AF9D89',
    marginLeft:10,
  },
  selectedRating: {
    backgroundColor: '#7e9278',
  },
  emoticon: {
    marginVertical: 10,
    fontSize: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fcebd5',
  },
  headerText: {
    margin: 2,
    padding: 2,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 4,
    borderColor: '#7e9278',
    borderRadius: 10,
    margin: 20,
    padding: 10,
    textAlignVertical: 'top',
    height: 150,
  },
  button: {
    backgroundColor: '#AF9D89',
    borderRadius: 10,
    padding: 10,
    margin: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
