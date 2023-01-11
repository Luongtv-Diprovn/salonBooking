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
  FlatList,
} from "react-native"
import Icon from "react-native-vector-icons/AntDesign"
import Toast from "react-native-toast-message"
import { toastConfig, showToast } from "../../components/Toast/ToastNotify"
import { img } from '../../asset/index'
import { scale } from '../../shared/normalize'
import { responsive } from '../../shared/responsive'
import { Booking } from '../../shared/Interface'
import DetailHistory from './components/DetailHistory'
import { Picker } from '@react-native-picker/picker';

export default function HistoryBooking() {
  const user = useAppSelector((state) => state.user)
  const [data, setData] = useState<Booking[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  const [curentPage, setCurentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0)
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
          <ActivityIndicator color="red" size={scale(40)} style={styles.Indicator} />
          :
          <View>
            {
              data.length !== 0 ?
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={data}
                  renderItem={({ item, index }) => renderItem(item, index)}
                />
                :
                <Image
                  source={img.notfound}
                  resizeMode={"contain"}
                  style={styles.IMGNotFound}
                />
            }
            <View style={styles.containerOption}>
              <View style={styles.containerButton}>
                <TouchableOpacity
                  disabled={curentPage == 1 ? true : false}
                  onPress={handlePrevPage}>
                  <Icon
                    name={"banckward"}
                    size={scale(25)}
                  />
                </TouchableOpacity>
                <Text style={styles.txtPage}>{"Page " + curentPage + "/" + totalPage}</Text>
                <TouchableOpacity
                  disabled={curentPage < totalPage ? false : true}
                  onPress={handleNextPage}
                >
                  <Icon
                    name={"forward"}
                    size={scale(25)}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnRefresh}
                  onPress={() => {
                    setloading(true)
                    setCurentPage(1)
                    get_HistoryBooking()
                  }}>
                  <Text style={styles.txtRefresh}>REFRESH</Text>
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
            </View>
          </View >
      }
      <Toast config={toastConfig} />
    </View >

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  Indicator: {
    flex: 1,
    alignSelf: "center"
  },
  IMGNotFound: {
    flex: 1,
    alignSelf: "center"
  },
  containerOption: {
    height: responsive.HEIGHT * 1 / 6,
    width: "100%",
    flexDirection: "column",
    padding: scale(8),
    alignSelf: "center"
  },
  containerButton: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center"
  },
  txtPage: {
    fontSize: scale(16),
    fontWeight: "400",
    color: "black",
    marginHorizontal: scale(5)
  },
  btnRefresh: {
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "#ffcc33",
    flexGrow: 1,
    marginLeft: scale(10),
    padding: scale(4)
  },
  txtRefresh: {
    alignSelf: "center",
    fontSize: scale(20),
    fontWeight: "bold",
    color: "white"
  }
});
