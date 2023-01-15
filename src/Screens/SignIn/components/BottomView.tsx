import { BASE_URL } from "../../../shared/BASE_URL"
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"
import Icon1 from "react-native-vector-icons/Entypo"
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { screenName } from "../../../navigators/screens-name"
import jwt_decode from "jwt-decode"
import { useAppSelector, useAppDispatch } from "../../../Redux/hookRedux"
import { updateToken, updateUser } from "../../../Redux/Slice/userSlice"
import { typeToken, typeUser, Account } from "../../../shared/Interface"
import { scale } from "../../../shared/normalize"
import { onChangedNumber, onlyAlphabetNumeric } from "../../../shared/Function/handle"
import { img } from "../../../asset/index"
import { responsive } from "../../../shared/responsive"
import { clor } from "../../../shared/color"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { storeLocalToken } from "../../../shared/Function/AsyncStorage"
import LottieView from "lottie-react-native"

const heightItem = scale(60)
const marginVerticalItem = scale(12)
const sizeTxtInput = scale(16)
const sizeTxt = scale(14)
const listIcon = ["facebook", "twitter", "google-"]

export default function BottomView() {
  const navigation = useNavigation<any>();
  const receive = useRoute()?.params;
  const [phone, setPhone] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [securePass, setSecurePass] = useState<boolean>(true)
  const [loading, setloading] = useState<boolean>(false)
  const [notify, setNotify] = useState<string>("")
  const [rememberLogin, setRememberLogin] = useState<boolean>(false)
  const passRef = useRef<any>();
  const dispatch = useAppDispatch()

  // useEffect(() => {
  //   setPhone(receive?.phone !== undefined ? receive?.phone : phone)
  //   setPassword(receive?.pass !== undefined ? receive?.pass : password)
  // }, [receive?.pass, receive?.phone])


  const getLocalToken = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@localToken")
      if (jsonValue !== null) {
        const localToken: typeToken = JSON.parse(jsonValue)
        const user: typeUser = jwt_decode(localToken.token)
        dispatch(updateUser(user))
        dispatch(updateToken(localToken))
        navigation.navigate(screenName.homeTabs)
      }
    } catch (e) {

    }
  }

  async function storeLocalAccount(value: Account) {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem("@localAccount", jsonValue)
    } catch (e) {

    }
  }

  async function getLocalAccount() {
    try {
      const jsonValue = await AsyncStorage.getItem("@localAccount")
      if (jsonValue !== null) {
        var user: Account = JSON.parse(jsonValue)
        if (user.remember) {
          setPhone(user.phone)
          setPassword(user.pass)
          setRememberLogin(user.remember)
        }
        else {
          setPhone("")
          setPassword("")
          setRememberLogin(false)
        }
      }
    } catch (e) {

    }
  }

  useEffect(() => {
    setloading(true)
    setTimeout(() => {
      getLocalToken()
      getLocalAccount()
      setloading(false)
    }, 5000)
  }, [])

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
        console.log(response.ok)
        if (response.ok) {
          if (rememberLogin) {
            const user: Account = {
              phone: phone,
              pass: password,
              remember: rememberLogin
            }
            storeLocalAccount(user)
          }
          else {
            setPhone("")
            setPassword("")
            setNotify("")
            const user: Account = {
              phone: "",
              pass: "",
              remember: false
            }
            storeLocalAccount(user)
          }
          Promise.resolve(response.json())
            .then((value: typeToken) => {
              var user: typeUser = jwt_decode(value.token)
              storeLocalToken(value)
              dispatch(updateUser(user))
              dispatch(updateToken(value))
            });
          navigation.navigate(screenName.homeTabs);
        } else {
          setNotify("Invalid phone number or password")
        }
      })
    setloading(false)
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
        <LottieView source={img.waiting} autoPlay />
        :
        <ScrollView showsVerticalScrollIndicator={false} >
          <>
            <ImageBackground
              style={styles.salonLogo}
              source={img.logoSalon}
            />
            <Text style={styles.txt}>Login to your Account</Text>
            {
              notify !== "" ?
                <Text style={styles.txtNotify}>
                  {notify}
                </Text>
                :
                <></>
            }
            <TextInput
              placeholder="Type phone number"
              keyboardType="numeric"
              selectionColor={clor.maincolor}
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
                selectionColor={clor.maincolor}
                placeholderTextColor={"#9CA1A3"}
                style={{ color: "black", fontSize: sizeTxtInput }}
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
                  color={"#9CA1A3"} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.buttonSignIn}
              onPress={handleLogin}>
              <Text style={styles.txtLogin}>LOGIN</Text>
            </TouchableOpacity>
            <View style={styles.containerCheckRemember}>
              <TouchableOpacity
                onPress={() => setRememberLogin(!rememberLogin)}
              >
                <View style={styles.viewCheckRemember}>
                  {
                    rememberLogin ?
                      <Icon1
                        name={"check"}
                        size={scale(20)}
                        color={clor.maincolor} />
                      :
                      <></>
                  }
                </View>
              </TouchableOpacity>
              <Text style={styles.txtRegister}>Remember Password</Text>
              <View style={styles.viewFlex1} />
              <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPass")}>
                <Text style={styles.txtForgot}>Forgot pass?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerBottom}>
              <Text style={styles.txt}>---You can login with---</Text>
              <View style={styles.viewSocial}>
                {
                  listIcon.map((item, index) =>
                    <TouchableOpacity
                      key={index}
                      style={styles.btnIcon}>
                      <Icon1
                        name={item}
                        size={scale(28)}
                        color={clor.white}
                      />
                    </TouchableOpacity>
                  )
                }
              </View>
              <Text style={styles.txt}>
                Don"t you have an account?
                <Text style={styles.txtRegister} onPress={() => navigation.navigate(screenName.signUp)}>
                  {"  Register"}
                </Text>
              </Text>
            </View>
          </>
        </ScrollView>
      }
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: clor.white,
    padding: scale(20),
    justifyContent: "center",
  },
  containerCheckRemember: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: marginVerticalItem
  },
  containerBottom: {
    alignItems: "center",
    marginVertical: marginVerticalItem
  },
  viewFlex1: {
    flex: 1
  },
  viewSocial: {
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: marginVerticalItem
  },
  viewCheckRemember: {
    height: scale(20),
    width: scale(20),
    backgroundColor: clor.grayLight,
    alignItems: "center",
    justifyContent: "center"
  },
  salonLogo: {
    height: responsive.WIDTH * 0.3,
    width: responsive.WIDTH * 0.3,
    marginVertical: marginVerticalItem,
    alignSelf: "center"
  },
  textInput: {
    width: "100%",
    height: heightItem,
    fontSize: sizeTxtInput,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginVertical: marginVerticalItem,
    flexDirection: "row",
    alignItems: "center",
    color: "black",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  buttonSignIn: {
    width: "100%",
    height: heightItem,
    backgroundColor: clor.maincolor,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: marginVerticalItem,
    shadowColor: "red",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  txt: {
    color: clor.grayLight,
    fontSize: sizeTxt,
    fontWeight: "bold",
    marginVertical: marginVerticalItem,
  },
  txtLogin: {
    fontWeight: "bold",
    fontSize: sizeTxt,
    color: clor.white,
  },
  txtForgot: {
    color: clor.green,
    fontStyle: "italic",
    fontWeight: "600",
    fonsize: scale(16),
    alignSelf: "flex-end"
  },
  txtRegister: {
    color: clor.D,
    fontStyle: "italic",
    fontWeight: "bold",
    fonsize: scale(16),
    marginLeft: scale(10)
  },
  txtRememberPass: {
    fontSize: sizeTxt,
    color: clor.green
  },
  txtNotify: {
    fontSize: sizeTxt,
    color: clor.green
  },
  btnIcon: {
    backgroundColor: clor.maincolor,
    borderRadius: 10,
    padding: scale(marginVerticalItem),
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: responsive.WIDTH / 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 30,
      height: 30,
    },
    shadowOpacity: 1,
    shadowRadius: 9.51,
    elevation: 15,
  }
});
