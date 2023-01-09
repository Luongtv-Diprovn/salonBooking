import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from "react-native"
import { scale } from '../../asset/normalize'
import { useAppSelector, useAppDispatch } from '../../Redux/hookRedux'
import BlinkMessage from './components/BlinkMessage'
import Service_DropDown from './components/Service_DropDown'


const Booking = () => {

    const user = useAppSelector((state) => state.user)
    const [statusBooking, setStatusBooking] = useState<boolean>(false) //biến này chỉ dùng để  lại trang HistoryBooking sau khi đã đặt lịch
    const [existVoucher, setExistVoucher] = useState(null)
    const [selectedIDServices, setSelectedIDServices] = useState([])
    const onSelectedIDServices = (list: []) => {
        setSelectedIDServices(list)
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <BlinkMessage />
                <Text style={styles.txtTitle}> 1.Choose Service </Text>
                <Service_DropDown
                    existVoucher={existVoucher}
                    statusBooking={statusBooking}
                    onSelectedIDServices={(list: []) => { onSelectedIDServices(list) }} />
            </ScrollView>
        </View>
    )
}

export default Booking

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "white"
    },
    txtTitle: {
        marginLeft: 12,
        fontWeight: "bold",
        fontSize: scale(18),
        color: "#70605F"
    }
});


