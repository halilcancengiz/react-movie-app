import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, onSnapshot, doc, where, query, updateDoc, deleteDoc, arrayUnion, arrayRemove, setDoc } from "firebase/firestore";
import { toast } from 'react-hot-toast';
import { store } from "../../app/store"
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";

import { loginHandle, logoutHandle } from "../../features/auth"
import { setUserComments, setMovieComments } from "../../features/comments";
import { setDisplayName, setPhotoURL } from "../../features/userProfile";
import { setLists } from "../../features/userLists";
import { setAllUserImages } from "../../features/allUserImages"




const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const storage = getStorage(app);



//Kayıt Olma
export const firebaseRegister = async (email, password, rePassword) => {
    try {
        if (email.length === 0 || password.length === 0) {
            toast.error("Lütfen Boş Alan Bırakmayınız!", {
                duration: 1500
            });
            return null;
        } else if (rePassword !== password) {
            toast.error("Paralo ve Paralo tekrarı aynı olmalıdır.", {
                duration: 1500
            })
            return null
        }
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        toast.success("Kayıt oldunuz giriş yapıldı.")

        return user;

    } catch (error) {
        if (error.code === "auth/email-already-in-use") {
            toast.error("Mail adresi kullanımda! Lütfen başka mail adresi giriniz.", {
                duration: 1500
            })
            return null
        }
        else if (error.code === "auth/weak-password") {
            toast.error(`Zayıf parola !
            Paralo en az 6 karakter olmalıdır!
            `, {
                duration: 1500
            })
            return null
        }
        else {
            toast.error(error.code, {
                duration: 1500
            })
            return null
        }

    }
}
// Giriş Yapma
export const firebaseLogin = async (email, password) => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        toast.success("Giriş Başarılı", {
            duration: 1500
        })

        return user
    } catch (error) {
        if (email.length <= 0 || password.length <= 0) {
            toast.error("Lütfen Tüm Alanları Doldurunuz!", {
                duration: 1500
            })
            return null
        }
        else if (error.code === "auth/invalid-email") {
            toast.error("Geçersiz Email!", {
                duration: 1500
            })
            return null
        }
        else if (error.code === "auth/internal-error") {
            toast.error("Kimlik doğrulama hatası", {
                duration: 1500
            })
            return null
        }
        else if (error.code === "auth/wrong-password") {
            toast.error("Şifreniz Yanlış!")
            return null
        }
        else {
            toast.error(error.message, {
                duration: 1500
            })
            return null
        }

    }
}
// Çıkış Yapma
export const firebaseLogout = async () => {
    try {
        await signOut(auth)
        return toast.success("Başarılı Bir Şekilde Çıkış Yapıldı.", {
            duration: 1500
        })
    } catch (error) {
        toast.error(error.message, {
            duration: 1500
        })
    }
}
// Paralo sıfırlama
export const resetPassword = async (email) => {
    try {
        if (email.length <= 0) {
            toast.error("Lütfen mail adresini boş bırakmayın!")
            return null
        }
        else {
            await sendPasswordResetEmail(auth, email, {
                url: "http://localhost:3000/login"
            })
            toast.success(`Mailiniz Gönderilmiştir.
            Lütfen spam kutusunu kontrol etmeyi unutmayınız!`)
            return true
        }
    } catch (error) {
        toast.error(error.message)
        return null
    }
}
// Kullanıcı ad,soyad ve fotoğraf güncelleme
export const updateUserName = async (displayName, user) => {
    try {
        if (user && user.uid) {
            await setDoc(doc(db, "user-profile", auth.currentUser.uid), {
                displayName,
                createdWho: auth.currentUser.uid
            });
            userProfileListener(user)
        }
    } catch (error) {
        toast.error(error.message)
    }
}
export const userProfileListener = async (user) => {
    try {
        if (user && user.uid) { // 'user' değişkeninin tanımlı olup olmadığını ve 'null' değerine eşit olup olmadığını kontrol ediyoruz
            return onSnapshot(query(collection(db, "user-profile"), where("createdWho", "==", user.uid)), (result) => {
                let userProfile = ""
                result.forEach(doc => {
                    userProfile = { data: doc.data() }
                })
                if (userProfile) {
                    store.dispatch(setDisplayName(userProfile.data.displayName))
                }

            });
        }
    } catch (error) {
        toast.error(`userProfileListener ${error}`)
    }
}

