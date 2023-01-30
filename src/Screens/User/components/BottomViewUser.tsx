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
import { clor } from '../../../shared/color'


const sizeTxt = scale(16)
const membershipClass = ["platinum", "gold", "medium", "normal"]


function BottomViewUser() {

  const user = useAppSelector((state) => state.user)
  const [heightOfContainer, setHeightOfContainer] = React.useState<number>(0)
  const numRow = 6
  const heightRowItem = heightOfContainer / numRow
  const sizeIcon = heightRowItem / 3

  return (

    <View style={styles.bottomView}
      onLayout={(event) => {
        setHeightOfContainer(event.nativeEvent.layout.height)
      }}
    >
      <View style={[styles.rowInfo, { height: heightRowItem }]}>
        <Icon
          name={"mobile"}
          size={sizeIcon}
          style={styles.icon}
          color={clor.grayForTxt} />
        <View>
          <Text style={styles.titleInRow}>Phone number</Text>
          <Text style={styles.valueInRow}>{user.userProperties.phone}</Text>
        </View>
      </View>
      <View style={styles.lineHorizone} />
      <View style={[styles.rowInfo, { height: heightRowItem }]}>
        <Icon
          name={"cake"}
          size={sizeIcon}
          style={styles.icon}
          color={clor.grayForTxt} />
        <View>
          <Text style={styles.titleInRow}>Birthday</Text>
          <Text style={styles.valueInRow}>{dayjs(user.userProperties.birthday).format("YYYY-MM-DD")}</Text>
        </View>
      </View>
      <View style={styles.lineHorizone} />
      <View style={[styles.rowInfo, { height: heightRowItem }]}>
        <Icon
          name={"address"}
          size={sizeIcon}
          style={styles.icon}
          color={clor.grayForTxt} />
        <View>
          <Text style={styles.titleInRow}>Address</Text>
          <Text style={styles.valueInRow}>{user.userProperties.address}</Text>
        </View>
      </View>
      <View style={styles.lineHorizone} />
      <View style={[styles.rowInfo, { height: heightRowItem }]}>
        <Icon
          name={"500px-with-circle"}
          size={sizeIcon}
          style={styles.icon}
          color={clor.grayForTxt} />
        <View>
          <Text style={styles.titleInRow}>Accumulated point</Text>
          <Text style={styles.valueInRow}>{user.userProperties.point}</Text>
        </View>
      </View>
      <View style={styles.lineHorizone} />
      <View style={[styles.rowInfo, { height: heightRowItem }]}>
        <Icon
          name={"trophy"}
          size={sizeIcon}
          style={styles.icon}
          color={clor.grayForTxt} />
        <View>
          <Text style={styles.titleInRow}>Memembership class</Text>
          <Text style={styles.valueInRow}>{membershipClass[user.userProperties.customerTypeId - 1]}</Text>
        </View>
      </View>
      <View style={styles.lineHorizone} />
      <View style={[styles.rowInfo, { height: heightRowItem }]}>
        <Icon
          name={"price-tag"}
          size={sizeIcon}
          style={styles.icon}
          color={clor.grayForTxt} />
        <View>
          <Text style={styles.titleInRow}>Discount</Text>
          <Text style={styles.valueInRow}>{user.userProperties.customerType.percent + "%"}</Text>
        </View>
      </View>
    </View>
  )
}

export default memo(BottomViewUser)

const styles = StyleSheet.create({
  bottomView: {
    backgroundColor: "white",
    flex: 3,
    width: "100%",
    justifyContent: "center"
  },
  lineHorizone: {
    borderWidth: 0.5,
    width: "90%",
    alignSelf: "center",
    borderColor: clor.grayLight,
  },
  icon: {
    marginHorizontal: 20
  },
  rowInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  titleInRow: {
    color: clor.grayForTxt,
    fontSize: sizeTxt

  },
  valueInRow: {
    color: clor.blackForTxt,
    fontSize: sizeTxt,
    fontWeight: "600"
  }
})