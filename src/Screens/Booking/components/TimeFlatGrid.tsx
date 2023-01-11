import { BASE_URL } from "../../../shared/BASE_URL"
import React, { useEffect, useState, memo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import dayjs from "dayjs";
import { Booking } from '../../../shared/Interface'
import { scale } from '../../../shared/normalize'
import { responsive } from '../../../shared/responsive'

const Times = [
    [
        { hour: "7", minute: "00" }, { hour: "7", minute: "30" },
        { hour: "8", minute: "00" }, { hour: "8", minute: "30" },
        { hour: "9", minute: "00" }, { hour: "9", minute: "30" },
        { hour: "10", minute: "00" }, { hour: "10", minute: "30" }
    ],
    [
        { hour: "11", minute: "00" }, { hour: "11", minute: "30" },
        { hour: "12", minute: "00" }, { hour: "12", minute: "30" },
        { hour: "13", minute: "00" }, { hour: "13", minute: "30" },
        { hour: "14", minute: "00" }, { hour: "14", minute: "30" }
    ],
    [
        { hour: "15", minute: "00" }, { hour: "15", minute: "30" },
        { hour: "16", minute: "00" }, { hour: "16", minute: "30" },
        { hour: "17", minute: "00" }, { hour: "17", minute: "30" },
        { hour: "18", minute: "00" }, { hour: "18", minute: "30" },
    ]
]



function TimeItem(props) {
    let TimeSlot = props.hour + ":" + props.minute
    function checkTimeSlotWasBookingByAnotherGuest() {
        for (var i in props.listTimeSlotBusyOfStylist) {
            var date = dayjs(props.listTimeSlotBusyOfStylist[i].date).format("YYYY-MM-DD")
            if ((props.listTimeSlotBusyOfStylist[i].timeSlot == TimeSlot) &&
                (date == props.selectedDate)) {
                return true
            }
        }
        return false
    }

    if (checkTimeSlotWasBookingByAnotherGuest()) {
        return (

            <TouchableOpacity
                style={styles.TimeItemCannotSelected}
                disabled={true}>
                <Text style={styles.txt}>{props.hour + ":" + props.minute}</Text>
            </TouchableOpacity>

        )
    }
    else if (props.selectedDate != props.today) {
        if (props.selectedTimeSlot == TimeSlot) {
            return (
                <TouchableOpacity
                    style={styles.TimeItemSelected}
                    onPress={() => {
                        props.onSelect(TimeSlot)
                    }}>
                    <Text style={styles.txt}>{props.hour + ":" + props.minute}</Text>
                </TouchableOpacity>
            )
        }
        else {
            return (
                <TouchableOpacity
                    style={styles.TimeItemUnSelected}
                    onPress={() => {
                        props.onSelect(TimeSlot)
                    }}>
                    <Text style={styles.txt}>{props.hour + ":" + props.minute}</Text>
                </TouchableOpacity>
            )
        }
    }
    else if (Number(props.hour) < props.currentHour) {
        return (
            <TouchableOpacity
                style={styles.TimeItemCannotSelected}
                disabled={true}>
                <Text style={styles.txt}>{props.hour + ":" + props.minute}</Text>
            </TouchableOpacity>
        )
    }
    else if ((Number(props.hour) == props.currentHour) && (Number(props.minute) < props.currentMinute)) {
        return (
            <TouchableOpacity
                style={styles.TimeItemCannotSelected}
                disabled={true}>
                <Text style={styles.txt}>{props.hour + ":" + props.minute}</Text>
            </TouchableOpacity>
        )
    }
    else if (props.selectedTimeSlot == TimeSlot) {
        return (
            <TouchableOpacity
                style={styles.TimeItemSelected}
                onPress={() => {
                    props.onSelect(TimeSlot)
                }}>
                <Text style={styles.txt}>{props.hour + ":" + props.minute}</Text>
            </TouchableOpacity>
        )
    }
    else {
        return (
            <TouchableOpacity
                style={styles.TimeItemUnSelected}
                onPress={() => {
                    props.onSelect(TimeSlot)
                }}>
                <Text style={styles.txt}>{props.hour + ":" + props.minute}</Text>
            </TouchableOpacity>
        )
    }
}

function TimeFlatGrid(props) {

    let currentDay = dayjs().format("YYYY-MM-DD")
    let endDay = dayjs().add(6, "day").format("YYYY-MM-DD")
    const [data, setData] = useState<Booking[]>([])
    const [currentTime, setCurrentTime] = useState<Date>(new Date())
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("")
    const [loading, setloading] = useState<boolean>(false)
    function onSelect(item) {
        setSelectedTimeSlot(item)
        props.onSelectedTimeSlot(item)
    }

    async function Get_BusyTimeOfStylist() {
        var url = BASE_URL + "/api/v1/bookings?" + "startDate=" + currentDay + "&endDate=" + endDay + "&staffId=" + props.selectedIDStylist + "&status=Confirm"
        await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "multipart/form-data"
            },
        }).then((response) => {
            if (response.status == 200) {
                Promise.resolve(response.json())
                    .then((value) => {
                        setData(value.bookings)
                    });
            }
        })
        setloading(false)
    }

    useEffect(
        // after 1 second automatically update the time
        () => {
            const intervalId = setInterval(() => {
                setCurrentTime(new Date())
            }, 1000);
            return () => {
                clearInterval(intervalId)
            }
        }, [])

    useEffect(() => {
        // every time User selects another stylist, the current selected stylist's busy schedule will be taken
        setloading(true)
        Get_BusyTimeOfStylist()
    }, [props.selectedIDStylist])

    useEffect(() => {
        // every time the User chooses a different date, it will automatically setTimeSlot to empty to avoid automatically saving the wrong TimeSlot when changing the date.
        setSelectedTimeSlot("")
        props.onSelectedTimeSlot("")
    }, [props.selectedDate])

    useEffect(() => {
        // if booking is successful, set the currently selected TimeSlot variable to ""  
        setSelectedTimeSlot("")
    }, [props.statusBooking])

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}>
            {loading ?
                <ActivityIndicator color="red" size={40} />
                :
                <View style={styles.container}>
                    <View style={styles.OneRowTime}>
                        {
                            Times[0].map((item, index) => {
                                return (
                                    <TimeItem
                                        key={index}
                                        selectedTimeSlot={selectedTimeSlot}
                                        onSelect={(item) => { onSelect(item) }}
                                        index={index}
                                        hour={item.hour}
                                        minute={item.minute}
                                        today={currentDay}
                                        currentHour={currentTime.getHours()}
                                        currentMinute={currentTime.getMinutes()}
                                        selectedDate={props.selectedDate}
                                        listTimeSlotBusyOfStylist={data} />
                                )
                            })
                        }
                    </View>
                    <View style={styles.OneRowTime}>
                        {
                            Times[1].map((item, index) => {
                                return (
                                    <TimeItem
                                        key={index}
                                        selectedTimeSlot={selectedTimeSlot}
                                        onSelect={(item) => { onSelect(item) }}
                                        index={index}
                                        hour={item.hour}
                                        minute={item.minute}
                                        today={currentDay}
                                        currentHour={currentTime.getHours()}
                                        currentMinute={currentTime.getMinutes()}
                                        selectedDate={props.selectedDate}
                                        listTimeSlotBusyOfStylist={data} />
                                )
                            })
                        }
                    </View>
                    <View style={styles.OneRowTime}>
                        {
                            Times[2].map((item, index) => {
                                return (
                                    <TimeItem
                                        key={index}
                                        selectedTimeSlot={selectedTimeSlot}
                                        onSelect={(item) => { onSelect(item) }}
                                        index={index}
                                        hour={item.hour}
                                        minute={item.minute}
                                        today={currentDay}
                                        currentHour={currentTime.getHours()}
                                        currentMinute={currentTime.getMinutes()}
                                        selectedDate={props.selectedDate}
                                        listTimeSlotBusyOfStylist={data} />
                                )
                            })
                        }
                    </View>
                </View>
            }
        </ScrollView>
    )
}

export default memo(TimeFlatGrid)

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        padding: 10
    },
    TimeItemSelected: {
        borderWidth: 2,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        height: responsive.width(100) * 2 / 3,
        width: responsive.width(100),
        backgroundColor: "#ffcc33",
        marginHorizontal: 5,
    },
    TimeItemUnSelected: {
        borderWidth: 2,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        height: responsive.width(100) * 2 / 3,
        width: responsive.width(100),
        backgroundColor: "white",
        marginHorizontal: 5,
    },
    TimeItemCannotSelected: {
        borderWidth: 2,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        height: responsive.width(100) * 2 / 3,
        width: responsive.width(100),
        backgroundColor: "gray",
        marginHorizontal: 5,
    },
    OneRowTime: {
        flex: 0.33,
        flexDirection: "row",
        marginVertical: 5
    },
    txt: {
        fontSize: scale(15),
        fontWeight: "600",
        color: "black",
    },
})