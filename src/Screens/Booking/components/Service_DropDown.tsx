import { BASE_URL } from "../../../shared/BASE_URL"
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native"
import React, { useState, useEffect, memo, useRef } from "react"
import Icon from "react-native-vector-icons/AntDesign"
import Icon1 from "react-native-vector-icons/Ionicons"
import Icon2 from "react-native-vector-icons/MaterialIcons"
import { useAppSelector, useAppDispatch } from "../../../Redux/hookRedux"
import { responsive } from "../../../shared/responsive"
import { scale } from "../../../shared/normalize"
import { Service, ServiceType } from "../../../shared/Interface"
import { img } from "../../../asset/index"
import { clor } from "../../../shared/color"
import Carousel from "react-native-anchor-carousel"
import SimplePaginationDot from "../../../components/SimplePaginationDot/SimplePaginationDot"
import { TotalMoney } from "../../../shared/Function/handle"

const sizeText = scale(16)
const INITIAL_INDEX = 0;
const carouselWidth = responsive.WIDTH
const carouselHeight = responsive.WIDTH
const itemWidth = carouselWidth * 0.6


interface receive {
    key: number
    serviceType: string
    indexServiceType: number
    services: Service[]
    listChooseIDService: string[]
    listChooseService: Service[]
    onChangeListChoose: any
}

function ServiceType_View(props: receive) {
    const [showOption, setShowOption] = useState(false);
    const [showDecription, setShowDecription] = useState<boolean>(false)
    const carouselRef = useRef<any>(null);
    const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);
    function handleCarouselScrollEnd(item, index) {
        setCurrentIndex(index);
    }

    const renderItem = (item: Service, index: number, indexServiceType: number, listChooseIDService: string[], listChooseService: Service[], onChangeListChoose: any) => {
        var choose = item.Id == listChooseIDService[String(indexServiceType)] ? true : false
        var listChooseIDService_new = [...listChooseIDService]
        var listServiceChoose_new = [...listChooseService]

        return (
            <View style={styles.containerItem}>

                <ImageBackground
                    source={img.background}
                    style={styles.imageBackground}>
                    <TouchableOpacity
                        style={styles.btnMoreInfo}
                        onPress={() => {
                            setShowDecription(!showDecription)
                        }}>
                        <Icon1
                            name={"md-information-circle-outline"}
                            size={scale(35)}
                            color={clor.maincolor}
                        />
                    </TouchableOpacity>
                </ImageBackground>
                <View style={styles.lowerContainer}>
                    <Text style={styles.txtContent} numberOfLines={2}>{item.name}</Text>
                    <View style={styles.viewFlex1} />
                    <View style={styles.rowItem}>
                        <Text style={[styles.txtTitle, { color: clor.C }]}>Price: </Text>
                        <Text style={[styles.txtContent, { color: clor.greenDark, marginBottom: 5 }]}>{Number(item.price).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            carouselRef.current.scrollToIndex(index);
                            if (choose) {
                                listChooseIDService_new[indexServiceType] = ""
                                listServiceChoose_new[String(indexServiceType)] = null
                                onChangeListChoose(listChooseIDService_new, listServiceChoose_new)
                            }
                            else {
                                listChooseIDService_new[String(indexServiceType)] = item.Id
                                listServiceChoose_new[props.indexServiceType] = item
                                props.onChangeListChoose(listChooseIDService_new, listServiceChoose_new)
                            }
                        }}
                        style={[styles.btnChoose, { backgroundColor: choose ? clor.maincolor : clor.white }]}
                    >
                        <Text style={[styles.txtTitle, { color: choose ? clor.white : clor.D }]}>Choose</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <>
            <TouchableOpacity
                style={styles.btnServiceType}
                onPress={() => {
                    setShowOption(!showOption);
                }}>
                {
                    showOption ?
                        <SimplePaginationDot currentIndex={currentIndex} length={props.services.length} inActiveDotSize={scale(8)} activeDotSize={scale(16)} />
                        :
                        <View style={styles.viewServiceType}>
                            <Text style={styles.txt} numberOfLines={2}>
                                {props.serviceType + " (" + props.services.length + ")"}
                            </Text>
                        </View>
                }
            </TouchableOpacity>
            {
                showOption &&
                <Carousel
                    style={styles.carousel}
                    data={props.services}
                    renderItem={({ item, index }) => renderItem(item, index, props.indexServiceType, props.listChooseIDService, props.listChooseService, props.onChangeListChoose)}
                    separatorWidth={20}
                    itemWidth={itemWidth}
                    onScrollEnd={handleCarouselScrollEnd}
                    ref={carouselRef}

                />
            }
        </>
    );
}



