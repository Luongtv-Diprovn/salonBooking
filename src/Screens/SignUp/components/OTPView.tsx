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
    Alert
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { screenName } from "../../../navigators/screens-name"
import { scale } from "../../../shared/normalize"
import { onChangedNumber } from "../../../shared/Function/handle"
import { img } from "../../../asset/index"
import { responsive } from "../../../shared/responsive"
import { clor } from "../../../shared/color"
import { useRoute } from "@react-navigation/native"
import { CreateRandomPass } from "../../../shared/Function/handle"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { SpamOTP } from "../../../shared/Interface"
import dayjs from "dayjs"
import auth from "@react-native-firebase/auth"

const heightItem = scale(60)
const marginVerticalItem = scale(12)
const sizeTxt = scale(14)
const sizeOTP = scale(40)
const time_counter = 40
const chanceVerifyOtpPerDay = 5
const chanceResendOtpPerday = 3

const checkOnlyDigit = (value: string) => {
    if (value == "1" || value == "2" || value == "3" || value == "4" ||
        value == "5" || value == "6" || value == "7" || value == "8" || value == "9" || value == "0") {
        return true
    }
    return false
}

export default function OTPView() {

    const navigation = useNavigation<any>()
    const receive = useRoute<any>()?.params
    const [counter, setCounter] = useState<number>(time_counter)
    const [counterSpamVerify, setCounterSpam] = useState<number>(0)
    const [counterResend, setCounterResend] = useState<number>(0)
    const [notify, setNotify] = useState<string>("")
    const [otp, setOTP] = useState({ 1: "", 2: "", 3: "", 4: "", 5: "", 6: "" })
    const [confirmVerify, setConfirm] = useState<any>(null)   // If null, no SMS has been sent
    const otpRef1 = useRef<any>()
    const otpRef2 = useRef<any>()
    const otpRef3 = useRef<any>()
    const otpRef4 = useRef<any>()
    const otpRef5 = useRef<any>()
    const otpRef6 = useRef<any>()
    const countDownRef = useRef<any>()

    async function Post_NewAccount(txtPhone: string, txtPass: string) {

        var url = BASE_URL + "/api/v1/customers"
        var account = new FormData()
        account.append("name", "User")
        account.append("phone", txtPhone)
        account.append("password", txtPass)

        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: account
        }).then((response) => {
            if (response.ok) {
                Alert.alert(
                    "New Account",
                    "Your new account:  " + txtPhone + "\n" + "Password:  " + txtPass
                    + "\n" + "Login to change your password ",
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                navigation.navigate(screenName.signIn, {
                                    newPhone: txtPhone,
                                    newPass: txtPass
                                })
                            }
                        },
                    ],
                )
            }
            else if (response.status == 400) {
                setNotify("This phone number already exists!")
            }
            else {
                setNotify("Please check OTP code")
            }
        })
    }

    async function storeLocalSpamCounter(spam: SpamOTP) {
        try {
            const jsonValue = JSON.stringify(spam)
            await AsyncStorage.setItem("@localSpamCounter", jsonValue)
        } catch (e) {

        }
    }

    async function getLocalSpamCounter() {
        try {
            const jsonValue = await AsyncStorage.getItem("@localSpamCounter")
            if (jsonValue !== null) {
                var spam: SpamOTP = JSON.parse(jsonValue)
                if (spam.dateSpam !== dayjs().format("YYYY-MM-DD")) {
                    storeLocalSpamCounter({
                        dateSpam: dayjs().format("YYYY-MM-DD"),
                        numSpam: 0,
                        numResend: 0
                    })
                    setCounterSpam(0)
                    setCounterResend(0)
                }
                else {
                    setCounter(0)
                    setCounterSpam(spam.numSpam)
                    setCounterResend(spam.numResend)
                }
            }
            return null
        } catch (e) {

        }
    }

    async function RequestOTP(phoneNumber: string) {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber)
        setConfirm(confirmation);
    }

    async function confirmOTP() {
        try {
            await confirmVerify.confirm(otp[1] + otp[2] + otp[3] + otp[4] + otp[5] + otp[6])
            Post_NewAccount(receive?.phone, CreateRandomPass(6))
        } catch (error) {
            setNotify("Invalid OTP code")
        }
    }

    const handleVerification = (txtOTP: string) => {

        var newTxtOTP = onChangedNumber(txtOTP)
        if (counterSpamVerify + 1 < chanceVerifyOtpPerDay + 1) {
            setCounterSpam(prev => prev + 1)
            storeLocalSpamCounter({ dateSpam: dayjs().format("YYYY-MM-DD"), numSpam: counterSpamVerify + 1, numResend: counterResend })
            if (counterSpamVerify + 1 === chanceVerifyOtpPerDay) {
                setNotify("Out of chance today, try again in tomorrow")
            }
            else if (counterSpamVerify + 1 === 4) {
                setCounter(0)
                setNotify("You spam more than 3 time, take your chance")
            }
            else if (counterSpamVerify + 1 <= 3) {
                if (newTxtOTP.length == 6) {
                    setNotify("")
                    confirmOTP()
                }
            }
        }
    }

    const handleCountDown = () => {
        countDownRef.current = setInterval(() => setCounter((prev) => prev - 1), 1000)
    }

    const handleDisableVerification = () => {
        if (counter === 0) {
            return true
        }
        return false
    }

    const handleDisableGoBack = () => {
        if (counter === 0) {
            return false
        }
        return true
    }

    const handleDisableResend = () => {
        if (counterResend >= chanceResendOtpPerday) {
            return true
        }
        else if (counterSpamVerify > chanceVerifyOtpPerDay && counter === 0) {
            return true
        }
        else if (counter === 0) {
            return false
        }
        return true
    }

    useEffect(() => {
        handleCountDown()
        getLocalSpamCounter()
    }, [])

    useEffect(() => {
        if (counter <= 0) {
            clearInterval(countDownRef.current)
        }
    }, [counter])

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ImageBackground
                    style={styles.salonLogo}
                    source={img.logoSalon}
                />
                <Text style={styles.txt}>{"Type 6 Digit we send to your phone number \n+84 " + receive?.phone
                    + "\nYou can only spam Verify less than " + chanceVerifyOtpPerDay + " time per day"
                    + "\nAnd have " + chanceResendOtpPerday + " times to resend OTP per day"
                }</Text>
                {
                    notify !== "" ?
                        <Text style={styles.txtNotify}>
                            {notify}
                        </Text>
                        :
                        <></>
                }
                <View style={styles.containerOTPInput}>
                    <TextInput
                        ref={otpRef1}
                        style={styles.OTPInput}
                        maxLength={1}
                        keyboardType={"numeric"}
                        selectionColor={clor.maincolor}
                        onChangeText={text => {
                            if (checkOnlyDigit(text)) {
                                setOTP({ ...otp, 1: text })
                                otpRef2.current.focus()
                            } else {
                                otpRef1.current.focus()
                            }

                        }}
                    />
                    <TextInput
                        ref={otpRef2}
                        style={styles.OTPInput}
                        maxLength={1}
                        keyboardType={"numeric"}
                        selectionColor={clor.maincolor}
                        onChangeText={text => {
                            if (checkOnlyDigit(text)) {
                                setOTP({ ...otp, 2: onChangedNumber(text) })
                                otpRef3.current.focus()
                            } else {
                                otpRef2.current.focus()
                            }

                        }}
                    />
                    <TextInput
                        ref={otpRef3}
                        style={styles.OTPInput}
                        maxLength={1}
                        keyboardType={"numeric"}
                        selectionColor={clor.maincolor}
                        onChangeText={text => {
                            if (checkOnlyDigit(text)) {
                                setOTP({ ...otp, 3: text })
                                otpRef4.current.focus()
                            } else {
                                otpRef3.current.focus()
                            }

                        }}
                    />
                    <TextInput
                        ref={otpRef4}
                        style={styles.OTPInput}
                        maxLength={1}
                        keyboardType={"numeric"}
                        selectionColor={clor.maincolor}
                        onChangeText={text => {
                            if (checkOnlyDigit(text)) {
                                setOTP({ ...otp, 4: text })
                                otpRef5.current.focus()
                            } else {
                                otpRef4.current.focus()
                            }

                        }}
                    />
                    <TextInput
                        ref={otpRef5}
                        style={styles.OTPInput}
                        maxLength={1}
                        keyboardType={"numeric"}
                        selectionColor={clor.maincolor}
                        onChangeText={text => {
                            if (checkOnlyDigit(text)) {
                                setOTP({ ...otp, 5: text })
                                otpRef6.current.focus()
                            } else {
                                otpRef5.current.focus()
                            }
                        }}
                    />
                    <TextInput
                        ref={otpRef6}
                        style={styles.OTPInput}
                        maxLength={1}
                        keyboardType={"numeric"}
                        selectionColor={clor.maincolor}
                        onChangeText={text => {
                            if (checkOnlyDigit(text)) {
                                setOTP({ ...otp, 6: text })
                                text ? otpRef6.current.focus() : otpRef5.current.focus()
                            } else {
                                otpRef6.current.focus()
                            }
                        }}
                    />
                </View>
                <TouchableOpacity
                    style={[styles.btn, { backgroundColor: handleDisableVerification() ? "black" : clor.maincolor, shadowColor: handleDisableVerification() ? "black" : clor.maincolor }]}
                    disabled={handleDisableVerification()}
                    onPress={() => {
                        handleVerification(otp[1] + otp[2] + otp[3] + otp[4] + otp[5] + otp[6])
                    }}>
                    <Text style={styles.txtTitleBTN}>VERIFICATION</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.btn, { backgroundColor: handleDisableGoBack() ? "black" : clor.maincolor, shadowColor: handleDisableGoBack() ? "black" : clor.maincolor }]}
                    disabled={!handleDisableVerification()}
                    onPress={() => navigation.navigate(screenName.signUp)}>
                    <Text style={styles.txtTitleBTN}>GO BACK</Text>
                </TouchableOpacity>
                <View style={styles.viewResend}>
                    <TouchableOpacity
                        disabled={handleDisableResend()}
                        onPress={() => {
                            RequestOTP("+84" + receive?.phone)
                            storeLocalSpamCounter({ dateSpam: dayjs().format("YYYY-MM-DD"), numSpam: counterSpamVerify, numResend: counterResend + 1 })
                            setCounterResend(prev => prev + 1)
                            setNotify("")
                            setCounter(time_counter)
                            handleCountDown()
                        }}>
                        <Text style={[styles.txtNotify, { opacity: handleDisableResend() ? 0.2 : 1, fontWeight: "bold", fontSize: sizeTxt * 1.2 }]}>Resend</Text>
                    </TouchableOpacity>
                    <Text style={[styles.txt, { fontSize: sizeTxt * 1.2 }]}>{" OTP in " + counter + "s"}</Text>
                </View>
            </ScrollView>
        </View>
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
    containerOTPInput: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: marginVerticalItem * 2
    },
    OTPInput: {
        borderWidth: 2,
        borderColor: clor.maincolor,
        height: sizeOTP,
        width: sizeOTP,
        fontSize: sizeOTP * 1 / 3,
        fontWeight: "bold",
        textAlign: "center",
        borderRadius: 10
    },
    viewResend: {
        flexDirection: "row",
        alignSelf: "center",
        marginVertical: marginVerticalItem * 2,
        alignItems: "center"
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
        color: clor.D,
        fontSize: sizeTxt,
        fontWeight: "bold",
        marginVertical: marginVerticalItem,
    },
    txtTitleBTN: {
        fontWeight: "bold",
        fontSize: sizeTxt,
        color: clor.white,
    },
    txtNotify: {
        fontSize: sizeTxt,
        color: clor.green
    }
});
