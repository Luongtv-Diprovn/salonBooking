
import { BASE_URL } from '../../../shared/BASE_URL'
import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect, useState, memo } from 'react';
import dayjs from "dayjs";
import DetailConfirmBooking from './DetailConfirmBooking'
import { useAppSelector, useAppDispatch } from "../../../Redux/hookRedux"
import { Advertisement, Booking } from '../../../shared/Interface'
import { isReturnStatement } from 'typescript';

function ShowConfirmBooking() {

    const user = useAppSelector((state) => state.user)
    const [data, setData] = useState<Booking[]>([])
    const [existConfirmBooking, setExistConfirmBooking] = useState<boolean>(false)
    const [loading, setloading] = useState<boolean>(false);
    let currentDay = dayjs().format('YYYY-MM-DD')
    let endDay = dayjs().add(6, 'day').format('YYYY-MM-DD')


    async function Get_ExsistConfirmBookingOfUser() {
        var url = BASE_URL + "/api/v1/bookings?" + 'customerId=' + user.userProperties.Id + '&startDate=' + currentDay + '&endDate=' + endDay + '&status=Confirm'
        await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": 'multipart/form-data'
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
        setloading(false);
    }

    useEffect(() => {
        setloading(true)
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
            {loading ?
                <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                    <ActivityIndicator color="red" size={40} />
                </View>
                :
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={data}
                    horizontal
                    renderItem={({ item }) => renderItem(item)}
                />
            }
        </View>
    )
}
export default memo(ShowConfirmBooking)

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        borderRadius: 10,
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'column',
        marginVertical: 20,
        padding: 10,
    },
    txtTitleTimeLeft: {
        fontSize: 16,
        color: 'red'
    },
    txtPhoneCustomer: {
        fontSize: 18,
        color: '#ffcc33'
    },
    txtMainContent: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FCEFD9'
    },
    txtContent: {
        fontSize: 16,
        color: 'white',
        marginLeft: 5
    },
    rowItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 3
    }
})

