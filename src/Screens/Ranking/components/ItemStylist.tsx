import { BASE_URL } from '../../../shared/BASE_URL'
import {
    View,
    StyleSheet,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    FlatList,
    Animated
} from "react-native";
import React, { useState, memo } from "react";
import Icon from "react-native-vector-icons/FontAwesome5"
import Modal from "react-native-modal";
import { responsive } from '../../../shared/responsive'
import { clor } from '../../../shared/color'
import { s } from '../../../shared/normalize'
import { img } from '../../../asset/index'
import { Rate, RankingStylist } from '../../../shared/Interface'
import LottieView from "lottie-react-native"
import { useAppSelector, useAppDispatch } from "../../../Redux/hookRedux"
import dayjs from "dayjs";


const sizeIMG = s(80)
const paddingViewItem = s(15)
const marginBottomItem = s(35)
const sizeViewItem = sizeIMG + paddingViewItem * 2 + marginBottomItem
const sizeViewIconTrophy = sizeIMG / 3
const sizeIconTrophy = sizeViewIconTrophy * 2 / 3
const sizeTxt = s(16)


interface receiveItemStylist {
    stylist: RankingStylist
    index: number
    scrollY: any
}

interface recieveRating {
    userStarRate: number
}

function Rating(props: recieveRating) {
    const maxRating = [1, 2, 3, 4, 5]
    return (
        <View style={{ flexDirection: "row" }}>
            {
                maxRating.map((item, index) => {
                    return (
                        <Image
                            key={index}
                            source={item <= props.userStarRate ? img.starFill : img.starUnFill}
                            style={{ height: 20, width: 20, marginLeft: 5 }}
                        />
                    )
                })
            }
        </View>
    )
}

function checkRankAndReturnColor(rank: number) {

    const color_rank = [clor.au, clor.ag, clor.cu]
    var colorBGR = ""
    var colorTrophy = ""
    var colorBGRTrophy = ""
    var colorShadow = ""
    if (rank < 3) {
        colorBGR = color_rank[rank]
        colorTrophy = color_rank[rank]
        colorBGRTrophy = clor.white
        colorShadow = "orange"
        return {
            colorBGR, colorTrophy, colorBGRTrophy, colorShadow
        }
    }
    colorBGR = clor.white
    colorTrophy = clor.white
    colorBGRTrophy = clor.maincolor
    colorShadow = clor.maincolor
    return {
        colorBGR, colorTrophy, colorBGRTrophy, colorShadow
    }
}

