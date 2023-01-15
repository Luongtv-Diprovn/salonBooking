import { BASE_URL } from "../../shared/BASE_URL"
import React, { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../Redux/hookRedux"
import { changeStatusBooking } from "../../Redux/Slice/userSlice";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
  FlatList,
  ImageBackground
} from "react-native"
import Icon from "react-native-vector-icons/AntDesign"
import Toast from "react-native-toast-message"
import { toastConfig, showToast } from "../../components/Toast/ToastNotify"
import { img } from "../../asset/index"
import { scale } from "../../shared/normalize"
import { responsive } from "../../shared/responsive"
import { Booking } from "../../shared/Interface"
import DetailHistory from "./components/DetailHistory"
import { Picker } from "@react-native-picker/picker";
import { clor } from '../../shared/color'
import LottieView from 'lottie-react-native'

export default function HistoryBooking() {
  const user = useAppSelector((state) => state.user)
  const [data, setData] = useState<Booking[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  const [curentPage, setCurentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0)
  const [refresh, setFresh] = useState<boolean>(false)
  const pageSize = 5
  //Open,Value,Items dùng cho dropdown
  const [selectedDropdown, setSelectedDropdown] = useState<any>("");
  const [items, setItems] = useState([
    { label: "All Booking", value: "" },
    { label: "Pending", value: "Pending" },
    { label: "Done", value: "Done" },
    { label: "Cancel", value: "Cancel" },
    { label: "Confirm", value: "Confirm" }
  ]);

  function onLoading(load) {
    setloading(load);
  }

  const handleRefresh = () => {
    setFresh(true)
    get_HistoryBooking()
    setTimeout(() => {
      setFresh(false)
    }, 5000)
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
            setData(value.bookings)
          });
      }
      else {
        setCurentPage(0)
        setTotalPage(0)
        setData([])
      }
    })
    setloading(false);
  }

  function handleNextPage() {
    setCurentPage(curentPage + 1)
  }

  function handlePrevPage() {
    setCurentPage(curentPage - 1)
  }

  useEffect(() => {
    setloading(true)
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

  return (
    <View style={styles.container}>
      {
        loading ?
          <LottieView source={img.waiting} autoPlay />
          :
          <>
            {
              data.length !== 0 ?
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={data}
                  renderItem={({ item, index }) => renderItem(item, index)}
                  refreshControl={
                    <RefreshControl refreshing={refresh} onRefresh={handleRefresh} colors={[clor.maincolor]} />
                  }
                />
                :
                <Image
                  source={img.notfound}
                  resizeMode={"center"}
                  style={styles.IMGNotFound}
                />
            }
            <View style={styles.containerButton}>
              <TouchableOpacity
                disabled={curentPage == 1 ? true : false}
                onPress={handlePrevPage}
              >
                <Icon
                  name={"banckward"}
                  size={scale(25)}
                  style={{ opacity: 1 }}
                  color={clor.A}
                />

              </TouchableOpacity>
              <Text style={styles.txtPage}>{curentPage + "/" + totalPage}</Text>
              <TouchableOpacity
                disabled={curentPage < totalPage ? false : true}
                onPress={handleNextPage}
              >
                <Icon
                  name={"forward"}
                  size={scale(25)}
                  color={clor.A}
                />
              </TouchableOpacity>
            </View>
            <Picker
              itemStyle={{ fontSize: scale(16) }}
              selectedValue={selectedDropdown}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedDropdown(itemValue)
              }>
              <Picker.Item label="All Booking" value="" />
              <Picker.Item label="Pending" value="Pending" />
              <Picker.Item label="Confirm" value="Confirm" />
              <Picker.Item label="Done" value="Done" />
              <Picker.Item label="Cancel" value="Cancel" />
            </Picker>
          </>
      }
      <Toast config={toastConfig} />

    </View >

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: clor.grayLight,
    height: "100%",
  },
  IMGNotFound: {
    flex: 1,
    alignSelf: "center"
  },
  containerButton: {
    flexDirection: "row",
    padding: 10,
    zIndex: 1,
    borderRadius: 20,
    alignSelf: "center",
    backgroundColor: "gray",
    position: "absolute",
    bottom: responsive.HEIGHT * 1 / 10,
    opacity: 0.8
  },
  txtPage: {
    fontSize: scale(16),
    fontWeight: "bold",
    color: clor.D,
    marginHorizontal: scale(15),
  },
});
