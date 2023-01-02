import { configureStore } from '@reduxjs/toolkit'
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import auth from '../features/auth';
import language from '../features/lang';
import profile from './../features/userProfile';
import userPhoto from './../features/userPhoto';
import comments from './../features/comments';
import userListsReducer from "./../features/userLists"
import allUserImagesReducer from '../features/allUserImages';


export const store = configureStore({
    reducer: {
        auth,
        language,
        profile,
        comments,
        userPhoto,
        uLists: userListsReducer,
        allUserImages: allUserImagesReducer,

    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
        thunk: true,
        immutableCheck: true
    })
})