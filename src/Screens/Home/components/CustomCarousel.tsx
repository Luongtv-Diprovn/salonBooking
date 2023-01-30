import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { BASE_URL } from '../../../shared/BASE_URL'
import { responsive } from '../../../shared/responsive'
import { scale } from '../../../shared/normalize'
import { img } from '../../../asset/index'
import { clor } from '../../../shared/color'
import { Advertisement } from '../../../shared/Interface'
import Carousel from 'react-native-reanimated-carousel'
import LottieView from "lottie-react-native"


function CustomCarousel() {

    const [data, setData] = useState<Advertisement[]>([])
    const [loading, setloading] = useState(false)
    const [currentIndex, setCurrentIndex] = useState<number>(0);


    async function Get_AllAdvertisement() {
        setloading(true)
        var url = BASE_URL + '/api/v1/advertisements'
        await fetch(url, {
            method: "GET",
        }).then((response) => {
            if (response.status == 200) {
                Promise.resolve(response.json())
                    .then((value) => {
                        setData(value)
                    })
            }
        })
        setloading(false)
    }

    useEffect(() => {
        Get_AllAdvertisement()
    }, [])

    const renderItem = (item: Advertisement, index: number) => {
        return (
            <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() => alert("hi")}
            >
                <Image
                    source={{ uri: item.imagePath }}
                    resizeMode={"cover"}
                    onMagicTap={() => alert("hi")}
                    style={styles.container} />
                <Text style={{ marginTop: 20, fontSize: scale(16), fontWeight: "bold", color: clor.blackForTxt }}>{item.title}</Text>
            </TouchableOpacity>

        )
    }

    return (
        <>
            {loading ?
                <LottieView source={img.waiting} autoPlay />
                :
                <Carousel
                    loop
                    width={responsive.WIDTH}
                    height={responsive.WIDTH / 2}
                    autoPlay={true}
                    data={data}
                    mode={"parallax"}
                    onSnapToItem={(index) => setCurrentIndex(index)}
                    scrollAnimationDuration={2000}
                    renderItem={({ item, index }) => renderItem(item, index)}
                />
            }
        </>
    );
}

export default CustomCarousel

const styles = StyleSheet.create({
    container: {
        width: responsive.WIDTH,
        height: responsive.WIDTH / 3,
        borderRadius: responsive.WIDTH / 32
    },
    topView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: clor.maincolor,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    bottomView: {
        flex: 4,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    }
})