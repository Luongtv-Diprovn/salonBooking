import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {
    createDrawerNavigator,
    DrawerItemList,
} from '@react-navigation/drawer'
import { storeLocalToken } from '../../shared/Function/AsyncStorage'
import { typeToken } from '../../shared/Interface'
import { scale } from '../../shared/normalize'
import { clor } from '../../shared/color'
import { img } from '../../asset/index'
import { useNavigation } from "@react-navigation/native"
import { screenName } from '../../navigators/screens-name'
import User from '../User/User'
import ChangePass from '../ChangePass/ChangePass'

const sizeIcon = scale(24)

function CustomDrawerContent(props) {

    const navigation = useNavigation<any>();
    const [widthOfDrawer, setWidthOfDrawer] = useState<number>(0)

    return (
        <View style={{ flex: 1 }}
            onLayout={(event) => {
                setWidthOfDrawer(event.nativeEvent.layout.width)
            }}>
            <ImageBackground
                style={[styles.imgLogo, { height: widthOfDrawer * 0.6, width: widthOfDrawer * 0.6 }]}
                source={img.logoSalon}
            />
            <DrawerItemList {...props} />
            <TouchableOpacity
                style={styles.btnLogOut}
                onPress={() => {
                    var emptyToken: typeToken = {
                        token: "",
                        refreshToken: ""
                    }
                    storeLocalToken(emptyToken)
                    navigation.navigate(screenName.signIn)
                }}
            >
                <Icon name="logout" color={clor.maincolor} size={widthOfDrawer / 3} />
                <Text style={styles.txtLogOut}>Log out</Text>
            </TouchableOpacity>
        </View>
    );
}

const Drawer = createDrawerNavigator()

export default function MainDrawer() {
    return (
        <Drawer.Navigator
            initialRouteName={screenName.user}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerPosition: "right",
                drawerActiveBackgroundColor: clor.maincolor,
                drawerActiveTintColor: clor.white,
                drawerInactiveTintColor: clor.maincolor,
                drawerLabelStyle: { fontSize: scale(18), fontWeight: "bold" }
            }}
        >
            <Drawer.Screen name="Profile" component={User}
                options={{
                    drawerIcon: ({ color }) => (
                        <Icon name="account-circle" color={color} size={sizeIcon} />),
                }} />
            <Drawer.Screen name="Change Pass" component={ChangePass}
                options={{
                    drawerIcon: ({ color }) => (
                        <Icon name="key-change" color={color} size={sizeIcon} />),
                }} />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    imgLogo: {
        alignSelf: "center",
        marginBottom: 20
    },
    txtLogOut: {
        fontSize: scale(22),
        fontWeight: "bold",
        color: clor.maincolor
    },
    btnLogOut: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 20,
        alignSelf: "center"
    },
})