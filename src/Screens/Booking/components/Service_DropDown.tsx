import { BASE_URL } from "../../../shared/BASE_URL"
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native"
import React, { useState, useEffect, memo } from "react"
import Icon from "react-native-vector-icons/AntDesign"
import Icon1 from "react-native-vector-icons/Ionicons"
import Icon2 from "react-native-vector-icons/MaterialIcons"
import { useAppSelector, useAppDispatch } from "../../../Redux/hookRedux"
import { responsive } from '../../../shared/responsive'
import { scale } from '../../../shared/normalize'
import { Service, ServiceType } from '../../../shared/Interface'
import { img } from '../../../asset/index'

function Services_View(props) {
  const [showDecription, setShowDecription] = useState(false);
  var choose = props.service.Id == props.listChooseIDService[props.indexServiceType] ? true : false
  var listChooseIdServices = [...props.listChooseIDService]
  var listChooseService = [...props.listChooseService]
  return (
    <>
      <TouchableOpacity
        style={[styles.btnChooseService, { backgroundColor: choose ? "#ffcc33" : "white" }]}
        onPress={() => {
          if (choose) {
            listChooseIdServices[props.indexServiceType] = ""
            listChooseService[props.indexServiceType] = null
            props.onChangeListChoose(listChooseIdServices, listChooseService)
          }
          else {
            listChooseIdServices[props.indexServiceType] = props.service.Id
            listChooseService[props.indexServiceType] = props.service
            props.onChangeListChoose(listChooseIdServices, listChooseService)
          }
        }}
      >
        <View style={styles.viewService}>
          <Image
            style={styles.img}
            resizeMode="contain"
            source={img.iconService}
          />
          <View style={styles.viewDetail}>
            <Text style={[styles.txt, { marginBottom: 14, marginRight: 3, alignSelf: "center" }]} numberOfLines={3}>
              {props.service.name}
            </Text>
            <Text style={styles.txtMoney}>
              {
                Number(props.service.price).toLocaleString("vi-VN", { style: "currency", currency: "VND" })
              }
            </Text>
          </View>
          <TouchableOpacity
            onLongPress={() => {
              setShowDecription(!showDecription);
            }}
          >
            <Icon1
              name={"md-information-circle-outline"}
              size={scale(35)}
              style={styles.iconDetail}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      {showDecription && (
        <View style={styles.viewDescription}>
          <Icon2 name={"details"} size={scale(22)} />
          <Text
            style={styles.decription}
          >
            {props.service.description}
          </Text>
        </View>
      )}
    </>
  );
}

function ServiceType_View(props) {
  const [showOption, setShowOption] = useState(false);
  return (
    <>
      <TouchableOpacity
        style={styles.btnServiceType}
        onPress={() => {
          setShowOption(!showOption);
        }}
      >
        <View style={styles.viewServiceType}>
          <Text style={styles.txt} numberOfLines={2}>
            {props.serviceType + " (" + props.services.length + ")"}
          </Text>
        </View>
      </TouchableOpacity>
      {showOption &&
        <ScrollView horizontal>
          {props.services.map((item: Service, index: number) => {
            return (
              <View key={index}>
                <Services_View
                  service={item}
                  index={index}
                  indexServiceType={props.indexServiceType}
                  listChooseIDService={props.listChooseIDService}
                  listChooseService={props.listChooseService}
                  onChangeListChoose={(listId, listService) => { props.onChangeListChoose(listId, listService) }}
                />
              </View>
            );
          })}
        </ScrollView>
      }
    </>
  );
}

