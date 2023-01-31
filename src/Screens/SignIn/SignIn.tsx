import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import TopView from "./components/TopView"
import BottomView from "./components/BottomView"

const SignIn = () => {

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        }}
            accessible={false}>
            <View style={styles.container}>
                <BottomView />
            </View>
        </TouchableWithoutFeedback>

    );
}

export default SignIn

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center"
    }
})