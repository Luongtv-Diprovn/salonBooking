import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../shared/BASE_URL'
import { View, StyleSheet, Text, Button } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { screenName } from "../../navigators/screens-name"
import BottomViewUser from './components/BottomViewUser'
import TopViewUser from './components/TopViewUser'
import { clor } from '../../shared/color'

const User = () => {
    const navigation = useNavigation<any>();
    return (
        <View style={styles.container}>
            <TopViewUser />
            <BottomViewUser />
            <Button
                title='Log out'
                onPress={() => navigation.navigate(screenName.signIn)}
                color={clor.maincolor}
            />
        </View>
    )
}

export default User

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});


