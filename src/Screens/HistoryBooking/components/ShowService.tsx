import React from "react"
import Icon2 from "react-native-vector-icons/MaterialIcons"
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity
} from "react-native"
import Modal from "react-native-modal"
import { scale } from "../../../shared/normalize"
import { responsive } from "../../../shared/responsive"
import { Booking } from "../../../shared/Interface"
import { clor } from "../../../shared/color"
import { TotalMoney1 } from "../../../shared/Function/handle"

interface receive {
    history: Booking
    isModalVisible: boolean
    toggleModal: any
}

const sizeTxt = scale(16)
const paddingContainer = scale(10)

function ShowService(props: receive) {

    const MoneyForAll = TotalMoney1(props.history.details, props.history.customer.customerType.percent, props.history.advertisement)
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
                                    <Text style={styles.txtContent}>{"+ " + item.service.name}</Text>
                                    <Text style={styles.txtContent}>{"Price " + Number(item.service.price).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</Text>
                                </View>
                            )
                        })
                    }
                </ScrollView>
                <View style={styles.viewTotalMoney}>
                    <Icon2 name={"monetization-on"} size={scale(22)} color={clor.greenDark} />
                    <Text style={styles.txtTotalMoney}>
                        {
                            ((props.history.customer.customerType.percent !== 0) || (props.history.advertisement !== null)) ?
                                "(without discount): " + Number(MoneyForAll.AllMoneyNoDiscountByRankOrVoucher).toLocaleString("vi-VN", { style: "currency", currency: "VND" }) + "\n"
                                + "(discount): " + Number(MoneyForAll.AllMoney).toLocaleString("vi-VN", { style: "currency", currency: "VND" })
                                :
                                Number(MoneyForAll.AllMoney).toLocaleString("vi-VN", { style: "currency", currency: "VND" })
                        }
                    </Text>
                </View>
            </View>
        </Modal>
    )
}

export default ShowService

const styles = StyleSheet.create({
    txtClose: {
        fontSize: sizeTxt,
        color: "white"
    },
    viewTop: {
        flexDirection: "row"
    },
    viewFlex1: {
        flex: 1
    },
    viewTotalMoney: {
        flexDirection: "row",
        justifyContent: "center",
        borderTopWidth: 1,
        borderColor: clor.greenDark,
        paddingTop: paddingContainer
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
    txtTotalMoney: {
        fontSize: sizeTxt,
        color: clor.greenDark,
        marginLeft: scale(5)
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
        padding: paddingContainer,
        borderRadius: 15
    }
});

