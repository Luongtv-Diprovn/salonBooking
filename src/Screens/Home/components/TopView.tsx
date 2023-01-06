import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { img } from '../../../asset/index'

export default function TopView() {

    return (
        <ImageBackground
            style={styles.imgBackground}
            source={img.bgrSignIn}
        />
    );
}
const styles = StyleSheet.create({

    imgBackground: {
        flex: 0.3
    },

})