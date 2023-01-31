import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, Button } from "react-native"
import { scale } from "../../shared/normalize"
import { useAppSelector, useAppDispatch } from "../../Redux/hookRedux"
import BlinkMessage from "./components/BlinkMessage"
import Service_DropDown from "./components/Service_DropDown"
import Stylist_DropDown from "./components/Stylist_DropDown"
import Calender from "./components/Calender"
import TimeFlatGrid from "./components/TimeFlatGrid"
import Voucher from "./components/Voucher"
import { Advertisement } from "../../shared/Interface"
import Note from "./components/Note"
import Toast from "react-native-toast-message"
import { toastConfig, showToast } from "../../components/Toast/ToastNotify"
import { BASE_URL } from "../../shared/BASE_URL"
import { changeStatusBooking } from "../../Redux/Slice/userSlice"
import { clor } from "../../shared/color"
import LottieView from "lottie-react-native"
import { img } from "../../asset/index"

const Booking = () => {

    const user = useAppSelector((state) => state.user)
    const [statusBooking, setStatusBooking] = useState<boolean>(false) //this variable is only used to fetch api at HistoryBooking page after booking
    const [selectedIDServices, setSelectedIDServices] = useState([])
    const [selectedIDStylist, setSelectedIDStylist] = useState<string>("")
    const [selectedDate, setSelectedDate] = useState<string>("")
    const [selectedTimeSlot, setselectedTimeSlot] = useState<string>("")
    const [existVoucher, setExistVoucher] = useState<Advertisement>()
    const [note, setNote] = useState<string>("")
    const [loading, setloading] = useState<boolean>(false)
    const [disableBTNBooking, setDisable] = useState<boolean>(true)
    const dispatch = useAppDispatch()

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
    function WriteNote(text: string) {
        setNote(text);
    }

    function RefreshIfAddSuccess() {
        setselectedTimeSlot("");
        setSelectedIDStylist("");
        setSelectedDate("");
        setSelectedIDServices([]);
        setNote("");
    }

    async function Post_Booking() {

        setloading(true)
        // 7 lines next is to check if the element is of integer type, add it to the list, otherwise don"t add it        var listServiceChoose = []
        var listServiceChoose = []
        for (var i = 0; i < selectedIDServices.length; i++) {
            if (Number.isInteger(selectedIDServices[i])) {
                listServiceChoose.push(selectedIDServices[i]);
            }
        }

        let userBooking = existVoucher != null ?
            {
                "date": selectedDate,
                "timeSlot": selectedTimeSlot,
                "note": note,
                "staffId": selectedIDStylist,
                "serviceArray": listServiceChoose,
                "advertisementId": existVoucher.Id
            }
            :
            {
                "date": selectedDate,
                "timeSlot": selectedTimeSlot,
                "note": note,
                "staffId": selectedIDStylist,
                "serviceArray": listServiceChoose,
            }
        var API = BASE_URL + "/api/v1/bookings"
        await fetch(API, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + user.userProperties.Token.token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userBooking),
        }).then((response) => {
            if (response.ok) {
                showToast("SuccessTwoLine", "Booking done", "Waiting for 'Confirm' from our Receptionist")
                setStatusBooking(!statusBooking)
                RefreshIfAddSuccess();
            } else {
                Promise.resolve(response.text())
                    .then((value) => {
                        value != "" ? showToast("Warning", value, "", 18)
                            : showToast("FailTwoLine", "Fail Booking", "Something wrong, booking again please !!!")
                    });
            }
        })
        dispatch(changeStatusBooking(!user.userProperties.statusBooking))
        setloading(false)
    }

    const check = (element: any) => element != ""; //check if listServiceId is all "" then return false otherwise return true

    useEffect(() => {
        (!selectedIDServices.some(check) || selectedDate == "" || selectedIDStylist == ""
            || selectedTimeSlot == "") ? setDisable(true) : setDisable(false)

    }, [selectedIDServices, selectedIDStylist, selectedDate, selectedTimeSlot]);


    return (
        <View style={styles.container}>
            {loading ?
                <LottieView source={img.waiting} autoPlay />
                :
                <ScrollView showsVerticalScrollIndicator={false}>
                    <BlinkMessage />
                    <Text style={styles.txtTitle}>1.Choose Service </Text>
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
                    <Text style={styles.txtTitle}>6.Note</Text>
                    <Note
                        WriteNote={(text) => {
                            WriteNote(text);
                        }}
                    />
                </ScrollView>
            }
            {loading ?
                <></>
                :
                <Button
                    color={clor.maincolor}
                    disabled={disableBTNBooking}
                    onPress={() => {
                        Post_Booking()
                    }}
                    title="Booking"
                />
            }
            <Toast config={toastConfig} />
        </View>
    )
}

export default Booking

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: clor.white
    },
    txtTitle: {
        marginLeft: scale(12),
        fontWeight: "bold",
        fontSize: scale(18),
        color: clor.D
    }
});


