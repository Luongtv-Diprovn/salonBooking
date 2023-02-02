import React, { memo, useState } from "react"
import { StyleSheet, View, Text, Image, TouchableOpacity, } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { useNavigation } from "@react-navigation/native"
import { useAppSelector, useAppDispatch } from "../../../Redux/hookRedux"
import { img } from "../../../asset/index"
import { responsive } from "../../../shared/responsive"
import { scale } from "../../../shared/normalize"
import { clor } from "../../../shared/color"

const sizeItem = scale(18)

function TopViewUser() {

    const navigation = useNavigation<any>()
    const user = useAppSelector((state) => state.user)
    const [heightOfTopView, setHeightOfTopView] = useState<number>(0)

    return (
        <View
            style={styles.container}
            onLayout={(event) => {
                setHeightOfTopView(event.nativeEvent.layout.height)
            }}>
            <View style={styles.topView}>
                <Icon
                    style={styles.btnMoreOption}
                    name={"settings"}
                    size={sizeItem}
                    color={clor.white} />
                <Text style={styles.txtPageName}>Profile</Text>
                <TouchableOpacity
                    style={styles.btnMoreOption}
                    onPress={() => navigation.openDrawer()}>
                    <Icon
                        name={"more"}
                        size={sizeItem}
                        color={clor.white} />
                </TouchableOpacity>
            </View>
            <View style={styles.bottomView}>
                <Image
                    style={[styles.avatar, { height: heightOfTopView * 0.6, width: heightOfTopView * 0.6 }]}
                    resizeMode="contain"
                    source={img.ava} />
                <Text style={styles.txt}>{user.userProperties.gender ? ("Mr." + user.userProperties.name) : ("Ms." + user.userProperties.name)}</Text>
            </View>
        </View >
    );
}

export default memo(TopViewUser)

const styles = StyleSheet.create({
    container: {
        flex: 2,
        width: "100%",
        backgroundColor: clor.maincolor,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    topView: {
        justifyContent: "space-around",
        alignItems: "center",
        paddingTop: scale(10),
        width: "100%",
        flexDirection: "row"
    },
    bottomView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    avatar: {
        borderRadius: responsive.WIDTH * 0.5 / 2,
        borderWidth: scale(8),
        borderColor: clor.white,
    },
    txt: {
        color: clor.white,
        fontSize: sizeItem,
        fontWeight: "600",
    },
    txtPageName: {
        color: clor.white,
        fontSize: sizeItem * 1.3,
        fontWeight: "600",
    },
    btnMoreOption: {
        paddingHorizontal: scale(15)
    }
})