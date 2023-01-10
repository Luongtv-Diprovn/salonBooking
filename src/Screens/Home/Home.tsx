import React from 'react';
import { View, StyleSheet, ScrollView } from "react-native"
import SlideBanner from './components/SlideBanner'

const Home = () => {


    return (
        <View style={styles.container}>
            <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
                <SlideBanner />

            </ScrollView>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});


