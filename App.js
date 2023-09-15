import * as React from 'react';
import GetStart from './screens/GetStart';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import Loading from './screens/Loading';

import MyTab from './components/navigate';
import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';
const LStack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <LStack.Navigator screenOptions={{ headerShown: false }}>
          <LStack.Screen name="Loading" component={Loading} />
          <LStack.Screen name="GetStart" component={GetStart} />
          <LStack.Screen name="SignInScreen" component={SignInScreen} />
          <LStack.Screen name="SignUpScreen" component={SignUpScreen} />
          <LStack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
          />
          <LStack.Screen name="HomeScreen" component={MyTab} />
        </LStack.Navigator>
      </NavigationContainer>
    );
  }
}
