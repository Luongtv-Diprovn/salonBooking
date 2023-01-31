
import { View, StyleSheet, Text, ImageBackground } from "react-native";
import React, { memo } from "react";
import { scale } from "../../../shared/normalize"
import { responsive } from "../../../shared/responsive"
import { clor } from "../../../shared/color"
import { img } from "../../../asset/index"

function BlinkMessage() {

    return (
        <ImageBackground
            style={styles.container}
            source={img.background}
            borderRadius={5}
            blurRadius={2}
        >
            <Text style={styles.txtfirst}>To make an appointment, you should do the following:</Text>
            <Text style={styles.txt}>
                {
                    "Step 1: Choose at least one service" + "\n"
                    + "Step 2: Choose the stylist you want to go with" + "\n"
                    + "Step 3: Choose the most convenient date" + "\n"
                    + "Step 4: Choose timeslot" + "\n"
                    + "Step 5: Apply voucher if you have" + "\n"
                    + "If you want to note us, you can leave a note below"
                }
            </Text>
        </ImageBackground>
    )
}
export default memo(BlinkMessage)

const styles = StyleSheet.create({
    container: {
        width: responsive.WIDTH * 0.95,
        borderRadius: 10,
        paddingHorizontal: scale(10),
        paddingVertical: scale(15),
        marginVertical: scale(20),
        alignSelf: "center"
    },
    txt: {
        fontSize: scale(15),
        fontWeight: "bold",
        color: clor.B,
    },
    txtfirst: {
        fontSize: scale(15),
        fontWeight: "bold",
        color: clor.B,
    }
})


