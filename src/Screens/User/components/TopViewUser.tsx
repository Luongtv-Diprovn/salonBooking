import React, { memo, useEffect, useState, useRef } from "react"
import { StyleSheet, View, Text, Image, ImageBackground, Dimensions, TouchableOpacity, } from "react-native"
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';
import { useAppSelector, useAppDispatch } from "../../../Redux/hookRedux"
import { img } from '../../../asset/index'
import { responsive } from '../../../shared/responsive'
import { scale } from '../../../shared/normalize'

const screenWidth = Dimensions.get('window').width


function TopViewUser() {

    const user = useAppSelector((state) => state.user)
    const name_level = ['Gold', 'Silver', 'Bronze', 'Normal']
    const [heightOfIMGBG, setHeightOfIMGBG] = useState(0)

    return (
        <View
            style={styles.topView}
            onLayout={(event) => {
                setHeightOfIMGBG(event.nativeEvent.layout.height)
            }}>

            <View style={[styles.containerIMGPhoneName, { top: heightOfIMGBG / 5 }]}>
                <View style={{ flexDirection: "column" }} >
                    <Text style={styles.txtName}>{user.userProperties.gender ? ('Mr.' + user.userProperties.name) : ('Ms.' + user.userProperties.name)}</Text>
                    <View style={styles.viewPhone}>
                        <Icon
                            name={"phone-iphone"}
                            size={scale(22)}
                            color='black' />
                        <Text style={styles.txtPhone}>{user.userProperties.phone}</Text>
                    </View>
                </View>
                <Image
                    style={styles.avatar}
                    resizeMode='contain'
                    source={img.beautyIcon} />
            </View>
        </View >
    );
}

export default memo(TopViewUser)

const styles = StyleSheet.create({
    topView: {
        flex: 0.6,
        width: '100%',
    },
    lineHorizone: {
        borderWidth: 0.75,
        borderColor: "black",
        marginVertical: 10,
        width: "100%"
    },
    txtOption: {
        fontSize: scale(26),
        color: 'black',
        fontWeight: 'bold'
    },
    btnOption: {
        alignItems: "center",
        justifyContent: "center",
        padding: 5
    },
    avatar: {
        height: screenWidth * 0.5,
        width: screenWidth * 0.5,
        borderRadius: 150
    },
    txtPhone: {
        color: 'black',
        fontSize: scale(20),
        fontWeight: 'bold',
        marginLeft: 5
    },
    viewType: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        paddingTop: 10
    },
    viewPhone: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center'
    },
    txtType: {
        color: "white",
        fontSize: scale(18)
    },
    txtName: {
        color: 'black',
        fontSize: scale(20),
        fontWeight: 'bold',
        marginTop: 5
    },
    containerIMGPhoneName: {
        flex: 0.55,
        width: '100%',
        alignItems: "center",
        justifyContent: 'center',
        flexDirection: "row",
        position: "absolute",
    },
    IMGBackground: {
        flex: 0.45
    }
})