export const updatePhoto = async (file, user, type) => {
    try {
        if (user && user.uid) {
            // Dosya referansı oluşturun
            const fileName = `${user.uid}`;
            const storageRef = ref(storage, fileName);
            const metadata = { contentType: type };
            await uploadBytes(storageRef, file, metadata)
            getUserImageFromFirebase(user.uid)
        }
    } catch (error) {
        // Yükleme sırasında hata oluşursa uyarı gösterin
        toast.error(error);
    }
}
export const getUserImageFromFirebase = async (userId) => {
    const userImageRef = ref(storage, userId)
    let imageURL = ""
    await getDownloadURL(userImageRef).then(result => {
        imageURL = result
    })
    store.dispatch(setPhotoURL(imageURL))
}






// Kullanıcı Durumunu kontrol eder (login,logout)
onAuthStateChanged(auth, async (user) => {
    if (user && user.uid) {
        store.dispatch(loginHandle(user));
        await userProfileListener(user)
        await userCommentListener(user)
        await getUserImageFromFirebase(user.uid)
    } else {
        store.dispatch(logoutHandle());
    }
});



// Yorum Ekleme
export const addMovieComment = async (description, movieId) => {
    try {
        await addDoc(collection(db, "movie-comments"), {
            description,
            movieId,
            addedAt: `${new Date()}`,
            updateAt: "",
            likes: [],
            dislikes: [],
            authorId: auth.currentUser.uid
        })
        toast.success(`Yorumunuz başarıyla gönderildi. 
        Teşekkürler`)
    } catch (error) {
        toast.error(error.message)
    }
}
// Yorum güncelleme
export const updateComment = async (comment, description) => {
    try {
        await addDoc(collection(db, "movie-comments"), {
            description,
            movieId: comment.movieId,
            addedAt: comment.addedAt,
            updateAt: `${new Date()}`,
            likes: comment.likes,
            dislikes: comment.dislikes,
            authorId: auth.currentUser.uid
        })
        toast.success("Yorumunuz güncelledi")
    } catch (error) {
        toast.error(error.message)
    }
}
// Yorum silme
export const deleteComment = async (id) => {
    await deleteDoc(doc(db, "movie-comments", id))
}
// Kullanıcı Yorumları Getirme (REALTİME)
export const userCommentListener = async (user) => {
    if (!user || !user.uid) {
        return null
    }
    else {
        return onSnapshot(query(collection(db, "movie-comments"), where("authorId", "==", user.uid)), (result) => {
            const userComments = []
            result.forEach(doc => {
                userComments.push({ id: doc.id, data: doc.data() })
            })
            store.dispatch(setUserComments(userComments))
        });
    }
};

