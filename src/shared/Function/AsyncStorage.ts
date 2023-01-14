import AsyncStorage from '@react-native-async-storage/async-storage'
import { typeToken, Account } from '../Interface'

export async function storeLocalToken(value: typeToken) {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@localToken', jsonValue)
    } catch (e) {

    }
}

