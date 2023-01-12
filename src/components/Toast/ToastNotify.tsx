import React from "react"
import { View, StyleSheet, Text } from "react-native";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/Ionicons"
import Icon1 from "react-native-vector-icons/Feather"
import { responsive } from '../../shared/responsive'
import { scale } from '../../shared/normalize'

export const toastConfig: any = {

    Success: ({ text1 }) => (
        <View style={styles.containerToast}>
            <Icon name="checkmark-done-circle" color={"white"} size={scale(35)} />
            <Text style={styles.txtOneLine}>{text1}</Text>
        </View>
    ),
    SuccessTwoLine: ({ text1, props }) => (
        <View style={styles.containerToast}>
            <Icon name="checkmark-done-circle" color={"white"} size={scale(35)} />
            <View>
                <Text style={styles.txtOneLine}>{text1}</Text>
                <Text style={styles.txtTwoLine}>{props.txt}</Text>
            </View>
        </View>
    ),
    Fail: ({ text1 }) => (
        <View style={[styles.containerToast, { backgroundColor: "tomato" }]}>
            <Icon1 name="alert-circle" color={"white"} size={scale(35)} />
            <Text style={styles.txtOneLine}>{text1}</Text>
        </View>
    ),
    FailTwoLine: ({ text1, props }) => (
        <View style={[styles.containerToast, { backgroundColor: "tomato" }]}>
            <Icon1 name="alert-circle" color={"white"} size={scale(35)} />
            <View>
                <Text style={styles.txtOneLine}>{text1}</Text>
                <Text style={styles.txtTwoLine}>{props.txt}</Text>
            </View>
        </View>
    ),

    Warning: ({ text1, props }) => (
        <View style={[styles.containerToast, { backgroundColor: "#E6B82E" }]}>
            <Icon1 name="alert-triangle" color={"white"} size={scale(35)} />
            <Text style={[styles.txtAlert, { fontSize: props.size !== null && props.size !== undefined ? props.size : 12 }]}>{text1}</Text>
        </View>
    )
};

export const showToast = (type: any, text1: any, text?: any, size?: number) => {
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
        backgroundColor: "green",
        borderRadius: 10,
        alignItems: "center",
        paddingHorizontal: scale(10)
    },
    txtOneLine: {
        fontSize: scale(20),
        color: "white",
        marginLeft: scale(10),
        flexShrink: 1
    },
    txtTwoLine: {
        fontSize: scale(14),
        color: "white",
        marginLeft: scale(10),
        flexShrink: 1
    },
    txtAlert: {
        color: "white",
        marginLeft: scale(10),
        flex: 1
    }
});