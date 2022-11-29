import { configureStore } from '@reduxjs/toolkit'
import searchReducer from '../features/searchQuerry'

export const store = configureStore({
    reducer: {
        searchReducer
    },
})