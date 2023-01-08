import React from 'react';
import { View, StyleSheet, Text, Button } from "react-native"
import { useNavigation } from '@react-navigation/native'
import { screenName } from "../../navigators/screens-name"

const SignUp = () => {

    const navigation = useNavigation<any>();

    return (
        <View style={styles.container}>
            <Text style={styles.txtPage}>This is Sign Up</Text>
            <Button
                title='Back'
                onPress={() => navigation.navigate(screenName.signIn)}
            />
        </View>
    )
}

export default SignUp

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


