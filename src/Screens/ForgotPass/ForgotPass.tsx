import React from 'react';
import { View, StyleSheet, Text } from "react-native"
import { clor } from '../../shared/color'
import Test from './components/Test'

const ForgotPass = () => {

    return (
        <View style={styles.container}>
            <Test />
        </View>
    )
}

export default ForgotPass

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: clor.grayLight
    }
});


