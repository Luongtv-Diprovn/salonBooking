import React from "react"
import { View, StyleSheet, Text } from "react-native";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/Ionicons"
import Icon1 from "react-native-vector-icons/Feather"
import { responsive } from "../../shared/responsive"
import { scale } from "../../shared/normalize"
import { clor } from "../../shared/color"

const sizeIcon = scale(35)

export const toastConfig: any = {

    Success: ({ text1 }) => (
        <View style={styles.containerToast}>
            <Icon name="checkmark-done-circle" color={clor.white} size={sizeIcon} />
            <Text style={styles.txtOneLine}>{text1}</Text>
        </View>
    ),
    SuccessTwoLine: ({ text1, props }) => (
        <View style={styles.containerToast}>
            <Icon name="checkmark-done-circle" color={clor.white} size={sizeIcon} />
            <View>
                <Text style={styles.txtOneLine}>{text1}</Text>
                <Text style={styles.txtTwoLine}>{props.txt}</Text>
            </View>
        </View>
    ),
    Fail: ({ text1 }) => (
        <View style={styles.containerToast}>
            <Icon1 name="alert-circle" color={clor.white} size={sizeIcon} />
            <Text style={styles.txtOneLine}>{text1}</Text>
        </View>
    ),
    FailTwoLine: ({ text1, props }) => (
        <View style={styles.containerToast}>
            <Icon1 name="alert-circle" color={clor.white} size={sizeIcon} />
            <View>
                <Text style={styles.txtOneLine}>{text1}</Text>
                <Text style={styles.txtTwoLine}>{props.txt}</Text>
            </View>
        </View>
    ),

    Warning: ({ text1, props }) => (
        <View style={styles.containerToast}>
            <Icon1 name="alert-triangle" color={clor.white} size={sizeIcon} />
            <Text style={[styles.txtAlert, { fontSize: props.size !== null && props.size !== undefined ? props.size : 12 }]}>{text1}</Text>
        </View>
    )
};

export const showToast = (type: string, text1: string, text?: string, size?: number) => {
    Toast.show({
        visibilityTime: 4000,
        type: type,
        text1: text1,
        props: { txt: text, size: size }
    })
}


const styles = StyleSheet.create({
    containerToast: {
        flexDirection: "row",
        height: responsive.height(80),
        width: responsive.WIDTH * 0.9,
        backgroundColor: clor.D,
        borderRadius: 10,
        alignItems: "center",
        paddingHorizontal: scale(10)
    },
    txtOneLine: {
        fontSize: scale(20),
        color: clor.white,
        marginLeft: scale(10),
        flexShrink: 1
    },
    txtTwoLine: {
        fontSize: scale(14),
        color: clor.white,
        marginLeft: scale(10),
        flexShrink: 1
    },
    txtAlert: {
        color: clor.white,
        marginLeft: scale(10),
        flex: 1
    }
});