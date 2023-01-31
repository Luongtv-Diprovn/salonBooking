import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { screenName } from "../../navigators/screens-name"
import { scale } from "../../shared/normalize"
import { onChangedNumber } from "../../shared/Function/handle"
import { img } from "../../asset/index"
import { responsive } from "../../shared/responsive"
import { clor } from "../../shared/color"

const heightItem = scale(60)
const marginVerticalItem = scale(12)
const sizeTxtInput = scale(16)
const sizeTxt = scale(14)

export default function SignUp() {

    const navigation = useNavigation<any>();
    const [phone, setPhone] = useState<string>("")
    const [notify, setNotify] = useState<string>("")

    const handleCreateAccount = () => {
        if (phone.length == 0) {
            setNotify("Empty phone number")
        }
        else if (phone[0] != "0") {
            setNotify("Invalid Phone number")
        }
        else if (phone.length < 10) {
            setNotify("Phone need at least 10 char")
        }
        else {
            navigation.navigate(screenName.otpSignUp, { phone: phone })
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        }}
            accessible={false}>
            <View style={styles.container}>
                <ImageBackground
                    style={styles.salonLogo}
                    source={img.logoSalon}
                />
                <Text style={styles.txt}>Create your new Account</Text>
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
                    onSubmitEditing={() => handleCreateAccount()}
                />
                <TouchableOpacity
                    style={styles.btn}
                    onPress={handleCreateAccount}>
                    <Text style={styles.txtBtn}>CREATE ACCOUNT</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => navigation.navigate(screenName.signIn)}>
                    <Text style={styles.txtBtn}>GO BACK</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 4,
        backgroundColor: clor.white,
        padding: scale(20),
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
        paddingHorizontal: scale(8),
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
    txt: {
        color: clor.grayLight,
        fontSize: sizeTxt,
        fontWeight: "bold",
        marginVertical: marginVerticalItem,
    },
    txtBtn: {
        fontWeight: "bold",
        fontSize: sizeTxt,
        color: clor.white,
    },
    txtNotify: {
        fontSize: sizeTxt,
        color: clor.green
    }
});
