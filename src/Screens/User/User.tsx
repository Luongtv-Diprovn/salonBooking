import React from "react"
import { View, StyleSheet } from "react-native"
import BottomViewUser from "./components/BottomViewUser"
import TopViewUser from "./components/TopViewUser"
import { clor } from "../../shared/color"

const User = () => {

    return (
        <View style={styles.container}>
            <TopViewUser />
            <BottomViewUser />
        </View>
    )
}

export default User

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: clor.white
    }
});


