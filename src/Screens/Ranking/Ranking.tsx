import React, { useRef } from 'react';
import { View, StyleSheet, Text } from "react-native"
import Carousel from 'react-native-anchor-carousel';
import Test from './components/Test'
import Test1 from './components/Test1'

const Ranking = () => {

    return (
        // <View style={styles.container}>
        //     <Text style={styles.txtPage}>This is Ranking</Text>
        // </View>
        // <Test />
        <Test1 />
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


