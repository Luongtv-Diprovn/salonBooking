import { BASE_URL } from "../../../shared/BASE_URL"
import React, { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../../Redux/hookRedux"
import { changeStatusBooking } from "../../../Redux/Slice/userSlice";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Alert
} from "react-native"
import dayjs from "dayjs"
import Review from './Review'
import { Booking } from '../../../shared/Interface'
import { responsive } from '../../../shared/responsive'
import { scale } from '../../../shared/normalize'

interface receiveDetailHistory {
    history: Booking,
    index: number,
    showToast: any,
    onLoading: any
}

function DetailHistory(props: receiveDetailHistory) {
    const user = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch();
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = (status: boolean) => {
        setModalVisible(status);
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


    return (
        <View>
            {
                props.history.status == "Cancel" ?
                    <View style={styles.rowItem}>
                        <View style={styles.viewFlexDirectionRow}>
                            <Text style={styles.txtTitle}>TimeSlot:</Text>
                            <Text style={styles.txtContent}>{props.history.timeSlot}</Text>
                            <View style={styles.viewFlex1} />
                            <Text style={styles.txtTitle}>Date: </Text>
                            <Text style={styles.txtContent}>{dayjs(props.history.date).format("DD-MM-YYYY")}</Text>
                        </View>
                        <View style={styles.viewFlexDirectionRow}>
                            <Text style={styles.txtTitle}>ID Booking: </Text>
                            <Text style={styles.txtContent}>{props.history.Id}</Text>
                        </View>
                        <View style={styles.viewFlexDirectionRow}>
                            <Text style={styles.txtTitle}>Note: </Text>
                            <Text style={styles.txtContent}>{props.history.note}</Text>
                        </View>
                        <View style={styles.viewFlexDirectionRow}>
                            <View style={styles.viewCancel}>
                                <Text style={styles.txtContent}>{props.history.status}</Text>
                            </View>
                        </View>
                        <View style={styles.lineHorizone} />
                    </View>
                    :
                    props.history.status == "Done" ?
                        <View style={styles.rowItem}>
                            <View style={styles.viewFlexDirectionRow}>
                                <Text style={styles.txtTitle}>TimeSlot:</Text>
                                <Text style={styles.txtContent}>{props.history.timeSlot}</Text>
                                <View style={styles.viewFlex1} />
                                <Text style={styles.txtTitle}>Date: </Text>
                                <Text style={styles.txtContent}>{dayjs(props.history.date).format("DD-MM-YYYY")}</Text>
                            </View>
                            <View style={styles.viewFlexDirectionRow}>
                                <Text style={styles.txtTitle}>ID Booking: </Text>
                                <Text style={styles.txtContent}>{props.history.Id}</Text>
                            </View>
                            <Text style={styles.txtTitle}>Note: </Text>
                            {
                                props.history.note !== "" ?
                                    <Text style={styles.txtContent}>{props.history.note}</Text>
                                    :
                                    <></>
                            }
                            <View style={styles.viewFlexDirectionRow}>
                                <Text style={styles.txtTitle}>Discount by Rank: </Text>
                                <Text style={styles.txtContent}>
                                    {
                                        props.history.customer.customerType.percent + "%"
                                    }
                                </Text>
                            </View>
                            <View style={styles.viewFlexDirectionRow}>
                                <Text style={styles.txtTitle}>Discount by Voucher: </Text>
                                <Text style={styles.txtContent}>
                                    {
                                        props.history.advertisement != null ? props.history.advertisement.discount + "%" : "0%"
                                    }
                                </Text>
                            </View>
                            <Text style={styles.txtTitle}>Services: </Text>
                            {
                                props.history.details.map((item, index) => {
                                    return (
                                        <View key={index} style={styles.viewServiceDone}>
                                            <Text style={styles.txtContent}>{item.service.name}</Text>
                                            <Text style={styles.txtContent}>{"Price: " + Number(item.service.price).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</Text>
                                        </View>)
                                })
                            }
                            <>
                                {
                                    props.history.rate != null ?
                                        <View style={styles.viewFlexDirectionRow}>
                                            <View style={styles.viewDone}>
                                                <Text style={styles.txtContent}>{props.history.status}</Text>
                                            </View>
                                            <View style={styles.viewFlex1} />
                                            <TouchableOpacity style={styles.viewDone}
                                                onPress={() => {
                                                    setModalVisible(!isModalVisible)
                                                }}>
                                                <Text style={styles.txtContent}>Watch review</Text>
                                            </TouchableOpacity>
                                            <Review
                                                existReview={true}
                                                history={props.history}
                                                isModalVisible={isModalVisible}
                                                showToast={(type, text1, txt) => { props.showToast(type, text1, txt) }}
                                                onLoading={(loading) => { props.onLoading(loading) }}
                                                toggleModal={(status) => { toggleModal(status) }} />

                                        </View>
                                        :
                                        <View style={styles.viewFlexDirectionRow}>
                                            <View style={styles.viewDone}>
                                                <Text style={styles.txtContent}>{props.history.status}</Text>
                                            </View>
                                            <View style={styles.viewFlex1} />
                                            <TouchableOpacity style={styles.viewDone}
                                                onPress={() => {
                                                    setModalVisible(!isModalVisible)
                                                }}>
                                                <Text style={styles.txtContent}>Review</Text>
                                            </TouchableOpacity>
                                            <Review
                                                existReview={false}
                                                history={props.history}
                                                isModalVisible={isModalVisible}
                                                showToast={(type, text1, txt) => { props.showToast(type, text1, txt) }}
                                                onLoading={(loading) => { props.onLoading(loading) }}
                                                toggleModal={(status) => { toggleModal(status) }} />
                                        </View>
                                }
                            </>
                            <View style={styles.lineHorizone} />
                        </View>
                        :
                        props.history.status == "Confirm" ?
                            <View style={styles.rowItem}>
                                <View style={styles.viewFlexDirectionRow}>
                                    <Text style={styles.txtTitle}>TimeSlot:</Text>
                                    <Text style={styles.txtContent}>{props.history.timeSlot}</Text>
                                    <View style={styles.viewFlex1} />
                                    <Text style={styles.txtTitle}>Date: </Text>
                                    <Text style={styles.txtContent}>{dayjs(props.history.date).format("DD-MM-YYYY")}</Text>
                                </View>
                                <View style={styles.viewFlexDirectionRow}>
                                    <Text style={styles.txtTitle}>ID Booking: </Text>
                                    <Text style={styles.txtContent}>{props.history.Id}</Text>
                                </View>
                                <Text style={styles.txtTitle}>Note: </Text>
                                {
                                    props.history.note !== "" ?
                                        <Text style={styles.txtContent}>{props.history.note}</Text>
                                        :
                                        <></>
                                }
                                <View style={styles.viewFlexDirectionRow}>
                                    <Text style={styles.txtTitle}>Discount by Rank: </Text>
                                    <Text style={styles.txtContent}>
                                        {
                                            props.history.customer.customerType.percent + "%"
                                        }
                                    </Text>
                                </View>
                                <View style={styles.viewFlexDirectionRow}>
                                    <Text style={styles.txtTitle}>Discount by Voucher: </Text>
                                    <Text style={styles.txtContent}>
                                        {
                                            props.history.advertisement != null ? props.history.advertisement.discount + "%" : "0%"
                                        }
                                    </Text>
                                </View>
                                <Text style={styles.txtTitle}>Services: </Text>
                                {
                                    props.history.details.map((item, index) => {
                                        return (
                                            <View key={index} style={styles.viewServiceConfirm}>
                                                <Text style={styles.txtContent}>{item.service.name}</Text>
                                                <Text style={styles.txtContent}>{"Price: " + Number(item.service.price).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</Text>
                                            </View>)
                                    })
                                }
                                <View style={styles.viewFlexDirectionRow}>
                                    <View style={styles.viewConfirm}>
                                        <Text style={styles.txtContent}>{props.history.status} </Text>
                                    </View>
                                    <View style={styles.viewFlex1} />
                                    <TouchableOpacity
                                        style={styles.btnDelete}
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
                                        <Text style={styles.txtContent}>Cancel booking</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.lineHorizone} />
                            </View>
                            :
                            props.history.status == "Pending" ?
                                <View style={styles.rowItem}>
                                    <View style={styles.viewFlexDirectionRow}>
                                        <Text style={styles.txtTitle}>TimeSlot:</Text>
                                        <Text style={styles.txtContent}>{props.history.timeSlot}</Text>
                                        <View style={styles.viewFlex1} />
                                        <Text style={styles.txtTitle}>Date: </Text>
                                        <Text style={styles.txtContent}>{dayjs(props.history.date).format("DD-MM-YYYY")}</Text>
                                    </View>
                                    <View style={styles.viewFlexDirectionRow}>
                                        <Text style={styles.txtTitle}>ID Booking: </Text>
                                        <Text style={styles.txtContent}>{props.history.Id}</Text>
                                    </View>
                                    <View style={styles.viewFlexDirectionRow}>
                                        <Text style={styles.txtTitle}>Note: </Text>
                                        <Text style={styles.txtContent}>{props.history.note}</Text>
                                    </View>
                                    <Text style={styles.txtTitle}>Services: </Text>
                                    {
                                        props.history.details.map((item, index) => {
                                            return (
                                                <View key={index} style={styles.viewServicePending}>
                                                    <Text style={styles.txtContent}>{item.service.name}</Text>
                                                    <Text style={styles.txtContent}>{"Price: " + Number(item.service.price).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</Text>
                                                </View>)
                                        })
                                    }
                                    <View style={styles.viewFlexDirectionRow}>
                                        <View style={styles.viewPending}>
                                            <Text style={styles.txtContent}>{props.history.status} </Text>
                                        </View>
                                        <View style={styles.viewFlex1} />
                                        <TouchableOpacity
                                            style={styles.btnDelete}
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
                                            }}
                                        >
                                            <Text style={styles.txtContent}>Cancel booking</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.lineHorizone} />
                                </View>
                                :
                                <></>
            }
        </View>
    )
}

