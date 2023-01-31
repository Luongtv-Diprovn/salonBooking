import React, { useRef, useState } from "react"
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from "react-native";
import Carousel from "react-native-anchor-carousel"
import { responsive } from "../../../shared/responsive"
import { scale } from "../../../shared/normalize"
import { img } from "../../../asset/index"
import { clor } from "../../../shared/color"
import Icon from "react-native-vector-icons/FontAwesome"


const data = [
    {
        id: 1,
        image: "https://media.istockphoto.com/id/1201024668/photo/stylish-man-wearing-sunglasses-and-white-shirt-city-life.jpg?s=612x612&w=0&k=20&c=00vZ3so3sKEpexvIXUzvp0fSAMX2b1ZYo1Nq35wAHuU=",
        name: "Phú Thành",
        phone: "0905444557",
        star: 5
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1619533394727-57d522857f89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZWwlMjBtYW58ZW58MHx8MHx8&w=1000&q=80",
        name: "Đại Thành",
        phone: "0905444557",
        star: 4
    },
    {
        id: 3,
        image: "https://i.pinimg.com/550x/72/13/c8/7213c8b0657a76625d09050d1e95d817.jpg",
        name: "Minh Thành",
        phone: "0905444557",
        star: 3
    },
    {
        id: 4,
        image: "https://www.thelagosstylist.com/wp-content/uploads/2018/03/stylish-man.jpg",
        name: "Công Thành",
        phone: "0905444557",
        star: 4
    }
];

const ITEM_WIDTH = 0.65 * responsive.WIDTH
const ITEM_HEIGHT = ITEM_WIDTH * 1.5
const SEPARATOR_WIDTH = 25
const sizeName = scale(25)
const sizeTxt = sizeName * 0.75

function Rating(props) {
    const [defaultRating, setDefaultRating] = useState<number>(props.rate)
    const maxRating = [1, 2, 3, 4, 5]

    return (
        <View style={styles.containerRating}>
            {
                maxRating.map((item) => {
                    return (
                        <TouchableOpacity
                            key={item}
                            disabled={true}
                            onPress={() => {
                                setDefaultRating(item)
                            }}>
                            <Image source={item <= defaultRating ? img.starFill : img.starUnFill}
                                style={styles.imgStarRating}
                            />
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

export default function ShowStylist() {

    const carouselRef = useRef<any>(null);

    function renderItem({ item, index }) {
        const { image, name, phone, star } = item
        return (
            <View style={styles.item}>
                <Image
                    source={{ uri: image }}
                    style={styles.image} />
                <View style={styles.lowerContainer}>
                    <Text style={styles.txtName}>{name}</Text>
                    <Rating rate={star} />
                    <Text style={styles.txtPhone}>
                        <Icon name="volume-control-phone" color={clor.grayForTxt} size={sizeTxt} />
                        {"  " + phone}</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Carousel
                keyExtractor={item => item.id}
                style={styles.carousel}
                ref={carouselRef}
                data={data}
                renderItem={renderItem}
                itemWidth={ITEM_WIDTH}
                separatorWidth={SEPARATOR_WIDTH}
                inActiveScale={1}
                containerWidth={responsive.WIDTH}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
    },
    containerRating: {
        flexDirection: "row",
        marginVertical: scale(10)
    },
    carousel: {
        width: responsive.WIDTH,
        height: ITEM_HEIGHT,
        paddingHorizontal: scale(20)
    },
    item: {
        backgroundColor: "white",
        height: "100%",
    },
    image: {
        flex: 2,
        width: "100%",
        borderRadius: 10
    },
    lowerContainer: {
        flex: 1
    },
    txtName: {
        fontSize: sizeName,
        fontWeight: "bold",
        color: "black",
    },
    txtPhone: {
        fontSize: sizeName / 2,
        color: clor.grayForTxt,
    },
    imgStarRating: {
        height: sizeTxt,
        width: sizeTxt,
        marginRight: scale(5)
    }


});