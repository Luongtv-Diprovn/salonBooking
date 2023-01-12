
import { View, StyleSheet, TextInput, Text } from 'react-native';
import React, { useEffect, useState, memo } from 'react';
import { scale } from '../../../shared/normalize'
import { responsive } from '../../../shared/responsive'
import { clor } from '../../../shared/color';

function Note(props) {

    const [note, setNote] = useState<string>("")
    useEffect(() => {
        setNote("")
        props.WriteNote("")
    }, [props.statusBooking])
    return (
        <View style={styles.container}>
            <Text style={styles.txtNote}>Note</Text>
            <View style={styles.textAreaContainer} >
                <TextInput
                    style={styles.textArea}
                    placeholderTextColor="grey"
                    multiline={true}
                    maxLength={300}
                    onChangeText={(text) => {
                        setNote(text)
                        props.WriteNote(note)
                    }}
                />
            </View>
        </View>
    )
}
export default memo(Note)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        marginVertical: 20,
    },
    textAreaContainer: {
        borderColor: clor.B,
        borderWidth: 8,
        padding: 5,
        borderRadius: 20
    },
    textArea: {
        height: responsive.height(150),
        justifyContent: "flex-start"
    },
    txtNote:
    {
        fontSize: scale(23),
        color: clor.maincolor,
        marginBottom: 10,
        marginLeft: 50
    }
})


