import React, { useEffect, useState, memo } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import Icon from "react-native-vector-icons/AntDesign";
import dayjs from "dayjs";
import { responsive } from "../../../shared/responsive"
import { scale } from "../../../shared/normalize"
import { clor } from "../../../shared/color"

function Calendar(props) {

    const [selectedDate, setSelectedDate] = useState<string>("")

    useEffect(() => {
        setSelectedDate("")
        props.onSelectBookingDate("")
    }, [props.statusBooking])

    return (
        <View style={styles.container}>
            <View style={styles.DropDown}>
                <Text style={styles.txt}>
                    {selectedDate != "" ? selectedDate : "Choose booking date"}
                </Text>
            </View>
            <CalendarPicker
                width={responsive.WIDTH * 0.95}
                minDate={dayjs().format("YYYY-MM-DD")}
                maxDate={dayjs().add(6, "day").format("YYYY-MM-DD")}
                textStyle={{ color: clor.D }}
                selectedDayColor={clor.maincolor}
                selectedDayTextColor={clor.white}
                selectedStartDate={selectedDate}
                onDateChange={(d: any) => {
                    var chooseDate = dayjs(d._d).format("YYYY-MM-DD")
                    setSelectedDate(chooseDate)
                    props.onSelectBookingDate(chooseDate)
                }}
            />
        </View>
    );
}

export default memo(Calendar)

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        marginVertical: scale(20),
        alignSelf: "center"
    },
    DropDown: {
        backgroundColor: clor.maincolor,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        width: responsive.WIDTH * 0.95,
        height: responsive.height(40),
        flexDirection: "row"
    },
    txt: {
        fontSize: scale(15),
        fontWeight: "400",
        color: clor.white,
        marginRight: scale(5)
    },
});


