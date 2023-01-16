import React, { useState, useRef, useEffect } from 'react';
import { Button, TextInput, View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';

export default function Test() {
    // If null, no SMS has been sent
    const [confirm, setConfirm] = useState<any>(null);

    const [code, setCode] = useState<string>('');

    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState<boolean>(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    // Handle the button press
    async function signInWithPhoneNumber(phoneNumber) {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
        console.log(confirm)
    }


    async function confirmCode() {
        try {
            await confirm.confirm(code);
            console.log("success");

        } catch (error) {
            console.log('Invalid code.');
        }
    }

    return (
        <>
            <TextInput value={code}
                style={{ borderWidth: 1, width: "60%" }}
                onChangeText={text => setCode(text)} />
            <Button title="Confirm Code" onPress={() => confirmCode()} />
            <Button
                title="Phone Number Sign In"
                onPress={() => signInWithPhoneNumber('+840901901459')} />
        </>
    );
}