// Film Yorumlarını Getirme (REALTİME)
export const movieCommentListener = async (movieId) => {
    try {
        return onSnapshot(query(collection(db, "movie-comments"), where("movieId", "==", movieId)), (result) => {
            let mComments = []

            result.forEach(doc => {
                mComments.push({
                    id: doc.id,
                    commentData: doc.data(),

                })
            })
            store.dispatch(setMovieComments(mComments))
        });
    } catch (error) {
        toast.error(`movieCommentListener ${error}`)
    }

}
// Filme Yorum yapanların fotoğraflarını getirme
export const getAllAuthorsImage = async authorList => {
    try {
        if (authorList) {
            const commentAuthorList = [];
            await listAll(ref(storage)).then(result => {
                result.items.forEach(item => {
                    commentAuthorList.push(item.name);
                });
            });
            const movieCommentAuthors = commentAuthorList.filter(author => authorList.includes(author));
            const finalList = [];
            for (let j = 0; j < movieCommentAuthors.length; j++) {
                const url = await getDownloadURL(ref(storage, movieCommentAuthors[j]));
                finalList.push({
                    id: movieCommentAuthors[j],
                    url,
                });
            }
            return finalList;
        }
    }
    catch (error) {
        toast.error(error.message);
    }
};
//Filme Yorum yapanların kullanıcı adlarını getirme
export const getAllAuthorsDisplayName = async authorList => {
    try {
        if (authorList) {
            return new Promise((resolve, reject) => {
                let result = onSnapshot(query(collection(db, "user-profile")), result => {
                    const authorDisplayNameList = [];
                    result.forEach(doc => {
                        if (authorList.includes(doc.data().createdWho)) {
                            authorDisplayNameList.push({
                                id: doc.data().createdWho,
                                displayName: doc.data().displayName,
                            });
                        }
                    });
                    resolve(authorDisplayNameList);
                });
            });
        }
    } catch (error) {
        toast.error(error.message);
    }
};

// Like atma
export const addLike = async (commentId, userId) => {
    try {
        await updateDoc(doc(db, "movie-comments", commentId), {
            likes: arrayUnion(`${userId}`)
        }
        )
    } catch (error) {
        toast.error(error.message)
    }
}
// Like geri alma
export const removeLike = async (commentId, userId) => {
    try {
        await updateDoc(doc(db, "movie-comments", commentId), {
            likes: arrayRemove(userId)
        });
    } catch (error) {
        toast.error(error.message)
    }
}
// Dislike atma
export const addDislike = async (commentId, userId) => {
    try {
        await updateDoc(doc(db, "movie-comments", commentId), {
            dislikes: arrayUnion(`${userId}`)
        }
        )
    } catch (error) {
        toast.error(error.message)
    }
}
// Dislike geri alma
export const removeDislike = async (commentId, userId) => {
    try {
        await updateDoc(doc(db, "movie-comments", commentId), {
            dislikes: arrayRemove(userId)
        });
    } catch (error) {
        toast.error(error.message)
    }
}



// Kullanıcı Listelerini Alma
export const getLists = (user) => {
    try {
        if (user && user.uid) {
            return onSnapshot(query(collection(db, "lists"), where("createdWho", "==", user.uid)), (result) => {
                let uLists = []
                result.forEach(doc => {
                    uLists.push({
                        id: doc.id,
                        listData: doc.data()
                    })
                })
                store.dispatch(setLists(uLists))
            });
        }

    } catch (error) {
        toast.error(`getLists ${error}`)
    }

}
// Liste Oluşturma
export const createList = async (name) => {
    await addDoc(collection(db, "lists"), {
        list_name: name,
        movies: [],
        createdWho: auth.currentUser.uid,
        createdAt: `${new Date()}`
    });
}
// Listeyi Silme
export const deleteList = async (id) => {
    await deleteDoc(doc(db, "lists", id))
}
// Listeye Film Ekleme
export const addMovieToList = async (listId, movie) => {
    try {
        await updateDoc(doc(db, "lists", listId), {
            movies: arrayUnion({
                data: movie,
                addedAt: `${new Date()}`
            })
        }
        )
        toast.success(`Film Başarıyla eklendi !`)
    } catch (error) {
        if (error.code === "invalid-argument") {
            toast.error("Lütfen Bir Liste Seçin")
            return null
        }
        else {
            toast.error(error.message)
            return null
        }
    }

}
// Listeden Film Silme
export const deleteMovieToList = async (deleteMovie, listId) => {
    try {
        await updateDoc(doc(db, "lists", listId), {
            movies: arrayRemove({
                data: deleteMovie.data,
                addedAt: deleteMovie.addedAt
            })
        });
        toast.success("Film başarıyla listeden kaldırıldı...")
    } catch (error) {
        toast.error(error.message)
    }
}







