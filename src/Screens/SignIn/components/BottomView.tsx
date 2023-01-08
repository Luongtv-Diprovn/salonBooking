import { BASE_URL } from '../../../BASE_URL'
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"
import Icon1 from 'react-native-vector-icons/Entypo'
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { screenName } from '../../../navigators/screens-name'
import jwt_decode from "jwt-decode"
import { useAppSelector, useAppDispatch } from '../../../Redux/hookRedux'
import { updateToken, updateUser } from '../../../Redux/Slice/userSlice'
import { typeToken, typeUser } from '../../../Interface'

export default function BottomView() {
  const navigation = useNavigation<any>();
  const receive = useRoute()?.params;
  const [phone, setPhone] = useState<string>("0123456789")
  const [password, setPassword] = useState<string>("123456")
  const [securePass, setSecurePass] = useState<boolean>(true)
  const [loading, setloading] = useState<boolean>(false)
  const [notify, setNotify] = useState<string>("")
  const passRef = useRef<any>();
  const dispatch = useAppDispatch()

  // useEffect(() => {
  //   setPhone(receive?.phone !== undefined ? receive?.phone : phone)
  //   setPassword(receive?.pass !== undefined ? receive?.pass : password)
  // }, [receive?.pass, receive?.phone])


  const Post_Login = async () => {
    setloading(true)
    var url = BASE_URL + "/api/v1/customers/login"
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: phone,
        password: password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // setPhone("")
          // setPassword("")
          setNotify("")
          Promise.resolve(response.json())
            .then((value: typeToken) => {
              dispatch(updateToken(value))
              var user: typeUser = jwt_decode(value.token)
              dispatch(updateUser(user))
            });
          navigation.navigate(screenName.homeTabs);
        } else {
          setNotify("Invalid phone number or password")
        }
      })
    setloading(false);
  };

  return (
    <View style={styles.container}>
      {loading ?
        <ActivityIndicator color="red" size={40} />
        :
        <ScrollView showsVerticalScrollIndicator={false} >
          <View style={styles.bottomView}>
            <Text style={styles.txtWelcome}> Welcome </Text>
            <TextInput
              placeholder="Type phone number"
              keyboardType="numeric"
              selectionColor={'#ec6882'}
              placeholderTextColor={"#9CA1A3"}
              maxLength={10}
              style={styles.textInput}
              defaultValue={phone}
              onChangeText={(text) => {
                setPhone(text);
              }}
              returnKeyType="next"
              onSubmitEditing={() => {
                passRef.current.focus();
              }}
              blurOnSubmit={false} />
            <View style={styles.textInput}>
              <TextInput
                ref={passRef}
                placeholder="Type pass"
                defaultValue={password}
                selectionColor={'#ec6882'}
                placeholderTextColor={"#9CA1A3"}
                style={{ color: "white" }}
                maxLength={30}
                secureTextEntry={securePass}
                onChangeText={(text) => {
                  setPassword(text);
                }}
                onSubmitEditing={Post_Login} />
              <View style={{ flex: 1 }} />
              <TouchableOpacity
                onPress={() => {
                  setSecurePass(!securePass)
                }}>
                <Icon1
                  name={securePass ? "eye-with-line" : "eye"}
                  size={28}
                  color={'#9CA1A3'} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.buttonSignIn}
              onPress={() => {
                Post_Login()
                // console.log(URL_BASE)
              }}>
              <Text style={styles.txtLogin}>LOGIN</Text>
            </TouchableOpacity>
            <View style={styles.rowItem} >
              <TouchableOpacity
                onPress={() => navigation.navigate(screenName.forgotPass)}>
                <Text style={styles.txtForgot}>Forgot pass?</Text>
              </TouchableOpacity>
              <View style={{ flex: 1 }} />
              <Icon
                name={"hand-o-right"}
                color={"#ec6882"}
                size={20} />
              <TouchableOpacity
                onPress={() => navigation.navigate(screenName.signUp)}>
                <Text style={styles.txtRegister}>Register</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.txtNotify}>
              {notify}
            </Text>
          </View>
        </ScrollView>

      }
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: "black",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    justifyContent: "center"
  },
  bottomView: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
  },

  textInput: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    color: "white"
  },
  buttonSignIn: {
    width: "100%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  rowItem: {
    flexDirection: "row",
    alignItems: 'center',
    paddingHorizontal: 22,
    justifyContent: 'center',
    marginTop: 15
  },
  txtWelcome: {
    alignItems: "center",
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 15
  },
  txtLogin: {
    fontWeight: "bold",
    fontSize: 18,
    color: "black"
  },
  txtForgot: {
    color: "#68ED7F",
    fontStyle: "italic",
    fontWeight: '600'
  },
  txtRegister: {
    color: "#ec6882",
    fontStyle: "italic",
    fontWeight: '600'
  },
  txtNotify: {
    fontSize: 18,
    color: "#27A13B",
    marginTop: 20
  }
});