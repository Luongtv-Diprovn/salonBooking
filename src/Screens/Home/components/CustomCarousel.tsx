import React, { useState, useEffect } from "react"
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { BASE_URL } from "../../../shared/BASE_URL"
import { responsive } from "../../../shared/responsive"
import { scale } from "../../../shared/normalize"
import { img } from "../../../asset/index"
import { clor } from "../../../shared/color"
import { Advertisement } from "../../../shared/Interface"
import Carousel from "react-native-reanimated-carousel"
import LottieView from "lottie-react-native"
import dayjs from "dayjs"

function CustomCarousel() {

    const [data, setData] = useState<Advertisement[]>([])
    const [loading, setloading] = useState(false)
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    async function Get_AllAdvertisement() {
        setloading(true)
        var url = BASE_URL + "/api/v1/advertisements"
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
            <View>
                <Image
                    source={{ uri: item.imagePath }}
                    resizeMode={"cover"}
                    onMagicTap={() => alert("hi")}
                    style={styles.container} />
            </View>

        )
    }

    return (
        <>
            {loading ?
                <LottieView source={img.waiting} autoPlay />
                :
                <>
                    <Carousel
                        loop
                        width={responsive.WIDTH}
                        height={responsive.WIDTH / 2}
                        autoPlay={true}
                        data={data}
                        mode={"parallax"}
                        onSnapToItem={(index) => setCurrentIndex(index)}
                        scrollAnimationDuration={4000}
                        renderItem={({ item, index }) => renderItem(item, index)}
                    />
                    {
                        data.length !== 0 ?
                            <View style={styles.viewDetail}>
                                <Text style={styles.contentInRow}>{data[currentIndex].title}</Text>
                                <View style={styles.rowItem}>
                                    <Text style={styles.titleInRow}>Start Date:  </Text>
                                    <Text style={styles.contentInRow}>{dayjs(data[currentIndex].startDate).format("DD-MM-YYYY")}</Text>
                                </View>
                                <View style={styles.rowItem}>
                                    <Text style={styles.titleInRow}>End Date: </Text>
                                    <Text style={styles.contentInRow}>{dayjs(data[currentIndex].endDate).format("DD-MM-YYYY")}</Text>
                                </View>
                                {
                                    data[currentIndex].voucherCode != null && data[currentIndex].amount > 0 ?
                                        <>
                                            <View style={styles.rowItem}>
                                                <Text style={styles.titleInRow}>Voucher Code: </Text>
                                                <Text style={styles.contentInRow}>{data[currentIndex].voucherCode}</Text>
                                            </View>
                                            <View style={styles.rowItem}>
                                                <Text style={styles.titleInRow}>Discount: </Text>
                                                <Text style={styles.contentInRow}>{data[currentIndex].discount}%</Text>
                                            </View>
                                            <Text style={styles.contentInRow}>{"=> The number of vouchers is limited, hurry and book now to use"} </Text>
                                        </>
                                        :
                                        <></>
                                }
                                <Text
                                    numberOfLines={12}
                                    style={styles.txtDecription}>
                                    {data[currentIndex].detail}
                                </Text>

                            </View>
                            :
                            <></>
                    }
                </>
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
    },
    rowItem: {
        flexDirection: "row",
        alignItems: "center"
    },
    titleInRow: {
        color: "#9CA1A3",
        fontSize: scale(16),
        flexShrink: 1
    },
    txtDecription: {
        fontSize: scale(16),
        color: clor.blackForTxt
    },
    contentInRow: {
        fontSize: scale(16),
        fontWeight: "bold",
        flexShrink: 1
    },
    viewDetail: {
        alignSelf: "center",
        width: "90%",
        borderWidth: 2,
        borderColor: clor.grayForTxt,
        padding: scale(10),
        borderRadius: 10,
        height: scale(400),
        backgroundColor: clor.white
    },
    txtTitle: {
        color: "white",
        fontSize: scale(14),
        fontWeight: "bold"
    },
    txtDetail: {
        fontSize: scale(18),
        fontWeight: "bold",
        marginVertical: scale(20),
        marginLeft: scale(5),
        color: clor.A
    },
})