export default DetailHistory

const styles = StyleSheet.create({
    lineHorizone: {
        borderWidth: 0.75,
        borderColor: "black",
        marginVertical: scale(10),
    },
    viewFlex1: {
        flex: 1
    },
    viewFlexDirectionRow: {
        flexDirection: "row"
    },
    txtContent: {
        fontSize: scale(15),
        fontWeight: "bold",
        marginHorizontal: scale(10),
    },
    txtTitle: {
        fontSize: scale(15),
        color: "#9CA1A3"
    },
    rowItem: {
        flexDirection: "column",
        width: "100%",
        paddingHorizontal: scale(10)
    },
    viewConfirm: {
        backgroundColor: "#FFCE26",
        borderRadius: 5,
        padding: scale(3),
    },
    viewCancel: {
        backgroundColor: "#909399",
        borderRadius: 5,
        padding: scale(3),
    },
    viewPending: {
        backgroundColor: "#FD7238",
        borderRadius: 5,
        padding: scale(3),
    },
    viewDone: {
        backgroundColor: "#3C91E6",
        borderRadius: 5,
        padding: scale(3),
    },
    viewServiceDone: {
        borderWidth: 1,
        padding: scale(6),
        marginBottom: scale(6),
        borderRadius: 10,
        borderColor: "#3C91E6",
        alignSelf: "baseline"
    },
    viewServiceConfirm: {
        borderWidth: 1,
        padding: scale(6),
        marginBottom: scale(6),
        borderRadius: 10,
        borderColor: "#FFCE26",
        alignSelf: "baseline"
    },
    viewServicePending: {
        borderWidth: 1,
        padding: scale(6),
        marginBottom: 6,
        borderRadius: 10,
        borderColor: "#FD7238",
        alignSelf: "baseline"
    },
    btnDelete: {
        backgroundColor: "orange",
        borderRadius: 5,
        padding: scale(3),
    }
});
