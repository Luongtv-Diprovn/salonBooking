
import { View, StyleSheet, TextInput, Text } from "react-native";
import React, { useEffect, useState, memo } from "react";
import { scale } from "../../../shared/normalize"
import { responsive } from "../../../shared/responsive"
import { clor } from "../../../shared/color";

function Note(props) {

    const [note, setNote] = useState<string>("")
    useEffect(() => {
        setNote("")
        props.WriteNote("")
    }, [props.statusBooking])
    return (
        <TextInput
            style={styles.textArea}
            selectionColor={clor.maincolor}
            placeholderTextColor="grey"
            multiline={true}
            maxLength={300}
            onChangeText={(text) => {
                setNote(text)
                props.WriteNote(note)
            }}
        />

    )
}
export default memo(Note)

const styles = StyleSheet.create({
    textArea: {
        marginVertical: scale(15),
        alignSelf: "center",
        width: responsive.WIDTH * 0.95,
        height: responsive.height(150),
        borderColor: clor.B,
        borderWidth: 3,
        padding: scale(10),
        borderRadius: 20,
        fontSize: scale(16)
    }
})


