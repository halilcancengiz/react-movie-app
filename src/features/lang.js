import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    language: localStorage.getItem("language") ?? "tr-TR"
}

export const language = createSlice({
    name: 'language',
    initialState,
    reducers: {
        changeTrLanguage: state => {
            localStorage.setItem("language", "tr-TR")
            state.language = "tr-TR"
        },
        changeEnLanguage: state => {
            localStorage.setItem("language", "en-EN")
            state.language = "en-EN"
        }
    }
})

// Action creators are generated for each case reducer function
export const { changeTrLanguage, changeEnLanguage } = language.actions

export default language.reducer