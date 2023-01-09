import React from 'react';
import { View, StyleSheet, Text } from "react-native"
import BlinkMessage from './components/BlinkMessage'

const Booking = () => {

    return (
        <View style={styles.container}>
            <BlinkMessage />
        </View>
    )
}

export default Booking

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "white"
    }
});