function Service_DropDown(props) {

    const [data, setData] = useState([])
    const [showOption, setShowOption] = useState(false)
    const [listChooseIDService, setListChooseIDService] = useState<string[]>([])
    const [listChooseService, setListChooseService] = useState<Service[]>([])
    const user = useAppSelector((state) => state.user)
    const MoneyForAll = TotalMoney(listChooseService, user.userProperties.customerType.percent, props.existVoucher)

    const check = (element) => element != "";

    const onChangeListChoose = (listId, listService) => {
        setListChooseIDService(listId)
        setListChooseService(listService)
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
                    <Text style={[styles.txt, { fontWeight: "400" }]}> Please choose Service here  </Text>
                    <Icon
                        name={showOption ? "caretdown" : "caretup"}
                        size={scale(20)}
                        color={"white"} />
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
                                onChangeListChoose={(listId?: number[], listService?: Service[]) => { onChangeListChoose(listId, listService) }}
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
                    <View style={{ flexDirection: "row" }}>
                        <Icon2 name={"monetization-on"} size={scale(22)} color={"green"} />
                        <Text style={styles.txtAfterChoose}>
                            {
                                ((Number(user.userProperties.customerType.percent) !== 0) || (props.existVoucher !== null)) ?
                                    "(without discount): " + Number(MoneyForAll.AllMoneyNoDiscountByRankOrVoucher).toLocaleString("vi-VN", { style: "currency", currency: "VND" }) + "\n"
                                    + "(discount): " + Number(MoneyForAll.AllMoney).toLocaleString("vi-VN", { style: "currency", currency: "VND" })
                                    :
                                    Number(MoneyForAll.AllMoney).toLocaleString("vi-VN", { style: "currency", currency: "VND" })
                            }
                        </Text>
                    </View>
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
    viewDropDown: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    viewChooseOption: {
        flex: 1,
        width: responsive.WIDTH * 0.9,
        justifyContent: "center",
        borderWidth: 2,
        padding: scale(10),
        borderRadius: 10,
        marginTop: scale(15),
        borderColor: clor.C,
        alignSelf: "center"
    },
    viewService: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    img: {
        height: responsive.height(100),
        width: responsive.height(100),
        borderRadius: 18,
        margin: scale(8)
    },
    viewDetail: {
        flex: 1
    },
    txt: {
        fontSize: scale(15),
        fontWeight: "bold",
        color: "white"
    },
    btnServiceType: {
        backgroundColor: clor.A,
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        height: responsive.height(40),
        width: "90%",
        marginTop: scale(15),
        borderRadius: 5,
    },
    btnMoreInfo: {
        backgroundColor: "rgba(49, 49, 51,0.5)",
        borderBottomLeftRadius: 10,
        padding: scale(3),
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 1
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
        color: clor.greenDark
    },
    containerItem: {
        borderWidth: 2,
        backgroundColor: "white",
        flex: 1,
        borderRadius: 5,
        borderColor: "white",
        alignSelf: "center",
        elevation: 20,
        shadowColor: "#52006A",
    },
    imageBackground: {
        flex: 3,
        backgroundColor: "#EBEBEB",
        borderWidth: 5,
        borderColor: "white",
    },
    lowerContainer: {
        flex: 2,
        margin: 10,
    },
    rowItem: {
        flexDirection: "row",
        paddingHorizontal: scale(5),
        alignSelf: "center"
    },
    txtTitle: {
        fontWeight: "bold",
        fontSize: sizeText,
        color: clor.D
    },
    txtContent: {
        fontWeight: "bold",
        fontSize: sizeText,
        color: clor.D,
        flexShrink: 1
    },
    viewFlex1: {
        flex: 1
    },
    btnChoose: {
        borderWidth: 2,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        padding: scale(5),
        borderColor: clor.A
    },
    carousel: {
        aspectRatio: 1.5,
        height: carouselHeight,
        width: carouselWidth,
        marginTop: 20,
    },
});
