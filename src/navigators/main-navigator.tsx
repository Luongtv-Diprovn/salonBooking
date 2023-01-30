import React from "react"
import Icon from 'react-native-vector-icons/AntDesign'
import Icon1 from 'react-native-vector-icons/Fontisto'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Provider } from 'react-redux'
import store from '../Redux/store'
import { screenName } from "./screens-name"
import { navigationRef } from "./root-navigator"
import Home from "../Screens/Home/Home"
import SignIn from '../Screens/SignIn/SignIn'
import User from '../Screens/User/User'
import HistoryBooking from '../Screens/HistoryBooking/HistoryBooking'
import Booking from '../Screens/Booking/Booking'
import Ranking from '../Screens/Ranking/Ranking'
import SignUp from '../Screens/SignUp/SignUp'
import OTPSignUp from '../Screens/SignUp/components/OTPView'
import OTPForgotPass from '../Screens/ForgotPass/components/OTPView'
import ForgotPass from '../Screens/ForgotPass/ForgotPass'
import MainDrawer from '../Screens/DrawerNavigator/main-drawer'
import { scale } from '../shared/normalize'
import { clor } from '../shared/color'

const Tab = createMaterialBottomTabNavigator();

function HomeTabs() {

  return (
    <Tab.Navigator
      labeled={false}
      activeColor={clor.white}
      inactiveColor={clor.maincolor}
      initialRouteName={'Home'}
      barStyle={{
        backgroundColor: clor.grayForBGR,
      }}>
      <Tab.Screen name="Ranking" component={Ranking}
        options={{
          tabBarLabel: 'Ranking',

          tabBarIcon: ({ color }) => (
            <Icon2 name="sort" color={color} size={scale(24)} />),
        }} />
      <Tab.Screen name="HistoryBooking" component={HistoryBooking}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ color }) => (
            <Icon1 name="history" color={color} size={scale(24)} />),
        }} />
      <Tab.Screen name="Home" component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon1 name="home" color={color} size={scale(24)} />),
        }} />
      <Tab.Screen name="MainDrawer" component={MainDrawer}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={scale(24)} />),
        }} />
      <Tab.Screen name="Booking" component={Booking}
        options={{
          tabBarLabel: 'Booking',
          tabBarIcon: ({ color }) => (
            <Icon name="calendar" color={color} size={scale(24)} />),
        }} />

    </Tab.Navigator>
  )
}

const Stack = createNativeStackNavigator()

const MainStack = () => {
  return (
    <Provider store={store}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={screenName.signIn}
      >
        <Stack.Screen name={screenName.signIn} component={SignIn} />
        <Stack.Screen name={screenName.homeTabs} component={HomeTabs} />
        <Stack.Screen name={screenName.signUp} component={SignUp} />
        <Stack.Screen name={screenName.otpSignUp} component={OTPSignUp} />
        <Stack.Screen name={screenName.otpForgotPass} component={OTPForgotPass} />
        <Stack.Screen name={screenName.forgotpass} component={ForgotPass} />
        <Stack.Screen name={screenName.mainDrawer} component={MainDrawer} />
      </Stack.Navigator>
    </Provider>
  )
}

export const MainNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <MainStack />
    </NavigationContainer>
  )
}
