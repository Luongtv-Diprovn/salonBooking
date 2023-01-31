import { BASE_URL } from "../../../shared/BASE_URL"
import React, { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../../Redux/hookRedux"
import { changeStatusBooking } from "../../../Redux/Slice/userSlice"
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Alert,
    Image
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { screenName } from "../../../navigators/screens-name"
import dayjs from "dayjs"
import Review from "./Review"
import Icon from "react-native-vector-icons/AntDesign"
import { Booking } from "../../../shared/Interface"
import { responsive } from "../../../shared/responsive"
import { scale } from "../../../shared/normalize"
import { clor } from "../../../shared/color"
import { img } from "../../../asset/index"
import { s } from "../../../shared/normalize"
import ShowService from "./ShowService"

interface receiveDetailHistory {
    history: Booking,
    index: number,
    showToast: any,
    onLoading: any
}

const sizeIMG = s(100)
const paddingViewItem = 10
const sizeTxt = s(20)




function DetailHistory(props: receiveDetailHistory) {

    const navigation = useNavigation<any>()
    const user = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch();
    const [isModalVisibleService, setModalVisibleService] = useState<boolean>(false);
    const toggleModalService = (status: boolean) => {
        setModalVisibleService(status);
    };
    const [isModalVisibleReview, setModalVisibleReview] = useState<boolean>(false);
    const toggleModalReview = (status: boolean) => {
        setModalVisibleReview(status);
    };

    async function CancelBooking(id_booking) {
        var url = BASE_URL + "/api/v1/bookings/" + id_booking
        await fetch(url, {
            method: "PATCH",
            headers: {
                "Authorization": "Bearer " + user.userProperties.Token.token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "status": "Cancel"
            })
        })
            .then((response) => {
                if (response.ok) {
                    props.showToast("Success", "Cancel Booking Success")
                }
                else {
                    props.showToast("Fail", "Cancel Booking Fail")
                }
            })
        dispatch(changeStatusBooking(!user.userProperties.statusBooking))
        props.onLoading(false);
    };

    const checkStatusReturnColorTxt = () => {
        if (props.history.status == "Confirm") {
            return clor.green
        }
        else if (props.history.status == "Pending") {
            return "red"
        }
        else if (props.history.status == "Done") {
            return "blue"
        }
        else if (props.history.status == "Cancel") {
            return clor.blackForTxt
        }
    }

    const checkStatusBookingReturnView = () => {
        if (props.history.status == "Confirm" || props.history.status == "Pending") {
            return (
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        Alert.alert("OOPS !!!", "Are you sure to cancel appointment?", [
                            {
                                text: "OK",
                                onPress: () => {
                                    props.onLoading(true)
                                    CancelBooking(props.history.Id)
                                },
                            },
                            {
                                text: "cancel",
                                style: "cancel",
                            },
                        ]);
                    }}>

                    <Text style={styles.txtButton}>CANCEL BOOKING</Text>
                </TouchableOpacity>
            )
        } else if (props.history.status == "Done") {
            return (
                <>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => toggleModalReview(true)}>
                        <Text style={styles.txtButton}>{props.history.rate !== null ? "WATCH REVIEW" : "REVIEW"}</Text>
                    </TouchableOpacity>
                    <Review
                        existReview={props.history.rate != null ? true : false}
                        history={props.history}
                        isModalVisible={isModalVisibleReview}
                        showToast={(type, text1, txt) => { props.showToast(type, text1, txt) }}
                        onLoading={(loading) => { props.onLoading(loading) }}
                        toggleModal={(status) => { toggleModalReview(status) }} />
                </>
            )
        }
        else if (props.history.status == "Cancel") {
            return (
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => navigation.navigate(screenName.booking)}>
                    <Text style={styles.txtButton}>BOOKING AGAIN</Text>
                </TouchableOpacity>
            )
        }
    }

    return (

        <View style={styles.viewItem}>
            <View style={styles.viewTop}>
                <Text style={styles.txtContent}> {"IDBOOKING " + props.history.Id}</Text>
                <Text style={styles.txtContent}>
                    <Icon name="calendar" color={clor.white} size={sizeTxt} />
                    {" " + dayjs(props.history.date).format("DD-MM-YYYY") + ", " + props.history.timeSlot}
                </Text>
                <TouchableOpacity
                    style={styles.iconDetail}
                    onPress={() => toggleModalService(true)}>
                    <Icon name="infocirlce" color={clor.white} size={sizeIMG / 3} />
                </TouchableOpacity>
            </View>
            <View style={styles.viewBottom}>
                <View style={styles.containerImgName}>
                    <Image
                        style={styles.img}
                        source={img.ava} />
                    <Text style={styles.txtName}>{props.history.staff.name}</Text>
                    <View style={styles.viewFlex1} />
                </View>
                <View style={styles.containerStatusButton}>
                    <Text style={[styles.txtContent, { color: checkStatusReturnColorTxt() }]}>{"STATUS: " + props.history.status} </Text>
                    <View style={styles.viewFlex1} />
                    {
                        checkStatusBookingReturnView()
                    }
                </View>
                <ShowService history={props.history} isModalVisible={isModalVisibleService} toggleModal={(status: boolean) => toggleModalService(status)} />
            </View>
        </View>

    )
}

export default DetailHistory

const styles = StyleSheet.create({
    viewItem: {
        flexDirection: "column",
        width: responsive.WIDTH * 0.9,
        alignSelf: "center",
        marginBottom: scale(50),
    },
    viewFlex1: {
        flex: 1
    },
    viewTop:
    {
        flex: 1,
        backgroundColor: clor.maincolor,
        borderTopLeftRadius: 40,
        padding: paddingViewItem,
        shadowColor: "red",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    viewBottom: {
        flex: 2,
        backgroundColor: clor.D,
        borderBottomRightRadius: 40,
        padding: paddingViewItem,
        shadowColor: "red",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    img: {
        height: sizeIMG,
        width: sizeIMG,
        borderRadius: sizeIMG / 4,
        borderWidth: 4,
        borderColor: clor.white,
        marginRight: scale(15)
    },
    iconDetail: {
        position: "absolute",
        top: 10,
        right: 10
    },
    containerImgName: {
        flexDirection: "row",
        alignItems: "center"
    },
    containerStatusButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    txtName: {
        fontSize: scale(20),
        fontWeight: "bold",
        color: clor.white
    },
    txtContent: {
        fontSize: scale(15),
        fontWeight: "bold",
        color: clor.white,
    },
    txtTitle: {
        fontSize: scale(15),
        color: "#9CA1A3"
    },
    txtButton: {
        fontSize: scale(15),
        fontWeight: "bold",
        color: clor.maincolor,
    },
    btn: {
        justifyContent: "center",
        alignItems: "center",
        padding: scale(10),
        backgroundColor: clor.white,
        borderRadius: 40
    }

});
