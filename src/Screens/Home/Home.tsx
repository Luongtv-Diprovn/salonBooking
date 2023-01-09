import React from 'react';
import { View, StyleSheet, Text } from "react-native"
import { useAppSelector, useAppDispatch } from '../../Redux/hookRedux'

const Home = () => {

    const user = useAppSelector((state) => state.user)

    return (
        <View style={styles.container}>
            <Text style={styles.txtPage}>Welcome</Text>
            <Text>{user.userProperties.name}</Text>
        </View>
    )
}

export default Home

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


