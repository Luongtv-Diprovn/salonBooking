
import { BASE_URL } from "../../../shared/BASE_URL"
import { View, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState, memo } from "react";
import dayjs from "dayjs";
import DetailConfirmBooking from "./DetailConfirmBooking"
import { useAppSelector, useAppDispatch } from "../../../Redux/hookRedux"
import { Advertisement, Booking } from "../../../shared/Interface"
import { clor } from "../../../shared/color"
import { scale } from "../../../shared/normalize"

function ShowConfirmBooking() {

    const user = useAppSelector((state) => state.user)
    const [data, setData] = useState<Booking[]>([])
    const [existConfirmBooking, setExistConfirmBooking] = useState<boolean>(false)
    let currentDay = dayjs().format("YYYY-MM-DD")
    let endDay = dayjs().add(6, "day").format("YYYY-MM-DD")


    async function Get_ExsistConfirmBookingOfUser() {
        var url = BASE_URL + "/api/v1/bookings?" + "customerId=" + user.userProperties.Id + "&startDate=" + currentDay + "&endDate=" + endDay + "&status=Confirm"
        await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "multipart/form-data"
            },
        }).then((response) => {
            if (response.status == 200) {
                setExistConfirmBooking(true)
                Promise.resolve(response.json())
                    .then((value) => {
                        setData(value.bookings)
                    });
            }
            else {
                setExistConfirmBooking(false)
            }
        })
    }

    useEffect(() => {
        Get_ExsistConfirmBookingOfUser()
    }, [user.userProperties.Id, user.userProperties.statusBooking])

    const renderItem = (item: Booking) => {
        return (
            <DetailConfirmBooking
                existConfirmBooking={existConfirmBooking}
                imgStaff={item.staff.imagePath}
                phoneCustomer={item.customer.phone}
                dateBooking={item.date}
                timeSlot={item.timeSlot}
                staffName={item.staff.name} />
        )
    }

    return (
        <View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                horizontal
                renderItem={({ item }) => renderItem(item)}
            />
        </View>
    )
}
export default memo(ShowConfirmBooking)



