import React from 'react';
import { View, StyleSheet, ScrollView, Text } from "react-native"
import SlideBanner from './components/SlideBanner'
import { clor } from '../../shared/color'
import CustomCarousel from './components/CustomCarousel'
import Category from './components/Category'
import { scale } from '../../shared/normalize';

const Home = () => {

    return (
        <View style={styles.container}>
            <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
                <SlideBanner />
                {/* <CustomCarousel />
                <Category /> */}
            </ScrollView>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: clor.white,
        // paddingLeft: scale(10)
    }
});


