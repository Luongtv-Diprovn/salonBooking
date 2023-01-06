import React from 'react';
import { View, StyleSheet } from "react-native"
import TopView from './components/TopView'
import BottomView from './components/BottomView'

const Home = () => {

    return (
        <View style={styles.container}>
            <TopView />
            <BottomView />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});


