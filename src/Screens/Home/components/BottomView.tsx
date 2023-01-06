import React, { useState, useEffect } from 'react';
import { ProductType } from "../../../Interface"
import { BASE_URL } from '../../../BASE_URL'
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from "react-native"
import { responsive } from '../../../asset/responsive'
import FastImage from 'react-native-fast-image'

const heightItemView = responsive.height(80)

const ItemView = (product: ProductType, index: number) => {
    return (
        <TouchableOpacity
            key={index} style={styles.viewItem}>
            <Text style={styles.txtItem}>{product?.name}</Text>
            <View style={styles.viewFlex1} />
            <FastImage
                style={styles.imageItem}
                source={{ uri: product.imagePath }}
                resizeMode={"contain"}
            />
        </TouchableOpacity>
    )
}


const BottomView = () => {

    const productType = [
        {
            id: 1,
            endPoint: "blush",
            name: "Blush",
            imagePath: "https://cdn-icons-png.flaticon.com/512/2370/2370959.png"
        },
        {
            id: 2,
            endPoint: "bronzer",
            name: "Bronzer",
            imagePath: "https://cdn-icons-png.flaticon.com/512/3718/3718315.png"
        },
        {
            id: 3,
            endPoint: "eyebrow",
            name: "Eyebrow",
            imagePath: "https://cdn-icons-png.flaticon.com/512/1271/1271416.png"
        },
        {
            id: 4,
            endPoint: "eyeliner",
            name: "Eyeliner",
            imagePath: "https://cdn-icons-png.flaticon.com/512/7379/7379695.png"
        },
        {
            id: 5,
            endPoint: "eyeshadow",
            name: "Eyeshadow",
            imagePath: "https://cdn-icons-png.flaticon.com/512/2323/2323158.png"
        },
        {
            id: 6,
            endPoint: "foundation",
            name: "Foundation",
            imagePath: "https://static.thenounproject.com/png/1821600-200.png"
        },
        {
            id: 7,
            endPoint: "lipliner",
            name: "Lip liner",
            imagePath: "https://static.thenounproject.com/png/1835543-200.png"
        },
        {
            id: 8,
            endPoint: "lipstick",
            name: "Lipstick",
            imagePath: "https://cdn-icons-png.flaticon.com/512/1402/1402661.png"
        },
        {
            id: 9,
            endPoint: "mascara",
            name: "Mascara",
            imagePath: "https://cdn-icons-png.flaticon.com/512/2810/2810402.png"
        },
        {
            id: 10,
            endPoint: "nailpolish",
            name: "Nail polish",
            imagePath: "https://cdn-icons-png.flaticon.com/512/1398/1398848.png"
        },

    ]


    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={productType}
                keyExtractor={item => String(item.id)}
                numColumns={1}
                renderItem={({ item, index }) => ItemView(item, index)
                }
            />
        </View>
    )
}

export default BottomView

const styles = StyleSheet.create({
    container: {
        flex: 0.7,
        padding: 10,
        alignItems: "center",
        backgroundColor: "#fcf7f1"
    },
    txtItem: {
        fontSize: 20,
        color: "black"
    },
    viewItem: {
        height: heightItemView,
        width: responsive.WIDTH * 0.9,
        backgroundColor: "white",
        alignItems: "center",
        padding: 8,
        margin: 10,
        flexDirection: "row",
        borderRadius: 20
    },
    imageItem: {
        height: heightItemView * 0.9,
        width: heightItemView * 0.9
    },
    viewFlex1: {
        flex: 1
    }
});


