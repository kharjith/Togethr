import * as React from "react";
import {
  View,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import firebase from "firebase";

export default class Loading extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate("HomeScreen");
      } else {
        this.props.navigation.navigate("GetStart");
      }
    });
  }
  render() {
    return (
      <View>
        <SafeAreaView
          style={{
            marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 35,
          }}
        >
          <ImageBackground
            source={require("../assets/Toge.png")}
            style={{
              alignSelf: "center",
              resizeMode: "contain",
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height - 5,
            }}
          ></ImageBackground>
        </SafeAreaView>
      </View>
    );
  }
}