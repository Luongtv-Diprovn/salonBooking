import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { img } from '../../../asset/index'



export default function TopView() {

    const [sizeContainer, setSizeContainer] = useState<number>(0)

    return (
        <View
            style={styles.topView}
            onLayout={(event) => {
                setSizeContainer(event.nativeEvent.layout.height)
            }}
        >
            <Image
                source={img.logoSalon}
                resizeMode='stretch'
                style={{ height: sizeContainer * 0.8, width: sizeContainer * 0.8, borderRadius: 20 }} />
        </View>
    );
}
const styles = StyleSheet.create({

    topView: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },

})