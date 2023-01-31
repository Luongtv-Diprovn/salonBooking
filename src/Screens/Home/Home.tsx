import React from "react"
import { View, StyleSheet, ScrollView, Text } from "react-native"
import SlideBanner from "./components/SlideBanner"
import { clor } from "../../shared/color"
import CustomCarousel from "./components/CustomCarousel"
import Category from "./components/Category"
import ShowStylist from "./components/ShowStylist"
import ShowCofirmBooking from "./components/ShowCofirmBooking"
import { scale } from "../../shared/normalize"

const Home = () => {

    return (
        <View style={styles.container}>
            <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
                <ShowCofirmBooking />
                <Text style={styles.txtTitle}>Category</Text>
                <Category />
                <Text style={styles.txtTitle}>Stylist Specialist</Text>
                <ShowStylist />
                <CustomCarousel />
            </ScrollView>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: clor.white,
    },
    txtTitle: {
        marginLeft: scale(12),
        fontWeight: "bold",
        fontSize: scale(25),
        color: clor.D,
        marginVertical: scale(20)
    }
});


