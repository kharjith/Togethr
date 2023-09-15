import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { StyleSheet } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import ExploreEvents from '../screens/ExploreEvents';

import MyEventsScreen from '../screens/MyEventsScreen';
import AddEventScreen from '../screens/AddEventScreen';

import Settings from '../screens/Settings';
import Aboutus from '../screens/Aboutus';
import Feedback from '../screens/Feedback';
import Profile from '../screens/Profile';

import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

const HStack = createStackNavigator();
const EStack = createStackNavigator();
const SStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

function MyTab() {
  return (
    <Tab.Navigator
      activeColor={'#969D7C'}
      inactiveColor={'#fff'}
      labeled={false}
      barStyle={styles.bottomTabStyle}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let ionicon;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'MyEvents') {
            iconName = focused ? 'create' : 'create-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          return (
            <Ionicons
              name={iconName}
              size={24}
              color={color}
             
            />
          );
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={() => ({
       
          headerShown: false,
        })}
      />
      <Tab.Screen
        name="MyEvents"
        component={MyEventsStack}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

function HomeStack() {
  return (
    <HStack.Navigator screenOptions={{ headerShown: false }}>
      <HStack.Screen name="HomeScreen" component={HomeScreen} />
      <HStack.Screen name="AddEventScreen" component={AddEventScreen} />
      <HStack.Screen name="ExploreEvents" component={ExploreEvents} />
      <EStack.Screen name="EventDetailsScreen" component={EventDetailsScreen} />
    </HStack.Navigator>
  );
}

function MyEventsStack() {
  return (
    <EStack.Navigator screenOptions={{ headerShown: false }}>
      <EStack.Screen name="MyEventsScreen" component={MyEventsScreen} />

      <EStack.Screen name="AddEventScreen" component={AddEventScreen} />
      <EStack.Screen name="EventDetailsScreen" component={EventDetailsScreen} />
    </EStack.Navigator>
  );
}

function SettingsStack() {
  return (
    <SStack.Navigator screenOptions={{ headerShown: false }}>
      <SStack.Screen name="Settings" component={Settings} />
      <SStack.Screen name="Profile" component={Profile} />
      <SStack.Screen name="Aboutus" component={Aboutus} />
      <SStack.Screen name="Feedback" component={Feedback} />
    </SStack.Navigator>
  );
}

export default MyTab;
const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: '#AF9D89',
    height: '7%',
    overflow: 'hidden',
    position: 'absolute',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent:"center"
  },
  icons: {
    width: 30,
    height: 30,
  },
});
