import React, { useEffect, useState, memo } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import Icon from "react-native-vector-icons/AntDesign";
import dayjs from "dayjs";
import { responsive } from "../../../shared/responsive"
import { scale } from '../../../shared/normalize'

function Calendar(props) {

    const [selectedDate, setSelectedDate] = useState<string>("")
    const [showOption, setShowOption] = useState<boolean>(false)

    useEffect(() => {
        setSelectedDate("")
        setShowOption(false)
        props.onSelectBookingDate("")
    }, [props.statusBooking])

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.DropDown}
                onPress={() => {
                    setShowOption(!showOption)
                }}>
                <Text style={[styles.txt, { color: selectedDate != "" ? "red" : "black", fontSize: scale(15) }]}>
                    {selectedDate != "" ? selectedDate : "Choose booking date"}
                </Text>
                <Icon
                    name={showOption ? "caretdown" : "caretup"}
                    size={scale(20)}
                    color={"black"}
                />
            </TouchableOpacity>
            {
                showOption && (<CalendarPicker
                    width={responsive.WIDTH * 0.95}
                    minDate={dayjs().format("YYYY-MM-DD")}
                    maxDate={dayjs().add(6, "day").format("YYYY-MM-DD")}
                    selectedDayColor="#ffcc33"
                    // selectedStartDate={year + "-" + month + "-" + day}
                    selectedStartDate={selectedDate}
                    onDateChange={(d: any) => {
                        var chooseDate = dayjs(d._d).format("YYYY-MM-DD")
                        setSelectedDate(chooseDate)
                        props.onSelectBookingDate(chooseDate)
                    }}
                />)
            }
        </View>
    );
}

export default memo(Calendar)

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        margin: 10,
        alignSelf: "center"
    },
    DropDown: {
        backgroundColor: "#f7f7f7",
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
        color: "black",
        marginRight: 5
    },
});


