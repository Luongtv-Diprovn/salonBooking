import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native"
import { clor } from "../../shared/color"
import TopView from "./components/TopViewChangePass"
import BottomView from "./components/BottomViewChangePass"

const ChangePass = () => {

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        }}
            accessible={false}>
            <View style={styles.container}>
                <TopView />
                <BottomView />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ChangePass

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: clor.white
    }
});


