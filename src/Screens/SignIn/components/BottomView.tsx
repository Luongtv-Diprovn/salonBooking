import { BASE_URL } from '../../../shared/BASE_URL'
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
import { typeToken, typeUser } from '../../../shared/Interface'
import { scale } from '../../../shared/normalize'
import { onChangedNumber, onlyAlphabetNumeric } from '../../../shared/Function/handle'

export default function BottomView() {
  const navigation = useNavigation<any>();
  const receive = useRoute()?.params;
  const [phone, setPhone] = useState<string>("0905444552")
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
              var user: typeUser = jwt_decode(value.token)
              dispatch(updateUser(user))
              dispatch(updateToken(value))
            });
          navigation.navigate(screenName.homeTabs);
        } else {
          setNotify("Invalid phone number or password")
        }
      })
    setloading(false);
  };

  const handleLogin = () => {
    if (password.length == 0 || phone.length == 0) {
      setNotify("Empty phone number or pass")
    }
    else if (phone[0] != "0") {
      setNotify("Invalid Phone number")
    }
    else if (phone.length < 10) {
      setNotify("Phone need at least 10 char")
    }
    else if (password.length < 6) {
      setNotify("Pass need at least 6 char")
    } else {
      Post_Login()
    }
  }

  return (
    <View style={styles.container}>
      {loading ?
        <ActivityIndicator color="red" size={scale(40)} />
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
              value={phone}
              onChangeText={(text) => {
                setPhone(onChangedNumber(text));
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
                value={password}
                onChangeText={(text) => {
                  setPassword(onlyAlphabetNumeric(text))
                }}
                onSubmitEditing={handleLogin} />
              <View style={styles.viewFlex1} />
              <TouchableOpacity
                onPress={() => {
                  setSecurePass(!securePass)
                }}>
                <Icon1
                  name={securePass ? "eye-with-line" : "eye"}
                  size={scale(28)}
                  color={'#9CA1A3'} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.buttonSignIn}
              onPress={handleLogin}>
              <Text style={styles.txtLogin}>LOGIN</Text>
            </TouchableOpacity>
            <View style={styles.rowItem} >
              <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPass")}>
                <Text style={styles.txtForgot}>Forgot pass?</Text>
              </TouchableOpacity>
              <View style={styles.viewFlex1} />
              <Icon
                name={"hand-o-right"}
                color={"#ec6882"}
                size={scale(20)} />
              <TouchableOpacity
                onPress={() => navigation.navigate("SignUp")}>
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
    paddingHorizontal: scale(20),
    justifyContent: "center"
  },
  bottomView: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: scale(15),
  },
  viewFlex1: {
    flex: 1
  },
  textInput: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    paddingHorizontal: scale(10),
    margin: scale(10),
    flexDirection: "row",
    alignItems: "center",
    color: "white",
  },
  buttonSignIn: {
    width: "100%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: scale(10),
  },
  rowItem: {
    flexDirection: "row",
    alignItems: 'center',
    paddingHorizontal: scale(22),
    justifyContent: 'center',
    marginTop: scale(15)
  },
  txtWelcome: {
    alignItems: "center",
    color: "white",
    fontSize: scale(40),
    fontWeight: "bold",
    marginBottom: scale(15)
  },
  txtLogin: {
    fontWeight: "bold",
    fontSize: scale(18),
    color: "black"
  },
  txtForgot: {
    color: "#68ED7F",
    fontStyle: "italic",
    fontWeight: '600',
    fonsize: scale(16)
  },
  txtRegister: {
    color: "#ec6882",
    fontStyle: "italic",
    fontWeight: '600',
    fonsize: scale(16),
    marginLeft: scale(5)
  },
  txtNotify: {
    fontSize: scale(18),
    color: "#27A13B",
    marginTop: scale(20)
  }
});
