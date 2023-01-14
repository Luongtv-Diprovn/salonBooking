
import { BASE_URL } from "../../../shared/BASE_URL"
import { View, StyleSheet, TextInput, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useState, useEffect, memo } from "react";
import { Advertisement } from "../../../shared/Interface"
import { responsive } from "../../../shared/responsive"
import { scale } from "../../../shared/normalize"
import { clor } from '../../../shared/color'

function Voucher(props) {

    const [voucherCode, setVoucherCode] = useState<string>("")
    const [data, setData] = useState<Advertisement[]>([])
    const [loading, setloading] = useState<Boolean>(false)
    const [notify, setNotify] = useState<string>("")

    async function Get_Vouchers() {
        setloading(true)
        var url = BASE_URL + "/api/v1/advertisements"
        await fetch(url, {
            method: "GET",
        }).then((response) => {
            if (response.status == 200) {
                Promise.resolve(response.json())
                    .then((value) => {
                        setData(value)
                    });
            }
            else {
                setNotify("This Voucher not available")
                props.onApplyVoucher(null)
            }
        })
        setloading(false);
    }

    const checkExistVoucher = () => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].amount > 0 && data[i].voucherCode === voucherCode) {
                setNotify("Apply Voucher, you have been discount " + data[i].discount + "%")
                props.onApplyVoucher(data[i])
                break
            } else {
                setNotify("This Voucher out of stock")
                props.onApplyVoucher(null)
            }

        }
    }

    useEffect(() => {
        Get_Vouchers()
    }, [])

    useEffect(() => {
        props.onApplyVoucher(null)
    }, [props.statusBooking])


    return (
        <>
            {loading ?
                <ActivityIndicator color={clor.maincolor} size={40} style={styles.indicator} />
                :
                <View style={styles.container}>
                    <View style={styles.rowItem}>
                        <TextInput
                            style={styles.textArea}
                            underlineColorAndroid="transparent"
                            placeholderTextColor="grey"
                            maxLength={30}
                            value={voucherCode}
                            onChangeText={(text) => {
                                setVoucherCode(text)
                            }}
                        />
                        <TouchableOpacity
                            style={styles.btnVoucher}
                            onPress={checkExistVoucher}>
                            <Text style={styles.txtBTN}>Apply Voucher</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.txtNotify}>{notify}</Text>
                </View>
            }
        </>
    )
}
export default memo(Voucher)

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: scale(10)
    },
    indicator: {
        alignSelf: "center"
    },
    textArea: {
        borderColor: clor.B,
        borderWidth: 4,
        paddingHorizontal: 10,
        marginRight: scale(5),
        borderRadius: 5,
        width: responsive.WIDTH * 0.6,
        flexShrink: 1
    },
    txtNotify: {
        fontSize: scale(14),
        color: clor.C,
        fontWeight: "bold"
    },
    rowItem: {
        width: "100%",
        justifyContent: "center",
        flexDirection: "row",
        marginVertical: 10
    },
    btnVoucher: {
        borderRadius: 5,
        backgroundColor: clor.maincolor,
        alignItems: "center",
        justifyContent: "center",
        padding: scale(10)
    },
    txtBTN: {
        color: "white",
        fontSize: scale(16),
        fontWeight: "bold"
    }

})


