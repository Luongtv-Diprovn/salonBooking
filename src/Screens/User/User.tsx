import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../BASE_URL'
import { View, StyleSheet, Text, Button } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { screenName } from "../../navigators/screens-name"

const User = () => {
    const navigation = useNavigation<any>();
    return (
        <View style={styles.container}>
            <Text style={styles.txtPage}>This is User</Text>
            <Button
                title='Log out'
                onPress={() => navigation.navigate(screenName.signIn)}
            />
        </View>
    )
}

export default User

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


