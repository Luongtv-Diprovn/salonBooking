import { BASE_URL } from '../../../shared/BASE_URL'
import React, { memo, useState, useRef } from "react"
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native"
import { useAppSelector, useAppDispatch } from "../../../Redux/hookRedux"
import { scale } from '../../../shared/normalize'
import { clor } from '../../../shared/color'
import Toast from "react-native-toast-message"
import { toastConfig, showToast } from "../../../components/Toast/ToastNotify"
import LottieView from 'lottie-react-native'
import { img } from '../../../asset/index'
import Icon1 from "react-native-vector-icons/Entypo"

const heightItem = scale(60)
const marginVerticalItem = scale(12)
const sizeTxtInput = scale(16)
const sizeTxt = scale(14)

function BottomViewChangePass() {

  const user = useAppSelector((state) => state.user)
  const [notify, setNotify] = useState<string>("")
  const [oldPass, setOldPass] = useState<string>("")
  const [newPass, setNewPass] = useState<string>("")
  const [loading, setloading] = useState(false)
  const [secureOldPass, setSecureOldPass] = useState<boolean>(true)
  const [secureNewPass, setSecureNewPass] = useState<boolean>(true)
  const passRef = useRef<any>()

  const handleChangePass = () => {
    if (newPass == "" || oldPass == "") {
      setNotify("New pass or old pass is empty")
    }
    else if (newPass.length < 6) {
      setNotify("New pass need at least 6 char")
    }
    else if (newPass == oldPass) {
      setNotify("Old and new pass is the same !")
    }
    else {
      Patch_Password()
    }
  }

  async function Patch_Password() {
    console.log("ok")

    setloading(true)
    var url = BASE_URL + "/api/v1/customers/" + user.userProperties.Id + "/password"
    await fetch(url, {
      method: "PATCH",
      headers: {
        'Authorization': 'Bearer ' + user.userProperties.Token.token,
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        "oldPassword": oldPass,
        "newPassword": newPass
      })
    }).then((response) => {
      if (response.ok) {
        showToast("Success", "Update pass success")
        setOldPass("")
        setNewPass("")
      } else if (response.status == 401) {
        showToast("Fail", "Invalid old password!")
        setOldPass("")
        setNewPass("")
      } else {
        showToast("FailTwoLine", "Something Wrong", "Update again please !!!")
        setOldPass("")
        setNewPass("")
      }
    })
    setloading(false)
  }

  return (

    <View style={styles.bottomView}>
      {loading ?
        <LottieView source={img.waiting} autoPlay />
        :
        <>
          {
            notify !== "" ?
              <Text style={styles.txtNotify}>
                {notify}
              </Text>
              :
              <></>
          }
          <View style={styles.textInput}>
            <TextInput
              placeholder="Type old pass"
              selectionColor={clor.maincolor}
              placeholderTextColor={"#9CA1A3"}
              style={{ color: "black", fontSize: sizeTxtInput }}
              maxLength={30}
              secureTextEntry={secureOldPass}
              onChangeText={(text) => {
                setOldPass(text)
              }}
              returnKeyType="next"
              onSubmitEditing={() => {
                passRef.current.focus();
              }}
            />
            <View style={styles.viewFlex1} />
            <TouchableOpacity
              onPress={() => {
                setSecureOldPass(!secureOldPass)
              }}>
              <Icon1
                name={secureOldPass ? "eye-with-line" : "eye"}
                size={scale(28)}
                color={"#9CA1A3"} />
            </TouchableOpacity>
          </View>
          <View style={styles.textInput}>
            <TextInput
              ref={passRef}
              placeholder="Type at least 6 char"
              selectionColor={clor.maincolor}
              placeholderTextColor={"#9CA1A3"}
              style={{ color: "black", fontSize: sizeTxtInput }}
              maxLength={30}
              secureTextEntry={secureNewPass}
              onChangeText={(text) => {
                setNewPass(text)
              }}
              onSubmitEditing={handleChangePass}
            />
            <View style={styles.viewFlex1} />
            <TouchableOpacity
              onPress={() => {
                setSecureNewPass(!secureNewPass)
              }}>
              <Icon1
                name={secureNewPass ? "eye-with-line" : "eye"}
                size={scale(28)}
                color={"#9CA1A3"} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={handleChangePass}>
            <Text style={styles.txtBtn}>CONFIRM</Text>
          </TouchableOpacity>
        </>
      }
      <Toast config={toastConfig} />
    </View>

  )
}

export default memo(BottomViewChangePass)

const styles = StyleSheet.create({
  bottomView: {
    backgroundColor: "white",
    height: "90%",
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: scale(20),
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
  txtBtn: {
    fontWeight: "bold",
    fontSize: sizeTxt,
    color: clor.white,
  },
  btn: {
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
  viewFlex1: {
    flex: 1
  },
  txt: {
    color: clor.grayLight,
    fontSize: sizeTxt,
    fontWeight: "bold",
    marginVertical: marginVerticalItem,
  },
  txtNotify: {
    fontSize: sizeTxt,
    color: clor.green
  }
})