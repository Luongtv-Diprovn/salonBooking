import { BASE_URL } from "../../shared/BASE_URL"
import React, { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../Redux/hookRedux"
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
  FlatList,
} from "react-native"
import Toast from "react-native-toast-message"
import { toastConfig, showToast } from "../../components/Toast/ToastNotify"
import { img } from "../../asset/index"
import { scale } from "../../shared/normalize"
import { Booking } from "../../shared/Interface"
import DetailHistory from "./components/DetailHistory"
import { Picker } from "@react-native-picker/picker"
import { clor } from "../../shared/color"
import LottieView from "lottie-react-native"

const sizeTxtPage = scale(18)

export default function HistoryBooking() {

  const user = useAppSelector((state) => state.user)
  const [data, setData] = useState<Booking[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  const [curentPage, setCurentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0)
  const [refresh, setFresh] = useState<boolean>(false)
  const [loadmore, setLoadmore] = useState<boolean>(false)
  const pageSize = 5
  const [selectedDropdown, setSelectedDropdown] = useState<any>("");
  const ListDropDown = [
    {
      label: "All Booking",
      value: ""
    },
    {
      label: "Pending",
      value: "Pending"
    },
    {
      label: "Confirm",
      value: "Confirm"
    },
    {
      label: "Done",
      value: "Done"
    },
    {
      label: "Cancel",
      value: "Cancel"
    }
  ]

  function onLoading(load) {
    setloading(load);
  }


  async function get_HistoryBooking() {

    var url = BASE_URL + "/api/v1/bookings?" + "customerId=" + user.userProperties.Id + "&page=" + curentPage + "&pageSize=" + pageSize + "&status=" + selectedDropdown
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    }).then((response) => {
      if (response.status == 200) {
        Promise.resolve(response.json())
          .then((value) => {
            setTotalPage(value.totalPage)
            setData(data.concat(value.bookings))
          });
      }
      else {
        setCurentPage(0)
        setTotalPage(0)
      }
    })
    setloading(false);
  }

  const handleRefresh = () => {
    if (!refresh && loadmore == false) {
      console.log("hi")
      setFresh(true)
      setData([])
      setCurentPage(1)
      get_HistoryBooking()
      setTimeout(() => {
        setFresh(false)
      }, 5000)
    }
  }

  const handleLoadMore = () => {
    if (!loadmore && refresh == false && curentPage < totalPage) {
      setLoadmore(true)
      setCurentPage(prev => prev + 1)
      setTimeout(() => {
        setLoadmore(false)
      }, 5000)
    }
  }

  useEffect(() => {
    setloading(true)
    get_HistoryBooking()
  }, [])

  useEffect(() => {
    get_HistoryBooking()
  }, [curentPage, user.userProperties.statusBooking])

  useEffect(() => {
    setloading(true)
    get_HistoryBooking()
  }, [selectedDropdown]);

  const renderItem = (item: Booking, index: number) => {
    return (
      <DetailHistory
        history={item}
        index={index}
        showToast={(type, text1, txt) => { showToast(type, text1, txt) }}
        onLoading={(load) => onLoading(load)} />
    )
  }

  const renderLoadMore = () => {
    return (
      <>
        {
          loadmore ?
            <View style={styles.viewLoadMore}>
              <ActivityIndicator size={scale(40)} color={clor.maincolor} />
            </View>
            :
            <></>
        }
      </>
    )
  }

  return (
    <View style={styles.container}>
      {
        loading ?
          <LottieView source={img.waiting} autoPlay />
          :
          <>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingTop: scale(50) }}
              data={data}
              renderItem={({ item, index }) => renderItem(item, index)}
              refreshControl={
                <RefreshControl refreshing={refresh} onRefresh={handleRefresh} colors={[clor.maincolor]} />
              }
              ListFooterComponent={renderLoadMore}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0}
            />
            <Picker
              dropdownIconColor={clor.maincolor}
              dropdownIconRippleColor={clor.D}
              selectedValue={selectedDropdown}
              onValueChange={(itemValue, itemIndex) => {
                setData([])
                setCurentPage(1)
                setSelectedDropdown(itemValue)
              }}>
              {
                ListDropDown.map((item, index) => <Picker.Item key={index} label={item.label} value={item.value} color={clor.maincolor} style={{ fontSize: scale(15) }} />)
              }
            </Picker>
          </>
      }
      <Toast config={toastConfig} />
      {/* <View style={styles.viewPage}>
        <Text style={styles.txtPage}>{curentPage + "/" + totalPage}</Text>
      </View> */}
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: clor.white,
  },
  viewPage: {
    flexDirection: "row",
    zIndex: 1,
    borderBottomRightRadius: sizeTxtPage / 2,
    alignSelf: "center",
    backgroundColor: clor.B,
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0.8
  },
  txtPage: {
    fontSize: sizeTxtPage,
    fontWeight: "bold",
    color: clor.white,
    marginHorizontal: scale(15),
  },
  viewLoadMore: {
    marginBottom: 50,
    justifyContent: "center"
  }
});
