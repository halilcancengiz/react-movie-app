/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userProfileListener, userCommentListener } from "../services/firebase/firebase";
import { RiMovieFill, MdOutlineFeaturedPlayList, FaRegComment } from "../assets/icons/icons"
import defaultUserImage from "../assets/images/defaultManImage.png"
import { Tooltip } from 'antd';
import "../css/userinfo.css"

export default function UserInfo({ lists }) {
    const dispatch = useDispatch()
    const userPhoto = useSelector(state => state.profile.value.photoURL)
    const userDisplayName = useSelector(state => state.profile.value.displayName)
    const userComments = useSelector(state => state.comments.value.userComments)
    const user = useSelector(state => state.auth.user)
    console.log(userComments);

    const getMovieCount = () => {
        let y = lists ? lists.map(list => list.data.movies.length) : ""
        let x = 0
        for (let i = 0; i < y.length; i++) {
            x = x + y[i]
        }
        return x
    }
    useEffect(() => {
        if (user && user.uid) {
            userProfileListener(user)
            userCommentListener(user)
        }

    }, [user, userPhoto, userDisplayName])
    return (
        <section id='user-info-container' className='w-100'>
            <div className='user-profile-photo w-100 position-relative d-flex align-items-center justify-content-center'>
                <div className="flex-column d-flex align-items-center justify-content-center mb-5">
                    <h4>{userDisplayName ? userDisplayName : user && user.displayName !== null ? user.displayName : "Yeni Kullanıcı"}</h4>
                    <div className='position-relative img-container'>
                        <img id="user-image-profile" src={userPhoto ? userPhoto : defaultUserImage} alt="user" />
                    </div>
                    <div id='countContainer' className='d-flex align-items-center justify-content-center mt-5'>
                        <Tooltip title="Liste Sayım">
                            <div id='listCount' className='px-5 py-2 rounded-3 darkBtn text-white mx-3 d-flex align-items-center justify-content-center flex-column'>
                                <MdOutlineFeaturedPlayList size={20} className='mt-1' />
                                {
                                    lists ? lists.length : "-"
                                }
                            </div>
                        </Tooltip>
                        <Tooltip title="Listelerdeki Toplam Filmlerim">
                            <div id='movieCount' className='px-5 py-2 rounded-3 darkBtn text-white mx-3 d-flex align-items-center justify-content-center flex-column'>
                                <RiMovieFill size={20} className='mt-1' />
                                {
                                    getMovieCount()
                                }
                            </div>
                        </Tooltip>
                        <Tooltip title="Toplam Yorum Sayım">
                            <div id='commentCount' className='px-5 py-2 rounded-3 darkBtn text-white mx-3 d-flex align-items-center justify-content-center flex-column' >
                                <FaRegComment size={20} className='mt-1' />
                                {
                                    userComments ? userComments.length : 0
                                }
                            </div>
                        </Tooltip>

                    </div>
                </div>
            </div>
        </section>
    )
}
