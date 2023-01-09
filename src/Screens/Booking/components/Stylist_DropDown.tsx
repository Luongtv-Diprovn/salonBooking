
import { BASE_URL } from "../../../shared/BASE_URL"
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native"
import React, { useState, useEffect, memo } from "react"
import Icon from "react-native-vector-icons/AntDesign"
import Icon1 from "react-native-vector-icons/Fontisto"
import { img } from "../../../asset/index"
import { Staff } from "../../../shared/Interface"
import { scale } from "../../../shared/normalize"
import { responsive } from "../../../shared/responsive"

function StylistView(props) {

    return (
        <TouchableOpacity style={[styles.btnChooseStylist, {
            backgroundColor: props.stylist.Id == props.selectedIDStylist ? "#ffcc33" : "white"
        }]}
            onPress={() => {
                props.onSelect(props.index, props.stylist.Id)
            }}>
            <Image style={styles.img}
                resizeMode="contain"
                source={img.iconStylist} />
            <Text style={[styles.txt, { flex: 1 }]}>{props.stylist.name}</Text>
        </TouchableOpacity>

    )
}

function Stylist_DropDown(props) {

    const [data, setData] = useState<Staff[]>([])
    const [showOption, setShowOption] = useState<boolean>(false)
    const [selectedIndex, setSelectedIndex] = useState<number>(-1)
    const [selectedIDStylist, setSelectedIDStylist] = useState<string>("")

    function onSelect(index: number, id: string) {
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
        setSelectedIDStylist("")
        setShowOption(false)
    }, [props.statusBooking])


    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.DropDown}
                onPress={() => {
                    setShowOption(!showOption)
                }}>
                <Text style={[styles.txt, { color: selectedIndex != -1 ? "red" : "black", marginHorizontal: 3 }]}>
                    {selectedIndex != -1 ? data[Number(selectedIndex)].name : "Please choose Stylist here"}
                </Text>
                <Icon
                    name={showOption ? "caretdown" : "caretup"}
                    size={scale(20)}
                    color={"black"}
                />
            </TouchableOpacity>
            {
                showOption && selectedIndex != -1 &&
                <View style={styles.containerDetail}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={styles.containerTopLeft}>
                            <Icon1
                                name="person"
                                size={scale(15)}
                                color="black" />
                            <Text style={[styles.txt, { marginHorizontal: 5, color: "#AB1207" }]}>Stylist: {data[Number(selectedIndex)].gender ? "Mr." : "Ms."}{data[Number(selectedIndex)].name}</Text>
                        </View>
                        <View style={styles.containerTopRight}>
                            <Text style={[styles.txt, { fontWeight: "bold" }]}>User rating:</Text>
                            <Text style={[styles.txt, { marginHorizontal: 3 }]}>{(data[Number(selectedIndex)].avg != "" && data[Number(selectedIndex)].avg != null) ? data[Number(selectedIndex)].avg : 4} /5</Text>
                            <Icon1
                                name="star"
                                size={scale(15)}
                                color="#ffcc33"
                            />
                        </View>
                    </View>
                    <Text style={styles.txt}>{data[Number(selectedIndex)].description}</Text>
                </View>
            }
            {
                showOption &&
                <ScrollView horizontal>
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
        </View >
    )

}

export default memo(Stylist_DropDown)


const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        margin: 10,
        alignSelf: "center"

    },
    DropDown: {
        backgroundColor: "#f7f7f7",
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
        color: "black",
    },
    btnChooseStylist: {
        flexDirection: "row",
        alignItems: "center",
        margin: 8,
        height: responsive.height(100),
        width: 200,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "darkgray",
        padding: 5
    },
    img: {
        height: responsive.width(80),
        width: responsive.width(80),
        borderRadius: 50,
        margin: 3,
        marginRight: 10
    },
    containerDetail: {
        flexDirection: "column",
        width: "95%",
        backgroundColor: "#ebf7ef",
        borderRadius: 10,
        padding: 5,
        margin: 10
    },
    containerTopLeft: {
        flex: 0.6,
        flexDirection: "row",
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    containerTopRight: {
        flex: 0.4,
        flexDirection: "row",
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center"
    },
})