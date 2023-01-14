
import { BASE_URL } from '../../../shared/BASE_URL'
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, memo } from 'react';
import dayjs from "dayjs";
import { ImageSlider } from "react-native-image-slider-banner"
import { responsive } from '../../../shared/responsive'
import { scale } from '../../../shared/normalize'
import ShowCofirmBooking from './ShowCofirmBooking'
import { clor } from '../../../shared/color'

function SlideBanner() {

    const [data, setData] = useState([])
    const [currentAdvertise, setCurrentAdvertise] = useState({})
    const [loading, setloading] = useState(false)

    async function Get_AllAdvertisement() {
        setloading(true)
        var url = BASE_URL + '/api/v1/advertisements'
        await fetch(url, {
            method: "GET",
        }).then((response) => {
            if (response.status == 200) {
                Promise.resolve(response.json())
                    .then((value) => {
                        let advertisements = value
                        let AllAdvertise = []
                        advertisements.map((item) => {
                            let newItem = {
                                ...item,
                                img: item.imagePath
                            }
                            AllAdvertise.push(newItem)
                        })
                        setData(AllAdvertise)
                    });
            }
        })
        setloading(false);
    }

    useEffect(() => {
        Get_AllAdvertisement()
    }, [])

    return (
        <View style={styles.container}>
            {loading ?
                <ActivityIndicator color={clor.maincolor} size={40} style={styles.Indicator} />
                :
                <View style={styles.container}>
                    <ImageSlider
                        blurRadius={10}
                        activeIndicatorStyle={{ color: "black" }}
                        data={data}
                        showIndicator={true}
                        timer={6000}
                        autoPlay={true}
                        caroselImageContainerStyle={styles.caroselContainer}
                        caroselImageStyle={styles.caroselIMG}
                        onItemChanged={(item) => {
                            setCurrentAdvertise(item)
                        }}
                        closeIconColor="black" >
                        <View style={styles.viewTitle}>
                            <Text style={styles.txtTitle}>{currentAdvertise.title}</Text>
                        </View>
                    </ImageSlider>
                    <ShowCofirmBooking />
                    <Text style={styles.txtDetail}>Detail Advertisement: </Text>
                    <View style={styles.viewDetail}>
                        <View style={styles.rowItem}>
                            <Text style={styles.titleInRow}>Start Date:  </Text>
                            <Text style={styles.contentInRow}>{dayjs(currentAdvertise.startDate).format('DD-MM-YYYY')}</Text>
                        </View>
                        <View style={styles.rowItem}>
                            <Text style={styles.titleInRow}>End Date: </Text>
                            <Text style={styles.contentInRow}>{dayjs(currentAdvertise.endDate).format('DD-MM-YYYY')}</Text>
                        </View>
                        {
                            currentAdvertise.voucherCode != null && currentAdvertise.amount > 0 ?
                                <>
                                    <View style={styles.rowItem}>
                                        <Text style={styles.titleInRow}>Voucher Code: </Text>
                                        <Text style={styles.contentInRow}>{currentAdvertise.voucherCode}</Text>
                                    </View>
                                    <View style={styles.rowItem}>
                                        <Text style={styles.titleInRow}>Discount: </Text>
                                        <Text style={styles.contentInRow}>{currentAdvertise.discount}%</Text>
                                    </View>
                                    <Text style={styles.contentInRow}>{'=> The number of vouchers is limited, hurry and book now to use'} </Text>
                                </>
                                :
                                <></>
                        }
                        <Text
                            numberOfLines={12}
                            style={styles.txtDecription}>
                            {currentAdvertise.detail}
                        </Text>
                    </View>
                </View>
            }
        </View>
    )
}

export default memo(SlideBanner)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    rowItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleInRow: {
        color: "#9CA1A3",
        fontSize: scale(16)
    },
    txtDecription: {
        fontSize: scale(16),
        color: "black"
    },
    contentInRow: {
        fontSize: scale(16),
        fontWeight: 'bold'
    },
    viewTitle: {
        height: responsive.HEIGHT * 0.05,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: clor.maincolor
    },
    viewDetail: {
        alignSelf: 'center',
        width: '90%',
        borderWidth: 4,
        borderColor: clor.C,
        padding: 10,
        borderRadius: 10,
        height: 400,
        marginBottom: scale(20)
    },
    txtTitle: {
        color: 'white',
        fontSize: scale(14),
        fontWeight: 'bold'
    },
    txtDetail: {
        fontSize: scale(18),
        fontWeight: 'bold',
        marginVertical: scale(20),
        marginLeft: 5,
        color: clor.A
    },
    caroselContainer: {
        height: responsive.HEIGHT * 0.5
    },
    caroselIMG: {
        resizeMode: "contain",
        height: responsive.HEIGHT * 0.45
    },
    Indicator: {
        alignSelf: "center"
    }
})


