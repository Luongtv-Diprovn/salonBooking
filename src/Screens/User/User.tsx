import React from 'react';
import { View, StyleSheet, Text, Button, ImageBackground } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { screenName } from "../../navigators/screens-name"
import BottomViewUser from './components/BottomViewUser'
import TopViewUser from './components/TopViewUser'
import { clor } from '../../shared/color'
import { storeLocalToken } from '../../shared/Function/AsyncStorage'
import { typeToken } from '../../shared/Interface'
import { img } from '../../asset/index'

const User = () => {
    const navigation = useNavigation<any>();
    return (
        <ImageBackground
            blurRadius={1}
            source={img.profileBackground}
            style={styles.container}>
            <TopViewUser />
            <BottomViewUser />
            <Button
                title='Log out'
                onPress={() => {
                    var emptyToken: typeToken = {
                        token: "",
                        refreshToken: ""
                    }
                    storeLocalToken(emptyToken)
                    navigation.navigate(screenName.signIn)
                }}
                color={clor.maincolor}
            />
        </ImageBackground>
    )
}

export default User

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});


