import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { typeUser, typeToken } from '../../shared/Interface'

interface userState {
    userProperties: typeUser
}

const initialState: userState = {
    userProperties: {
        Id: 0,
        name: "",
        phone: "",
        address: "",
        imagePath: "",
        isCustomerCreated: false,
        point: 0,
        createdAt: "",
        updatedAt: "",
        customerTypeId: 0,
        birthday: "",
        gender: false,
        isDeleted: false,
        imageName: "",
        customerType: {
            Id: 0,
            name: "",
            percent: 0,
            description: "",
            createdAt: "",
            updatedAt: "",
            isDeleted: false
        },
        iat: 0,
        exp: 0,
        Token: {
            token: "a",
            refreshToken: "b"
        },
        statusBooking: false
    }
}

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<typeUser>) => {
            state.userProperties = action.payload
        },
        updateToken: (state, action: PayloadAction<typeToken>) => {
            state.userProperties.Token = action.payload
        },
        changeStatusBooking: (state, action: PayloadAction<boolean>) => {
            state.userProperties.statusBooking = action.payload
        },
    }
})

export const { updateToken, updateUser, changeStatusBooking } = userSlice.actions
export default userSlice.reducer