function Service_DropDown(props) {
  const [data, setData] = useState([])
  const [showOption, setShowOption] = useState(false)
  const [listChooseIDService, setListChooseIDService] = useState([])
  const [listChooseService, setListChooseService] = useState([])
  const user = useAppSelector((state) => state.user)
  const MoneyForAll = TotalMoney()

  const check = (element) => element != "";

  const onChangeListChoose = (listId, listService) => {
    setListChooseIDService(listId)
    setListChooseService(listService)
  }

  function TotalMoney() {
    var AllMoney = 0;
    var AllMoneyNoDiscountByRankOrVoucher = 0
    listChooseService.forEach((item: Service) => {
      if (item != null) {
        AllMoney += Number(item.price);
      }
    });
    AllMoneyNoDiscountByRankOrVoucher = AllMoney
    //recalculate the total amount after discounting by account rank
    AllMoney = Number(user.userProperties.customerType.percent) != 0 ? AllMoney * (1 - Number(user.userProperties.customerType.percent) / 100) : AllMoney
    //recalculate total amount after applying voucher for discount
    AllMoney = props.existVoucher != null ? AllMoney * (1 - props.existVoucher.discount / 100) : AllMoney
    return {
      AllMoney, AllMoneyNoDiscountByRankOrVoucher
    }
  }

  async function Get_Service() {
    var url = BASE_URL + "/api/v1/serviceTypes"
    await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + user.userProperties.Token.token
      },
    }).then((response) => {
      if (response.status == 200) {
        Promise.resolve(response.json())
          .then((value) => {
            setData(value)
          });
      }
    })
  }

  useEffect(() => {
    Get_Service();
  }, []);

  useEffect(() => {
    props.onSelectedIDServices(listChooseIDService);
  }, [listChooseIDService]);

  useEffect(() => {
    setListChooseIDService([])
    setListChooseService([])
    setShowOption(false)
  }, [props.statusBooking])


  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.DropDown}
        onPress={() => {
          setShowOption(!showOption);
        }}
      >
        <View style={styles.viewDropDown}>
          <Text style={[styles.txt, { fontWeight: "400" }]}> Please choose Service here </Text>
          <Icon
            name={showOption ? "caretdown" : "caretup"}
            size={scale(20)}
            color={"black"} />
        </View>
      </TouchableOpacity>
      {showOption &&
        <>
          {data.map((item: ServiceType, indexServiceType) => {
            return (
              <ServiceType_View
                key={indexServiceType}
                serviceType={item.name}
                indexServiceType={indexServiceType}
                services={item.services}
                listChooseIDService={listChooseIDService}
                listChooseService={listChooseService}
                onChangeListChoose={(listId: number[], listService: Service[]) => { onChangeListChoose(listId, listService) }}
              />
            );
          })}
        </>
      }
      {listChooseIDService.length != 0 &&
        listChooseIDService.some(check) &&
        showOption == false ?
        <View style={styles.viewChooseOption}>
          <Text style={[styles.txtAfterChoose, { color: "red", fontSize: scale(16) }]}>All services you have choose</Text>
          {listChooseService.map((item: Service, index) => {
            if (item != null) {
              return (
                <Text key={index} style={[styles.txtAfterChoose, { color: "blue" }]}>+ {item.name}</Text>
              );
            }
          })}
          {
            Number(user.userProperties.customerType.percent) != 0 ?
              <Text style={styles.txtAfterChoose}>
                {
                  "Discounts by membership class " + user.userProperties.customerType.percent + "%"
                }
              </Text>
              :
              <></>
          }
          {
            props.existVoucher != null ?
              <Text style={styles.txtAfterChoose}>
                {
                  "Discounts by voucher " + props.existVoucher.discount + "%"
                }
              </Text>
              :
              <></>
          }
          <Text style={styles.txtAfterChoose}>
            {
              ((Number(user.userProperties.customerType.percent) != 0) || (props.existVoucher != null)) ?
                "Total money(without discount): " + Number(MoneyForAll.AllMoneyNoDiscountByRankOrVoucher).toLocaleString("vi-VN", { style: "currency", currency: "VND" }) + "\n"
                + "Total money(discount): " + Number(MoneyForAll.AllMoney).toLocaleString("vi-VN", { style: "currency", currency: "VND" })
                :
                "Tổng tiền: " + Number(MoneyForAll.AllMoney).toLocaleString("vi-VN", { style: "currency", currency: "VND" })
            }
          </Text>
        </View>
        :
        <></>
      }
    </View>
  );
}
export default memo(Service_DropDown)

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    margin: 10,
    alignSelf: "center",
  },
  DropDown: {
    backgroundColor: "#f7f7f7",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: responsive.height(40),
    width: responsive.WIDTH * 0.95,
  },
  viewDropDown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  viewDescription: {
    alignItems: "center",
    flexDirection: "row",
    width: responsive.WIDTH * 0.9,
    backgroundColor: "#f79397",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignSelf: "center",
  },
  viewChooseOption: {
    flex: 1,
    flexDirection: "column",
    width: responsive.WIDTH * 0.9,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  decription: {
    alignSelf: "center",
    fontSize: scale(14),
    flex: 1,
    paddingLeft: 5,
  },
  btnChooseService: {
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: 10,
    height: responsive.height(120),
    width: responsive.WIDTH * 0.9,
    marginHorizontal: responsive.WIDTH * 0.1 / 2,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#c1d7ea",
  },
  viewService: {
    flexDirection: "row",
    flex: 1,
  },
  img: {
    height: responsive.height(100),
    width: responsive.height(100),
    borderRadius: 18,
    margin: 8
  },
  viewDetail: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  },
  iconDetail: {
    position: "absolute",
    bottom: -3,
    left: -40,
    color: "black"
  },
  txt: {
    fontSize: scale(15),
    fontWeight: "bold",
    color: "black"
  },
  btnServiceType: {
    backgroundColor: "#c1d7ea",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    margin: 8,
    height: responsive.height(40),
    width: "90%",
    borderRadius: 5,
  },
  viewServiceType: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  txtAfterChoose: {
    fontSize: scale(15),
    color: "green"
  },
  txtMoney: {
    fontSize: scale(16),
    fontWeight: "bold",
    color: "#142FA8",
    position: "absolute",
    bottom: 5
  }
});
