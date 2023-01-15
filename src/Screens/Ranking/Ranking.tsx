import { BASE_URL } from "../../shared/BASE_URL"
import {
    View,
    StyleSheet,
    FlatList,
    Animated,
    Text,
    ImageBackground
} from "react-native";
import React, { useState, memo, useEffect, useRef } from "react";
import { clor } from '../../shared/color'
import { scale } from '../../shared/normalize'
import { img } from '../../asset/index'
import { RankingStylist } from '../../shared/Interface'
import LottieView from "lottie-react-native"
import ItemStylist from './components/ItemStylist'

const sizeTitle = scale(16)

function Ranking() {

    const scrollY = useRef(new Animated.Value(0)).current
    const [loading, setloading] = useState(false)
    const [dataStylist, setDataStylist] = useState<RankingStylist[]>([])

    async function Get_StaffByBill() {
        setloading(true)
        var url = BASE_URL + "/api/v1/bills/staffs/sort?roleId=2"
        await fetch(url, {
            method: "GET",
        }).then((response) => {
            if (response.status == 200) {
                Promise.resolve(response.json())
                    .then((value) => {
                        setDataStylist(value)

                    });
            }
        })
        setloading(false);
    }

    useEffect(() => {
        Get_StaffByBill()
    }, [])

    useEffect(() => {

    })

    return (
        <ImageBackground
            blurRadius={4}
            source={img.bgrSalon}
            style={styles.container}>
            {loading ?
                <LottieView source={img.waiting} autoPlay />
                :
                <>
                    <View style={styles.topView}>
                        <Text style={[styles.titleTopView, { fontSize: sizeTitle * 1.5 }]}>RANKING</Text>
                        <Text style={styles.titleTopView}>TOP MOST STYLISTS HAVE MANY BILL</Text>
                    </View>
                    <View
                        style={styles.bottomView}>
                        <Animated.FlatList
                            showsVerticalScrollIndicator={false}
                            data={dataStylist}
                            onScroll={Animated.event(
                                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                                { useNativeDriver: true }
                            )}
                            renderItem={({ item, index }) =>
                                <ItemStylist
                                    stylist={item}
                                    index={index}
                                    scrollY={scrollY}
                                />
                            }
                        />
                    </View>
                </>
            }
        </ImageBackground>
    )
}

export default memo(Ranking)

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        paddingTop: scale(25),
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    titleTopView: {
        color: "white",
        fontWeight: "bold",
        fontSize: sizeTitle
    }
})


