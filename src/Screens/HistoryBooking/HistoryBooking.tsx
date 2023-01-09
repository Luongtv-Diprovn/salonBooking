import React from 'react';
import { View, StyleSheet, Text } from "react-native"

const HistoryBooking = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.txtPage}>This is HistoryBooking</Text>
        </View>
    )
}

export default HistoryBooking

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


