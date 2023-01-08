import React from 'react';
import { View, StyleSheet, Text } from "react-native"

const Ranking = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.txtPage}>This is Ranking</Text>
        </View>
    )
}

export default Ranking

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


