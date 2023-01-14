import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { screenName } from '../../navigators/screens-name'
import Test from './components/Test'

const SignUp = () => {

    const navigation = useNavigation<any>();

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        }}
            accessible={false}>
            <View style={styles.container}>
                <Test />
                <Button
                    title='Back Home'
                    onPress={() => navigation.navigate(screenName.signIn)}
                />
            </View>
        </TouchableWithoutFeedback>

    );
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: "center",
        alignItems: "center"
    }
})