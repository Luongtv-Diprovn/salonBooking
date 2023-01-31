import { View, StyleSheet, Text } from "react-native";
import React, { memo, useState, useEffect } from "react";
import dayjs from "dayjs";
import Icon from "react-native-vector-icons/AntDesign"
import Icon1 from "react-native-vector-icons/Entypo"
import Icon2 from "react-native-vector-icons/Fontisto"
import { responsive } from "../../../shared/responsive"
import { scale } from "../../../shared/normalize";

function DetailConfirmBooking(props) {
    const [currentTime, setCurrentTime] = useState(new Date())
    var DayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const currentDay = dayjs(currentTime).format("YYYY-MM-DD HH:mm")
    const bookingDay = dayjs(dayjs(props.dateBooking).format("YYYY-MM-DD") + props.timeSlot)
    const durationSecond = durationTime(bookingDay, currentDay)
    const TimeLeft = convertToDays(durationSecond)

    function convertToDays(Seconds) {
        let days = Math.floor(Seconds / (86400));
        Seconds -= days * (86400);
        let hours = Math.floor(Seconds / (60 * 60));
        Seconds -= hours * (60 * 60);
        let minutes = Math.floor(Seconds / (60));
        return {
            days, hours, minutes
        }
    }
    function durationTime(time1, time2) {
        return time1.diff(time2, "second")
    }

    useEffect(
        // after 1 second update time again
        () => {
            const intervalId = setInterval(() => {
                setCurrentTime(new Date())
            }, 1000);// setting time to reload here
            return () => {
                clearInterval(intervalId)
            }
        }, [])


    return (
        <View style={styles.container}>
            {
                props.existConfirmBooking &&
                <>
                    <Text style={styles.txtMainContent}>YOUR APPOINTMENT</Text>
                    <View style={styles.rowItem}>
                        <Text style={styles.txtTitleTimeLeft}>{TimeLeft.days} days {TimeLeft.hours} hours {TimeLeft.minutes} minutes left</Text>
                    </View>
                    <View style={styles.rowItem}>
                        <Icon name="calendar" color={"white"} size={scale(24)} />
                        <Text style={styles.txtContent}>{props.timeSlot + ", " + DayOfWeek[dayjs(props.dateBooking).get("day")] + ", " +
                            dayjs(props.dateBooking).format("DD-MM-YYYY")}</Text>
                    </View>
                    <View style={styles.rowItem}>
                        <Icon1 name="address" color={"white"} size={scale(24)} />
                        <Text style={styles.txtContent}>86 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng</Text>
                    </View>
                    <View style={styles.rowItem}>
                        <Icon2 name="person" size={scale(24)} color="white" />
                        <Text style={styles.txtContent}>{"Stylist: " + props.staffName}</Text>
                    </View>
                    <View style={styles.rowItem}>
                        <Icon name="infocirlceo" color={"white"} size={scale(24)} />
                        <Text style={styles.txtContent}>{"ID Booking: " + props.idBooking}</Text>
                    </View>
                    <Text style={styles.txtPleasure}>It is our pleasure to serve you</Text>
                </>
            }
        </View>
    )
}

export default memo(DetailConfirmBooking)

const styles = StyleSheet.create({
    container: {
        width: responsive.WIDTH * 0.9,
        marginHorizontal: responsive.WIDTH * 0.1 / 2,
        backgroundColor: "black",
        padding: scale(10),
        marginTop: scale(20),
        borderRadius: 10
    },
    txtTitleTimeLeft: {
        fontSize: scale(16),
        color: "red"
    },
    txtPhoneCustomer: {
        fontSize: scale(18),
        color: "#ffcc33"
    },
    txtMainContent: {
        fontSize: scale(18),
        fontWeight: "bold",
        color: "#FCEFD9",
        alignSelf: "center"
    },
    txtContent: {
        fontSize: scale(16),
        color: "white",
        marginLeft: scale(5),
    },
    rowItem: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: scale(3)
    },
    txtPleasure: {
        fontSize: scale(18),
        color: "#FDD28E",
        alignSelf: "center"
    }
})


