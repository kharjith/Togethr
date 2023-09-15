import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

export default class GetStart extends React.Component {
  goTosignScreen = () => {
    this.props.navigation.navigate('SignInScreen');
  };

  render() {
    return (
      <View style={{flex:1, backgroundColor:"#ffff",justifyContent:"center", alignItems:"center", padding:10}}>
        <Image
          source={require('../assets/Toge.png')} 
          style={{ width: 350, height: 350, marginTop: 10, marginRight:10, borderRadius:150 }}
        />
        <Text
          style={{
            color:'#5E503B',
            fontSize: 17,
            textAlign: 'center',
            marginTop: 0,
            marginBottom: 30,
          }}>
          Looking to connect with like-minded people, explore exciting events?
        </Text>

       

        <TouchableOpacity
          onPress={() => this.goTosignScreen()}
          style={{
            marginTop:30,
            width: '60%',
            padding:10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#988d49',
            borderRadius: 15,
          }}>
          <Text style={{ color: 'white', fontSize: 20 }}>Get Started</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
