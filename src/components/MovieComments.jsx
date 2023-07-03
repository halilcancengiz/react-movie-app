import React,{ useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { addDislike, addMovieComment, getAllAuthorsDisplayName, getAllAuthorsImage } from '../services/firebase/firebase';
import { movieCommentListener, removeDislike, deleteComment } from '../services/firebase/firebase';
import { addLike, removeLike } from '../services/firebase/firebase';
import UpdateCommentModal from './modals/UpdateCommentModal';
import { AiFillLike, AiFillDislike, BsTrash } from "../assets/icons/icons"
import { Collapse, Empty, Popconfirm } from 'antd';
import defaultImage from "../assets/images/defaultManImage.png"
import useRedux from '../hooks/useRedux';
import { useTranslation } from 'react-i18next';
import "../css/comment.css"


export default function MovieComments() {
  const { t } = useTranslation()
  const { user, movieComments } = useRedux()
  const [commentDescription, setCommentDescription] = useState("");
  const [allAuthorsImage, setAllAuthorsImage] = useState([])
  const [allAuthorsDisplayName, setAllAuthorsDisplayName] = useState([])
  const { id } = useParams();


  const getCommentAuthorsInformation = useCallback(async () => {
    if (movieComments && movieComments.length > 0) {
      const authorList = await movieComments.map(author => author.commentData.authorId);
      const authorsImagesList = await getAllAuthorsImage(authorList);
      const authorsDisplayName = await getAllAuthorsDisplayName(authorList)
      if (authorsImagesList && authorsImagesList.length > 0) {
        setAllAuthorsImage(authorsImagesList);
      }
      if (authorsDisplayName && authorsDisplayName.length > 0) {
        setAllAuthorsDisplayName(authorsDisplayName)
      }
    }
  }, [movieComments]);

  const findAuthorImage = (authorId) => {
    let image = null;
    if (allAuthorsImage && allAuthorsImage.length > 0) {
      const author = allAuthorsImage.find(author => author.id === authorId);
      if (author) {
        image = author.url;
      }
    }
    return image || defaultImage;
  };
  const findAuthorDisplayName = (authorId) => {
    let displayName = null
    if (allAuthorsDisplayName && allAuthorsDisplayName.length > 0) {
      const authorDisplayName = allAuthorsDisplayName.find(displayName => displayName.id === authorId)
      if (authorDisplayName) {
        displayName = authorDisplayName.displayName
      }
    }
    return displayName || "Anonim"
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    addMovieComment(commentDescription, id)
  }
  const handleLike = async (commentId) => {
    let filteredComments = await movieComments.filter(x => x.id === commentId);
    let newobject = {}
    filteredComments.forEach((filtered) => {
      newobject = {
        data: filtered.commentData,
        id: filtered.id
      }
      if (newobject.data.likes.includes(user.uid) && !newobject.data.dislikes.includes(user.uid)) {
        removeLike(commentId, user.uid)
      }
      else if (newobject.data.likes.includes(user.uid) && newobject.data.dislikes.includes(user.uid)) {
        removeLike(commentId, user.uid)
        removeDislike(commentId, user.uid)
      }
      else if (!newobject.data.likes.includes(user.uid) && newobject.data.dislikes.includes(user.uid)) {
        addLike(commentId, user.uid)
        removeDislike(commentId, user.uid)
      }
      else {
        addLike(commentId, user.uid)
      }

    })
  }
  const handleDislike = async (commentId) => {
    let filteredComments = await movieComments.filter(x => x.id === commentId);
    let newobject = {}
    filteredComments.forEach((filtered) => {
      newobject = {
        data: filtered.commentData,
        id: filtered.id
      }
      if (newobject.data.dislikes.includes(user.uid) && !newobject.data.likes.includes(user.uid)) {
        removeDislike(commentId, user.uid)
      }
      else if (newobject.data.dislikes.includes(user.uid) && newobject.data.likes.includes(user.uid)) {
        removeLike(commentId, user.uid)
        removeDislike(commentId, user.uid)
      }
      else if (!newobject.data.dislikes.includes(user.uid) && newobject.data.likes.includes(user.uid)) {
        addDislike(commentId, user.uid)
        removeLike(commentId, user.uid)
      }
      else {
        addDislike(commentId, user.uid)
      }
    })
  }
  const handleDeleteComment = async (commentId) => {
    deleteComment(commentId)
  }
  const handleFormattedDate = (commentData) => {
    if (commentData.updateAt.length > 0) {
      const date = new Date(commentData.updateAt)
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Europe/Istanbul',
      };
      const formattedDate = date.toLocaleString('tr-TR', options);
      return <span className="fst-italic">{`${formattedDate} (güncellendi)`}</span>
    }
    else {
      const date = new Date(commentData.addedAt)
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Europe/Istanbul',
      };
      const formattedDate = date.toLocaleString('tr-TR', options);
      return <span className="fst-italic">{formattedDate}</span>
    }
  }
  const handleCommentChange = useCallback((e) => {
    setCommentDescription(e.target.value)
  }, [])

  useEffect(() => {
    movieCommentListener(id)
  }, [id])
  useEffect(() => {
    getCommentAuthorsInformation()
  }, [getCommentAuthorsInformation])

  return (
    <div className='container'>
      <h4 className="text-uppercase webkitHeader-h4 my-5 w-100 text-center fw-bold">{t("comments")}</h4>
      {
        user && movieComments && movieComments.some(comment => comment.commentData.authorId === user.uid) === false ? (
          <form onSubmit={handleSubmit} className="my-2">
            <Collapse>
              <textarea onChange={handleCommentChange} maxLength={150} placeholder={t("PleaseWriteYourComment")} className="comment-area w-100" name="" id="" cols="30" rows="10"></textarea>
            </Collapse>
            <div className="d-flex align-items-end justify-content-end">
              <button className="send-btn px-5 py-1 border-0 rounded-2">{t("send")}</button>
            </div>
          </form>
        ) : ""
      }
      {
        movieComments && movieComments.length > 0 ? movieComments.map((comment) => {
          return (
            <Collapse key={comment.id} className='w-100 d-flex flex-column align-items-start justify-content-center mb-3 rounded-3 shadow-lg'>
              <div className='d-flex align-items-center justify-content-between  w-100 pt-4 px-4 border-bottom pb-4'>
                <div className="d-flex">
                  <div className='comment-author-avatar me-3'>
                    <img width={45} height={45} className="rounded-circle" src={findAuthorImage(comment.commentData.authorId)} alt="author-avatar" />
                    <p className='m-0'></p>
                  </div>
                  <div className='comment-author-container flex-column d-flex align-items-start justify-content-start'>
                    <div className='comment-author'>
                      <p className="m-0 fw-bold">{findAuthorDisplayName(comment.commentData.authorId)}</p>
                    </div>
                    <div className='comment-date'>
                      {
                        handleFormattedDate(comment.commentData)
                      }
                    </div>
                  </div>
                </div>
                {
                  comment.commentData.authorId === user.uid ? (
                    <div className='d-flex align-items-center justify-content-center'>
                      <UpdateCommentModal data={comment.commentData} id={comment.id} />
                      <Popconfirm
                        title="Yorumunuzu silmek istediğinize emin misiniz?"
                        onConfirm={() => handleDeleteComment(comment.id)}
                        okText={t("yes")}
                        cancelText={t("no")}
                      >
                        <BsTrash color='#E64848' size={20} className="cursor-pointer ms-3" />
                      </Popconfirm>
                    </div>
                  ) : ""
                }

              </div>
              <div className='comment-content  px-4 pt-2'>
                <p className="m-0">{comment.commentData.description}</p>
              </div>
              <div className='comment-footer d-flex align-items-center  w-100 px-4 py-2 border border-bottom-0 border-end-0 border-start-0 mt-3'>
                <div className='comment-like-button d-flex align-items-center justify-content-center'>
                  <div onClick={() => handleLike(comment.id)} className='comment-like-button-icon cursor-pointer'>
                    <AiFillLike id='likeBtn' color='#2EB086' size={20} />
                  </div>
                  <div className='comment-like-button-count mx-3'>
                    {comment.commentData.likes.length}
                  </div>
                </div>
                <div className='comment-dislike-button d-flex align-items-center justify-content-center'>
                  <div onClick={() => handleDislike(comment.id)} className='comment-dislike-button-icon cursor-pointer'>
                    <AiFillDislike color='#E64848' size={20} />
                  </div>
                  <div className='comment-dislike-button-count mx-3 '>
                    {comment.commentData.dislikes.length}
                  </div>
                </div>
              </div>
            </Collapse>
          )
        }) : <Empty description={t("ThereAreNoCommentsTetForThisFilm")} />
      }
    </div>


  )
}


