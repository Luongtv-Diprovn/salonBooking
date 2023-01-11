import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from "react-native"
import { scale } from '../../shared/normalize'
import { useAppSelector, useAppDispatch } from '../../Redux/hookRedux'
import BlinkMessage from './components/BlinkMessage'
import Service_DropDown from './components/Service_DropDown'
import Stylist_DropDown from './components/Stylist_DropDown'
import Calender from './components/Calender'
import TimeFlatGrid from './components/TimeFlatGrid'
import Voucher from './components/Voucher'
import { Advertisement } from '../../shared/Interface'

const Booking = () => {

    const user = useAppSelector((state) => state.user)
    const [statusBooking, setStatusBooking] = useState<boolean>(false) //this variable is only used to fetch api at HistoryBooking page after booking
    const [selectedIDServices, setSelectedIDServices] = useState([])
    const [selectedIDStylist, setSelectedIDStylist] = useState<string>("")
    const [selectedDate, setSelectedDate] = useState<string>("")
    const [selectedTimeSlot, setselectedTimeSlot] = useState<string>("")
    const [existVoucher, setExistVoucher] = useState<Advertisement>()
    const onSelectedIDServices = (list: []) => {
        setSelectedIDServices(list)
    }
    const onSelectIDStylist = (item: string) => {
        setSelectedIDStylist(item)
    }
    const onSelectBookingDate = (item: string) => {
        setSelectedDate(item);
    }
    const onSelectedTimeSlot = (item: string) => {
        setselectedTimeSlot(item);
    }
    const onApplyVoucher = (item: Advertisement) => {
        setExistVoucher(item);
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
                <Text style={styles.txtTitle}>2.Choose Stylist</Text>
                <Stylist_DropDown
                    statusBooking={statusBooking}
                    onSelectIDStylist={(item: string) => { onSelectIDStylist(item) }} />
                <Text style={styles.txtTitle}>3.Choose Date</Text>
                <Calender
                    statusBooking={statusBooking}
                    onSelectBookingDate={(item: string) => { onSelectBookingDate(item) }} />
                <Text style={styles.txtTitle}>4.Choose Timeslot</Text>
                <TimeFlatGrid
                    statusBooking={statusBooking}
                    selectedIDStylist={selectedIDStylist}
                    selectedDate={selectedDate}
                    onSelectedTimeSlot={(item: string) => { onSelectedTimeSlot(item) }} />
                <Text style={styles.txtTitle}>5.Voucher(type if you have)</Text>
                <Voucher
                    onApplyVoucher={(item: Advertisement) => { onApplyVoucher(item) }}
                    statusBooking={statusBooking} />
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


