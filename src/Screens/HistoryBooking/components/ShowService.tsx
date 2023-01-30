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
import { Booking } from "../../../shared/Interface"
import { clor } from '../../../shared/color'

interface receive {
    history: Booking
    isModalVisible: boolean
    toggleModal: any
}

const sizeTxt = scale(16)

function ShowService(props: receive) {


    return (
        <Modal
            isVisible={props.isModalVisible}
            useNativeDriver={true}>
            <View style={styles.viewModal}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.viewTop}>
                        <Text style={styles.txtTitletDetail}>DETAIL BOOKING</Text>
                        <View style={styles.viewFlex1} />
                        <TouchableOpacity
                            onPress={() => { props.toggleModal(false) }}
                            style={styles.btnClose}
                        >
                            <Text style={styles.txtClose}>X</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.txtTitle}>Discount by Rank:
                        <Text style={styles.txtContent}>
                            {
                                " " + props.history.customer.customerType.percent + "%"
                            }
                        </Text>
                    </Text>

                    <Text style={styles.txtTitle}>Discount by voucher:
                        <Text style={styles.txtContent}>
                            {
                                props.history.advertisement != null ? " " + props.history.advertisement.discount + "%" : " 0%"
                            }</Text>
                    </Text>
                    <Text style={styles.txtTitle}>Services:</Text>
                    {
                        props.history.details.map((item, index) => {
                            return (
                                <View key={index}>
                                    <Text style={styles.txtContent}>{item.service.name}</Text>
                                    <Text style={styles.txtContent}>{"Price " + Number(item.service.price).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</Text>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        </Modal>
    )
}

export default ShowService

const styles = StyleSheet.create({

    txtInputReview: {
        alignSelf: "center",
        width: "100%",
        borderWidth: 2,
        borderColor: clor.A,
        borderRadius: 5,
        paddingLeft: scale(10),
        marginBottom: scale(12),
        flexGrow: 1
    },
    txtClose: {
        fontSize: sizeTxt,
        color: "white"
    },
    txtReview: {
        fontSize: sizeTxt,
        color: "black"
    },
    viewTop: {
        flexDirection: "row"
    },

    viewFlex1: {
        flex: 1
    },

    btnClose: {
        backgroundColor: "red",
        padding: scale(5),
        borderRadius: 5
    },

    txtTitletDetail: {
        fontWeight: "bold",
        alignSelf: "center",
        fontSize: sizeTxt * 1.2,
        color: clor.A
    },
    txtTitle: {
        fontSize: sizeTxt,
        color: clor.grayForTxt
    },
    txtContent: {
        fontSize: sizeTxt,
        fontWeight: "bold",
        marginHorizontal: scale(10),
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

