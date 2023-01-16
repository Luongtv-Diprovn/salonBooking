import { BASE_URL } from "../../../shared/BASE_URL"
import React, { useState, useRef, useEffect } from "react";
import {
    View,
    StyleSheet,
    ImageBackground,
} from "react-native";
import { scale } from "../../../shared/normalize"
import { img } from "../../../asset/index"
import { responsive } from "../../../shared/responsive"
import { clor } from "../../../shared/color"


const heightItem = scale(60)
const marginVerticalItem = scale(12)

export default function BottomView() {

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.salonLogo}
                source={img.logoSalon}
            />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: clor.white,
        alignItems: "center",
        justifyContent: "center"
    },
    salonLogo: {
        height: responsive.WIDTH * 0.3,
        width: responsive.WIDTH * 0.3,
        marginVertical: marginVerticalItem,
    },
});
