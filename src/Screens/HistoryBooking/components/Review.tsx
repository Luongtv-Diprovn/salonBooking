import { BASE_URL } from "../../../shared/BASE_URL"
import React, { useState } from "react"
import { useAppSelector, useAppDispatch } from "../../../Redux/hookRedux"
import { changeStatusBooking } from "../../../Redux/Slice/userSlice";
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Button,
    TextInput,
    Image
} from "react-native"
import { img } from "../../../asset/index"
import Modal from "react-native-modal"
import { scale } from "../../../shared/normalize"
import { responsive } from "../../../shared/responsive"
import { Booking, Rate } from "../../../shared/Interface"
import { clor } from "../../../shared/color"
interface receiveRating {
    userStarRate?: number,
    existReview: boolean,
    getRate: any
}

function Rating(props: receiveRating) {
    const [defaultRating, setDefaultRating] = useState<number>(props.userStarRate !== undefined ? props.userStarRate : 3)
    const maxRating = [1, 2, 3, 4, 5]

    return (
        <View style={{ flexDirection: "row" }}>
            {
                maxRating.map((item) => {
                    return (
                        <TouchableOpacity
                            key={item}
                            disabled={props.existReview}
                            onPress={() => {
                                props.getRate(defaultRating)
                                setDefaultRating(item)
                            }}>
                            <Image source={item <= defaultRating ? img.starFill : img.starUnFill}
                                style={styles.imgStarRating}
                            />
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

interface receiveReview {
    existReview: boolean,
    history: Booking,
    isModalVisible: any,
    showToast: any,
    onLoading: any,
    toggleModal: any
}

function Review(props: receiveReview) {
    const user = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()
    const [review, setReview] = useState("")
    const [rate, setRate] = useState(4)
    function getRate(star) {
        setRate(star)
    }
    async function Post_Rate() {
        var url = BASE_URL + "/api/v1/rates"
        await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + user.userProperties.Token.token,
                "Content-Type": "application/json"
            },
            body:
                JSON.stringify({
                    "rate": rate,
                    "comment": review,
                    "bookingId": props.history.Id,
                }),
        }).then((response) => {
            if (response.ok) {
                props.showToast("Success", "Save Review Success")
            }
            else {
                props.showToast("FailTwoLine", "Fail", "Somethingwrong, Please try again")
            }
        })
        props.onLoading(false)
        dispatch(changeStatusBooking(!user.userProperties.statusBooking))
    }
    return (
        <Modal
            isVisible={props.isModalVisible}
            useNativeDriver={true}>
            <>
                {
                    props.existReview ?
                        <View style={styles.viewModal}>
                            <View style={styles.viewTop}>
                                <Text style={styles.txtTitle}>YOUR REVIEW</Text>
                                <View style={styles.viewFlex1} />
                                <TouchableOpacity
                                    onPress={() => { props.toggleModal(false) }}
                                    style={styles.btnClose}
                                >
                                    <Text style={styles.txtClose}>X</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.viewMiddle}>
                                <Image source={img.barberConfirm}
                                    style={styles.avatar}
                                />
                                <View style={styles.viewRatingAndName}>
                                    <Rating
                                        existReview={true}
                                        userStarRate={props.history.rate?.rate}
                                        getRate={(star) => { getRate(star) }}
                                    />
                                    <Text style={styles.txtName}>Stylist: {props.history.staff.name}</Text>
                                </View>
                            </View>

                            <View style={styles.viewUserReview}>
                                <ScrollView style={styles.scrollView}>
                                    <Text style={styles.txtReview}>{props.history.rate?.comment}</Text>
                                </ScrollView>
                            </View>
                        </View>
                        :
                        <View style={styles.viewModal}>
                            <View style={styles.viewTop}>
                                <Text style={styles.txtTitle}> REVIEW AND RATING</Text>
                                <View style={styles.viewFlex1} />
                                <TouchableOpacity
                                    onPress={() => { props.toggleModal(false) }}
                                    style={styles.btnClose}
                                >
                                    <Text style={styles.txtClose}>X</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.viewMiddle}>
                                <Image source={img.barberConfirm}
                                    style={styles.avatar}
                                />
                                <View style={styles.viewRatingAndName}>
                                    <Rating
                                        existReview={false}
                                        userStarRate={4}
                                        getRate={(star) => { getRate(star) }}
                                    />
                                    <Text style={styles.txtName}>Stylist: {props.history.staff.name}</Text>
                                </View>
                            </View>
                            <TextInput
                                onChangeText={(text) => { setReview(text) }}
                                multiline={true}
                                selectionColor={clor.maincolor}
                                maxLength={500}
                                style={styles.txtInputReview} />
                            <Button
                                title="Save"
                                color={clor.maincolor}
                                onPress={() => {
                                    props.onLoading(true)
                                    Post_Rate()
                                    props.toggleModal(false)
                                }}
                            />
                        </View>
                }
            </>
        </Modal>
    )
}

export default Review

const styles = StyleSheet.create({

    txtInputReview: {
        alignSelf: "center",
        width: "100%",
        borderWidth: 2,
        borderColor: clor.maincolor,
        borderRadius: 5,
        paddingLeft: scale(10),
        marginBottom: scale(12),
        flexGrow: 1
    },
    txtClose: {
        fontSize: scale(16),
        color: "white"
    },
    txtReview: {
        fontSize: scale(16),
        color: clor.blackForTxt
    },
    viewTop: {
        flexDirection: "row"
    },
    viewMiddle: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: scale(10)
    },
    viewFlex1: {
        flex: 1
    },
    scrollView: {
        paddingHorizontal: scale(10)
    },
    btnClose: {
        backgroundColor: "red",
        padding: scale(5),
        borderRadius: 5
    },
    viewUserReview: {
        width: "100%",
        borderWidth: 2,
        borderColor: clor.maincolor,
        borderRadius: 10,
        flexShrink: 1,
        flexGrow: 1
    },
    viewRatingAndName: {
        flexDirection: "column",
        justifyContent: "center",
        paddingHorizontal: scale(10)
    },
    avatar: {
        height: responsive.width(80),
        width: responsive.width(80),
        marginHorizontal: scale(10),
        borderRadius: 40
    },
    txtName: {
        fontSize: scale(18),
        fontWeight: "bold",
        color: clor.D
    },
    txtTitle: {
        fontWeight: "bold",
        alignSelf: "center",
        fontSize: scale(18),
        color: clor.A
    },
    imgStarRating: {
        height: scale(20),
        width: scale(20),
        marginLeft: scale(5)
    },
    viewModal: {
        height: responsive.height(400),
        width: responsive.WIDTH * 0.8,
        alignSelf: "center",
        backgroundColor: "white",
        padding: scale(10),
        borderRadius: 15
    }
});

