import React from 'react';
import { View, StyleSheet, Text } from "react-native"

const Booking = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.txtPage}>This is Booking</Text>
        </View>
    )
}

export default Booking

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "pink",
        alignItems: 'center',
        justifyContent: "center"
    },
    txtPage: {
        fontSize: 25,
        fontWeight: "bold"
    }
});


