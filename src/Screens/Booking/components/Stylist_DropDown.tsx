
import { BASE_URL } from "../../../shared/BASE_URL"
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from "react-native"
import React, { useState, useEffect, memo, useRef } from "react"
import Icon from "react-native-vector-icons/AntDesign"
import Icon1 from "react-native-vector-icons/Fontisto"
import { img } from "../../../asset/index"
import { Staff } from "../../../shared/Interface"
import { scale, width } from "../../../shared/normalize"
import { responsive } from "../../../shared/responsive"
import { clor } from '../../../shared/color'
import Carousel from 'react-native-anchor-carousel';
import SimplePaginationDot from '../../../components/SimplePaginationDot/SimplePaginationDot'



const sizeText = scale(18)
const INITIAL_INDEX = 0;
const carouselWidth = responsive.WIDTH
const carouselHeight = responsive.WIDTH
const itemWidth = carouselWidth * 0.6



function Stylist_DropDown(props) {

    const [data, setData] = useState<Staff[]>([])
    const [showOption, setShowOption] = useState<boolean>(false)
    const [selectedIndex, setSelectedIndex] = useState<number>(-1)
    const [selectedIDStylist, setSelectedIDStylist] = useState<number>(-1)
    const carouselRef = useRef<any>(null);
    const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);
    function handleCarouselScrollEnd(item, index) {
        setCurrentIndex(index);
    }


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


    const renderItem = (item: Staff, index: number) => {

        return (
            <View style={styles.containerItem}>
                <ImageBackground
                    source={img.barberConfirm}
                    style={styles.imageBackground} />
                <View style={styles.lowerContainer}>
                    <View style={styles.rowItem}>
                        <Text style={styles.txtTitle}>Stylist: </Text>
                        <Text style={styles.txtContent}>{item.name}</Text>
                    </View>
                    <View style={styles.rowItem}>
                        <Text style={styles.txtTitle}>User rating: </Text>
                        <Text style={styles.txtContent}>{item.avg !== undefined ? item.avg + "/5 " : "4/5 "}
                            <Icon1
                                name="star"
                                size={scale(15)}
                                color="#ffcc33"
                            /></Text>
                    </View>
                    <View style={styles.rowItem}>
                        <Text style={styles.txtTitle}>Phone:</Text>
                        <Text style={styles.txtContent}>{item.phone}</Text>
                    </View>
                    <View style={styles.viewFlex1} />
                    <TouchableOpacity
                        onPress={() => {
                            carouselRef.current.scrollToIndex(index);
                            onSelect(index, item.Id)
                            props.onSelectIDStylist(item.Id)
                        }}
                        style={[styles.btnChoose, { backgroundColor: selectedIndex == index ? clor.maincolor : "white" }]}
                    >
                        <Text style={[styles.txtTitle, { color: selectedIndex == index ? "white" : clor.D }]}>Choose</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.DropDown}
                onPress={() => {
                    setShowOption(!showOption)
                }}>
                {
                    showOption ?
                        <SimplePaginationDot currentIndex={currentIndex} length={data.length} />
                        :
                        <>
                            <Text style={styles.txtDropDown}>
                                {selectedIndex != -1 ? data[Number(selectedIndex)].name : "Please choose Stylist here "}
                            </Text>
                            <Icon
                                name={showOption ? "caretdown" : "caretup"}
                                size={scale(20)}
                                color={clor.white}
                            />
                        </>
                }
            </TouchableOpacity>
            {
                showOption &&
                <Carousel
                    style={styles.carousel}
                    data={data}
                    renderItem={({ item, index }) => renderItem(item, index)}
                    separatorWidth={20}
                    itemWidth={itemWidth}
                    onScrollEnd={handleCarouselScrollEnd}
                    ref={carouselRef}
                />
            }
        </View >
    )

}

export default memo(Stylist_DropDown)


const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginVertical: scale(20),
    },
    DropDown: {
        backgroundColor: clor.maincolor,
        borderRadius: 5,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        height: responsive.height(40),
        width: "95%",
        flexDirection: "row"
    },
    carousel: {
        aspectRatio: 1.5,
        height: carouselHeight,
        width: carouselWidth,
        marginTop: 20,
    },
    viewFlex1: {
        flex: 1
    },
    rowItem: {
        flexDirection: "row",
        paddingHorizontal: scale(5)
    },
    txtDropDown: {
        fontSize: scale(16),
        fontWeight: "400",
        color: clor.white,
        marginHorizontal: 3
    },
    containerItem: {
        borderWidth: 2,
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        borderColor: 'white',
        alignSelf: "center",
        elevation: 20,
        shadowColor: '#52006A',
    },
    imageBackground: {
        flex: 2,
        backgroundColor: '#EBEBEB',
        borderWidth: 5,
        borderColor: 'white',
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
    lowerContainer: {
        flex: 1,
        margin: 10,
    },
    txtTitle: {
        fontWeight: 'bold',
        fontSize: sizeText,
        color: clor.C
    },
    txtContent: {
        fontWeight: 'bold',
        fontSize: sizeText,
        color: clor.D
    },
    btnChoose: {
        borderWidth: 2,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        borderColor: clor.A
    }
})