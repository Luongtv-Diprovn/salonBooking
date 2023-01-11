import React, { memo } from "react"
import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from "react-native"
import { useAppSelector, useAppDispatch } from "../../../Redux/hookRedux"
import Icon from "react-native-vector-icons/Entypo"
import dayjs from "dayjs";
import { scale } from '../../../shared/normalize'

function BottomViewUser() {

  const user = useAppSelector((state) => state.user)
  const color_trophy = ["yellow", "gray", "orange", "white"]

  return (

    <View style={styles.bottomView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.rowInfo}>
          <Text style={styles.titleInRow}>Birthday:</Text>
          <View style={styles.viewFlex1} />
          <Text style={styles.valueInRow}>{dayjs(user.userProperties.birthday).format("YYYY-MM-DD")}</Text>
        </View>
        <View style={styles.lineHorizone} />
        <View style={styles.rowInfo}>
          <Text style={styles.titleInRow}>Address:</Text>
          <View style={styles.viewFlex1} />
          <Text style={styles.valueInRow}>{user.userProperties.address}</Text>
        </View>
        <View style={styles.lineHorizone} />
        <View style={styles.rowInfo}>
          <Text style={styles.titleInRow}>Accumulated points:</Text>
          <View style={styles.viewFlex1} />
          <Text style={styles.valueInRow}>{Number.isInteger(user.userProperties.point) ? user.userProperties.point : 0}</Text>
        </View>
        <View style={styles.lineHorizone} />
        <View style={styles.rowInfo}>
          <Text style={styles.titleInRow}>Membership class:</Text>
          <View style={styles.viewFlex1} />
          <Icon
            name={"trophy"}
            size={scale(28)}
            color={color_trophy[user.userProperties.customerTypeId - 1]} />
        </View>
        <View style={styles.lineHorizone} />
        <View style={styles.rowInfo}>
          <Text style={styles.titleInRow}>Discount:</Text>
          <View style={styles.viewFlex1} />
          <Text style={styles.valueInRow}>{Number.isInteger(user.userProperties.customerType.percent) ? user.userProperties.customerType.percent + "%" : "0%"} </Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default memo(BottomViewUser)

const styles = StyleSheet.create({
  bottomView: {
    backgroundColor: "black",
    flex: 0.4,
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 25,
    justifyContent: "center"
  },
  viewFlex1: {
    flex: 1
  },
  lineHorizone: {
    borderWidth: 0.55,
    borderColor: "white",
    marginHorizontal: 8,
  },
  rowInfo: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginTop: 3
  },
  titleInRow: {
    color: "#9CA1A3",
    fontSize: scale(16)
  },
  valueInRow: {
    color: "white",
    fontSize: scale(16),
    fontWeight: "bold"
  }
})