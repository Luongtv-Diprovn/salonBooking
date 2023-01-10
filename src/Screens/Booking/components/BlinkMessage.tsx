
import { View, StyleSheet, Text } from 'react-native';
import React, { memo } from 'react';
import { scale } from '../../../shared/normalize'
import { responsive } from '../../../shared/responsive'

function BlinkMessage() {

    return (
        <View style={styles.container}>
            <Text style={styles.txtfirst}>To make an appointment, you should do the following:</Text>
            <Text style={styles.txt}>
                {
                    "Step 1: Choose at least one service" + "\n"
                    + "Step 2: Choose the stylist you want to go with" + "\n"
                    + "Step 3: Choose the most convenient date" + "\n"
                    + "Step 4: Choose timeslot" + "\n"
                    + "Step 5: Apply voucher if you have" + "\n"
                    + "If you want to note us, you can leave a note below"
                }
            </Text>
        </View>
    )
}
export default memo(BlinkMessage)

const styles = StyleSheet.create({
    container: {
        width: responsive.WIDTH * 0.95,
        backgroundColor: '#ebf7ef',
        borderRadius: 10,
        padding: 5,
        margin: 10
    },
    txt: {
        fontSize: scale(14),
        fontWeight: 'bold',
        color: 'red',
    },
    txtfirst: {
        fontSize: scale(14),
        fontWeight: 'bold',
        color: 'purple',
    }
})


