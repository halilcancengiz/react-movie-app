import { configureStore } from '@reduxjs/toolkit'
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import auth from '../features/auth';
import language from '../features/lang';
import profile from './../features/userProfile';
import lists from './../features/lists';
import userPhoto from './../features/userPhoto';
import comments from './../features/comments';
import allUserImages from './../features/allUserImages';






export const store = configureStore({
    reducer: {
        auth,
        language,
        profile,
        lists,
        comments,
        userPhoto,
        allUserImages
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
        thunk: true,
        immutableCheck: true
    })
})