import { useEffect, memo } from 'react';
import { userProfileListener, userCommentListener, getUserImageFromFirebase } from "../services/firebase/firebase";
import { RiMovieFill, MdOutlineFeaturedPlayList, FaRegComment } from "../assets/icons/icons"
import defaultUserImage from "../assets/images/defaultManImage.png"
import { Tooltip } from 'antd';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import "../css/userinfo.css"


function UserInfo({ user }) {

    const selectLanguage = state => state.language;
    const selectUserLists = state => state.uLists.value
    const selectUserDisplayName = state => state.profile.value.displayName
    const selectUserComments = state => state.comments.value.userComments
    const selectUserPhotoURL = state => state.profile.value.photoURL

    const getUserComments = createSelector(
        selectUserComments,
        userComments => userComments
    )
    const getUserPhotoURL = createSelector(
        selectUserPhotoURL,
        userPhotoURL => userPhotoURL
    )
    const getUserDisplayName = createSelector(
        selectUserDisplayName,
        userDisplayName => userDisplayName
    )
    const getUserLists = createSelector(
        selectUserLists,
        userLists => userLists
    )
    const getLanguage = createSelector(
        selectLanguage,
        language => language
    )
    const userDisplayName = useSelector(getUserDisplayName);
    const language = useSelector(getLanguage);
    const userLists = useSelector(getUserLists);
    const userComments = useSelector(getUserComments);
    const userPhotoURL = useSelector(getUserPhotoURL);




    const { t } = useTranslation()
    const totalMovie = useCallback(() => {
        let count = 0;
        for (let i = 0; i < userLists.length; i++) {
            count += userLists[i].listData.movies.length;
        }
        return count
    }, [userLists])


    const getProfileInfo = useCallback(() => {
        getUserImageFromFirebase(user.uid)
        userProfileListener(user)
        userCommentListener(user)
        totalMovie()
    }, [totalMovie, user, userPhotoURL])


    useEffect(() => {
        getProfileInfo()
    }, [getProfileInfo, user])


    return (
        <section id='user-info-container' className='w-100'>
            <div className='user-profile-photo w-100 position-relative d-flex align-items-center justify-content-center'>
                <div className="flex-column d-flex align-items-center justify-content-center mb-5">
                    <h4>{userDisplayName ? userDisplayName : user && user.displayName !== null ? user.displayName : t("newUser")}</h4>
                    <div className='position-relative img-container'>
                        <img id="user-image-profile" accept=".png, .jpeg, .jpg" src={userPhotoURL ? userPhotoURL : defaultUserImage} alt={userDisplayName ? userDisplayName : t("newUser")} />
                    </div>
                    <div id='countContainer' className='d-flex align-items-center justify-content-center mt-5'>
                        <Tooltip title={language === "en-EN" ? "List Count" : "Liste Sayısı"}>
                            <div id='listCount' className='px-5 py-2 rounded-3 darkBtn text-white mx-3 d-flex align-items-center justify-content-center flex-column'>
                                <MdOutlineFeaturedPlayList size={20} className='mt-1' />
                                {
                                    userLists ? userLists.length : 0
                                }
                            </div>
                        </Tooltip>
                        <Tooltip title={t("totalMovieCount")}>
                            <div id='movieCount' className='px-5 py-2 rounded-3 darkBtn text-white mx-3 d-flex align-items-center justify-content-center flex-column'>
                                <RiMovieFill size={20} className='mt-1' />
                                {
                                    totalMovie()
                                }
                            </div>
                        </Tooltip>
                        <Tooltip title={t("totalCommentCount")}>
                            <div id='commentCount' className='px-5 py-2 rounded-3 darkBtn text-white mx-3 d-flex align-items-center justify-content-center flex-column' >
                                <FaRegComment size={20} className='mt-1' />
                                {
                                    userComments.length
                                }
                            </div>
                        </Tooltip>

                    </div>
                </div>
            </div>
        </section>
    )
}
export default memo(UserInfo)