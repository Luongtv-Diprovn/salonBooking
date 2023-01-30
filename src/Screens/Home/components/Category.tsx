import React from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { responsive } from '../../../shared/responsive'
import { scale } from '../../../shared/normalize'
import { img } from '../../../asset/index'
import { clor } from '../../../shared/color'

const sizeIcon = scale(60)
const sizeTxt = scale(16)

interface Category {
    name: string,
    img: any
}

const renderItem = (item: Category, index: number) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.btnIcon}
                onPress={() => alert("hi")}>
                <Image
                    source={item.img}
                    resizeMode={"cover"}
                    onMagicTap={() => alert("hi")}
                    style={styles.imgIcon} />
            </TouchableOpacity>
            <Text style={styles.txtCategory}>{item.name}</Text>
        </View>
    )
}

const listCategory = [{ img: img.curl, name: "CURL" }, { img: img.dyer, name: "DYER" }, { img: img.hairCut, name: "HAIRCUT" },
{ img: img.hairStraight, name: "STRAIGHT" }, { img: img.hairTreatment, name: "TREATMENT" }, { img: img.lotion, name: "LOTION" }, { img: img.wax, name: "WAX" }
]

function Category() {

    return (
        <>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={listCategory}
                renderItem={({ item, index }) => renderItem(item, index)}
            />
        </>
    );
}

export default Category

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        padding: 10,
        alignItems: "center",
        marginRight: 20
    },
    imgIcon: {
        height: sizeIcon,
        width: sizeIcon,
    },
    txtCategory: {
        marginTop: scale(10),
        fontSize: sizeTxt,
        fontWeight: "bold",
        color: clor.blackForTxt
    },
    btnIcon: {
        backgroundColor: clor.maincolor,
        padding: 10,
        borderRadius: sizeIcon / 2
    }
})