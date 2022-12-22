import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {
        displayName: "Yeni Kullanıcı",
        photoURL: "https://img.freepik.com/free-icon/user_318-804790.jpg?w=2000",
    }
}

export const profile = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setDisplayName: (state, action) => {
            state.value.displayName = action.payload
        },
        setPhotoURL: (state, action) => {
            state.value.photoURL = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { setDisplayName, setPhotoURL } = profile.actions

export default profile.reducer