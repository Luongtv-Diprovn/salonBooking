import React from "react"
import Icon from 'react-native-vector-icons/AntDesign'
import Icon1 from 'react-native-vector-icons/Fontisto'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { screenName } from "./screens-name"
import { navigationRef } from "./root-navigator"
import Home from "../Screens/Home/Home"
import SignIn from '../Screens/SignIn/SignIn'
import User from '../Screens/User/User'

const Tab = createMaterialBottomTabNavigator();

function HomeTabs() {

  return (
    <Tab.Navigator
      activeColor="#ec6882"
      initialRouteName={'Home'}
      barStyle={{
        backgroundColor: '#fff3d1',
      }}>
      <Tab.Screen name="Home" component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon1 name="home" color={color} size={24} />),
        }} />
      <Tab.Screen name="User" component={User}
        options={{
          tabBarLabel: 'User',
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={24} />),
        }} />
    </Tab.Navigator>
  )
}

const Stack = createNativeStackNavigator()

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={screenName.home}
    >
      <Stack.Screen name={screenName.home} component={Home} />
      <Stack.Screen name={screenName.signIn} component={SignIn} />
      <Stack.Screen name={screenName.homeTabs} component={HomeTabs} />
    </Stack.Navigator>
  )
}

export const MainNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <MainStack />
    </NavigationContainer>
  )
}