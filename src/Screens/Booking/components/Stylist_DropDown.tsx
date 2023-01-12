
import { BASE_URL } from "../../../shared/BASE_URL"
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native"
import React, { useState, useEffect, memo } from "react"
import Icon from "react-native-vector-icons/AntDesign"
import Icon1 from "react-native-vector-icons/Fontisto"
import { img } from "../../../asset/index"
import { Staff } from "../../../shared/Interface"
import { scale } from "../../../shared/normalize"
import { responsive } from "../../../shared/responsive"
import { clor } from '../../../shared/color'

interface receiveStylistView {
    stylist: Staff,
    selectedIDStylist: number
    index: number
    onSelect: any
}

const numItemInRow = 3
const marginHorizonItemStylist = scale(12)
const sizeIMG = (responsive.WIDTH - marginHorizonItemStylist * 2 * numItemInRow) / numItemInRow

function StylistView(props: receiveStylistView) {

    return (
        <View style={{ alignItems: "center" }}>
            <TouchableOpacity style={[styles.btnChooseStylist, {
                borderColor: props.stylist.Id == props.selectedIDStylist ? clor.maincolor : "white"
            }]}
                onPress={() => {
                    props.onSelect(props.index, props.stylist.Id)
                }}>
                <Image style={styles.img}
                    resizeMode="contain"
                    source={img.barberConfirm} />

            </TouchableOpacity>
            <Text style={[styles.txt, { flexShrink: 1, color: clor.D }]}>{props.stylist.name}</Text>
        </View>

    )
}

function Stylist_DropDown(props) {

    const [data, setData] = useState<Staff[]>([])
    const [showOption, setShowOption] = useState<boolean>(false)
    const [selectedIndex, setSelectedIndex] = useState<number>(-1)
    const [selectedIDStylist, setSelectedIDStylist] = useState<number>(-1)

    function onSelect(index: number, id: number) {
        setSelectedIndex(index)
        setSelectedIDStylist(id)
    }


    async function Get_AllStylist() {
        var url = BASE_URL + "/api/v1/staffs?roleId=2"
        await fetch(url, {
            method: "GET"
        }).then((response) => {
            if (response.status == 200) {
                Promise.resolve(response.json())
                    .then((value) => {
                        setData(value.staffs)
                    });
            }
        })
    }

    useEffect(() => {
        Get_AllStylist()
    }, [])

    useEffect(() => {
        props.onSelectIDStylist(selectedIDStylist)
    }, [selectedIDStylist])

    useEffect(() => {
        setSelectedIndex(-1)
        setSelectedIDStylist(-1)
        setShowOption(false)
    }, [props.statusBooking])


    return (
        <View style={styles.container}>

            <TouchableOpacity
                style={styles.DropDown}
                onPress={() => {
                    setShowOption(!showOption)
                }}>
                <Text style={[styles.txt, { color: clor.white, marginHorizontal: scale(3) }]}>
                    {selectedIndex != -1 ? data[Number(selectedIndex)].name : "Please choose Stylist here"}
                </Text>
                <Icon
                    name={showOption ? "caretdown" : "caretup"}
                    size={scale(20)}
                    color={clor.white}
                />
            </TouchableOpacity>
            {
                showOption &&
                <ScrollView horizontal style={{ paddingBottom: 8 }}>
                    {data.map((stylist, index) => {
                        return (
                            <View key={index}>
                                <StylistView
                                    stylist={stylist}
                                    index={index}
                                    onSelect={(item, id) => {
                                        onSelect(item, id)
                                        setShowOption(true)
                                    }}
                                    selectedIDStylist={selectedIDStylist} />
                            </View>
                        )
                    })}
                </ScrollView>
            }
            {
                showOption && selectedIndex != -1 &&
                <View style={styles.containerDetail}>
                    <View style={styles.containerTop}>
                        <Text style={[styles.txt, { fontWeight: "bold", color: "black" }]}>User rating:</Text>
                        <Text style={[styles.txt, { marginHorizontal: scale(3) }]}>{(data[Number(selectedIndex)].avg != "" && data[Number(selectedIndex)].avg != null) ? data[Number(selectedIndex)].avg : 4} /5</Text>
                        <Icon1
                            name="star"
                            size={scale(15)}
                            color="#ffcc33"
                        />
                    </View>
                    {
                        ((data[Number(selectedIndex)].description !== "") && (data[Number(selectedIndex)].description !== null)) ?
                            <Text style={styles.txt}>{data[Number(selectedIndex)].description}</Text>
                            :
                            <></>
                    }
                </View>
            }

        </View >
    )

}

export default memo(Stylist_DropDown)


const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        marginVertical: scale(20),
        alignSelf: "center"

    },
    viewFlex1: {
        flex: 1
    },
    DropDown: {
        backgroundColor: clor.maincolor,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        height: responsive.height(40),
        width: "95%",
        flexDirection: "row"
    },
    verticleLine: {
        height: "100%",
        width: 2,
        marginHorizontal: 5,
        backgroundColor: "black",
    },
    txt: {
        fontSize: scale(15),
        fontWeight: "400",
        color: clor.white,
    },
    btnChooseStylist: {
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: marginHorizonItemStylist,
        marginVertical: scale(10),
        borderWidth: 5,
        borderColor: clor.white,
        borderRadius: sizeIMG / 2,
        padding: 1.5
    },
    img: {
        height: sizeIMG,
        width: sizeIMG,
        borderRadius: sizeIMG / 2,
    },
    containerDetail: {
        flexDirection: "column",
        width: "80%",
        backgroundColor: clor.D,
        borderRadius: 10,
        padding: 5,
        margin: scale(10)
    },
    containerTop: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center"
    },
})