function ItemStylist(props: receiveItemStylist) {

    const scale = props.scrollY.interpolate({
        inputRange: [
            -1, 0,
            sizeViewItem * props.index,
            sizeViewItem * (props.index + 2)
        ],
        outputRange: [1, 1, 1, 0]
    })
    const handleChangeColor = checkRankAndReturnColor(props.index)
    const [isModalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState<Rate[]>([])
    const [loading, setloading] = useState<boolean>(false)
    const user = useAppSelector((state) => state.user)

    async function Get_StaffRateById() {

        setloading(true)
        var url = BASE_URL + "/api/v1/staffs/" + props.stylist.staff.Id
        await fetch(url, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + user.userProperties.Token.token,
                "Content-Type": "application/json",
            },
        }).then((response) => {
            if (response.status == 200) {
                Promise.resolve(response.json())
                    .then((value) => {
                        setData(value.rating)
                    });
            }
        })
        setloading(false);
    }



    return (
        <>
            {props.index < 10 ?
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        Get_StaffRateById()
                        setModalVisible(true)
                    }}>
                    <Animated.View
                        key={props.index}
                        style={[styles.viewItem, { backgroundColor: handleChangeColor.colorBGR, shadowColor: handleChangeColor.colorShadow, transform: [{ scale }] }]}>
                        <ImageBackground
                            style={styles.img}
                            source={img.barberConfirm}>
                            <View style={[styles.viewIconTrophy, { backgroundColor: handleChangeColor.colorBGRTrophy }]}>
                                {
                                    props.index < 3 ?
                                        <Icon
                                            color={handleChangeColor.colorTrophy}
                                            name={"crown"}
                                            size={sizeIconTrophy} />
                                        :
                                        <Text style={{ fontSize: sizeIconTrophy, color: clor.white }}>{props.index + 1}</Text>
                                }
                            </View>
                        </ImageBackground>
                        <View style={styles.leftView}>
                            <Text style={styles.txtName}>{props.stylist.staff.name} </Text>
                            <View style={styles.viewFlex1} />
                            <Text style={styles.txtCount} numberOfLines={3}>{" " + props.stylist._count + " Bill "}</Text>
                            <Icon
                                name={"money-bill-wave"}
                                color={"black"}
                                size={22}
                            />
                        </View>
                    </Animated.View>
                </TouchableOpacity>
                :
                <></>
            }
            <Modal
                isVisible={isModalVisible}
                useNativeDriver={true}>
                {
                    loading ?
                        <LottieView source={img.waiting} autoPlay />
                        :
                        <View style={styles.containerModal}>
                            <View style={styles.viewTopModal}>
                                <Text style={styles.txtTitleModal}>RATING BY ANOTHER CUSTOMER</Text>
                                <View style={styles.viewFlex1} />
                                <TouchableOpacity
                                    onPress={() => { setModalVisible(false) }}
                                    style={styles.btnClose}
                                >
                                    <Text style={styles.txtClose}>X</Text>
                                </TouchableOpacity>
                            </View>
                            {
                                data.length != 0 ?
                                    <>
                                        <FlatList
                                            showsVerticalScrollIndicator={false}
                                            data={data}
                                            onScroll={(event) => {
                                                console.log(event.nativeEvent.contentOffset.y)
                                            }}
                                            renderItem={({ item, index }) =>
                                                <View key={index}>
                                                    <View style={{ flexDirection: "row" }}>
                                                        <Text style={styles.txtTitle}>Rate :</Text>
                                                        <Rating userStarRate={item.rate} />
                                                    </View>
                                                    <View style={{ flexDirection: "row" }}>
                                                        <Text style={styles.txtTitle}>Create At :</Text>
                                                        <Text style={styles.txtContent}>{dayjs(item.createdAt).format("YYYY-MM-DD")}</Text>
                                                    </View>
                                                    <View>
                                                        <Text style={styles.txtTitle}>Comment :</Text>
                                                        {
                                                            item.comment !== "" ?
                                                                <Text style={styles.txtContent}>{item.comment}</Text>
                                                                :
                                                                <></>
                                                        }
                                                    </View>
                                                    <View style={styles.lineHorizone} />
                                                </View>
                                            }
                                        />
                                    </>
                                    :
                                    <Image
                                        source={img.notfound}
                                        resizeMode={"contain"}
                                        style={styles.imgNotfound}
                                    />
                            }
                        </View>
                }
            </Modal>

        </>
    )
}

export default memo(ItemStylist)

const styles = StyleSheet.create({
    viewItem: {
        flexDirection: "row",
        width: responsive.WIDTH * 0.9,
        borderRadius: 10,
        marginHorizontal: responsive.WIDTH * 0.1 / 2,
        marginBottom: marginBottomItem,
        padding: paddingViewItem,
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    viewIconTrophy: {
        backgroundColor: clor.white,
        height: sizeViewIconTrophy,
        width: sizeViewIconTrophy,
        borderRadius: sizeViewIconTrophy / 2,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: -sizeViewIconTrophy / 3,
        left: -sizeViewIconTrophy / 3
    },
    leftView: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    viewFlex1: {
        flex: 1
    },
    img: {
        height: sizeIMG,
        width: sizeIMG
    },
    imgNotfound: {
        alignSelf: "center",
        height: "100%",
        width: "100%"
    },
    txtName: {
        marginLeft: 8,
        fontSize: sizeTxt,
        fontWeight: "bold",
        color: clor.grayForTxt
    },
    txtCount: {
        fontWeight: "bold",
        fontSize: sizeTxt,
        color: "red"
    },
    lineHorizone: {
        borderWidth: 0.8,
        borderColor: clor.grayLight,
        marginVertical: s(15),
    },
    txtTitle: {
        fontSize: sizeTxt,
        color: clor.grayForTxt
    },
    txtContent: {
        fontSize: sizeTxt,
        fontWeight: "bold",
        marginHorizontal: s(10),
    },
    containerModal: {
        alignSelf: "center",
        height: responsive.WIDTH * 0.8 * 1.5,
        width: responsive.WIDTH * 0.8,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 15,

    },
    viewTopModal: {
        flexDirection: "row",
        marginBottom: 8,
    },
    btnClose: {
        backgroundColor: "red",
        padding: 5,
        borderRadius: 5,
        flexShrink: 1
    },
    txtClose: {
        fontSize: sizeTxt,
        color: "white"
    },
    txtTitleModal: {
        fontWeight: "bold",
        alignSelf: "center",
        fontSize: sizeTxt,
        color: clor.A,
        flexShrink: 1
    },


})

