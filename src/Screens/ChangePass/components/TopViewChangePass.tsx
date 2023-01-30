import React, { memo, useState } from "react"
import { StyleSheet, View, Text, Image, TouchableOpacity, } from "react-native"
import Icon from 'react-native-vector-icons/Fontisto'
import { useNavigation } from '@react-navigation/native'
import { useAppSelector, useAppDispatch } from "../../../Redux/hookRedux"
import { responsive } from '../../../shared/responsive'
import { scale } from '../../../shared/normalize'
import { clor } from '../../../shared/color'

const sizeItem = scale(22)

function TopViewUser() {

    const navigation = useNavigation<any>()
    const user = useAppSelector((state) => state.user)

    return (
        <View style={styles.container}>
            <Icon
                style={{ alignSelf: "center" }}
                name={"player-settings"}
                size={sizeItem}
                color={clor.white} />
            <Text style={styles.txt}>Change Pass</Text>
            <TouchableOpacity
                style={{ padding: 10, paddingHorizontal: 15 }}
                onPress={() => navigation.openDrawer()}>
                <Icon
                    name={"more-v-a"}
                    size={sizeItem}
                    color={clor.white} />
            </TouchableOpacity>
        </View >
    );
}

export default memo(TopViewUser)

const styles = StyleSheet.create({
    container: {
        height: responsive.height(60),
        width: '100%',
        backgroundColor: clor.maincolor,
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row"
    },
    txt: {
        alignSelf: "center",
        color: clor.white,
        fontSize: sizeItem,
        fontWeight: '600',
    }
})