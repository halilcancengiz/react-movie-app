import { useSelector } from 'react-redux';

export default function UseRedux() {
    const user = useSelector(state => state.auth.user);
    const language = useSelector(state => state.language.language);
    const userDisplayName = useSelector(state => state.profile.value.displayName)
    const userPhotoURL = useSelector(state => state.profile.value.photoURL)
    const userComments = useSelector(state => state.comments.value.userComments)
    const userLists = useSelector(state => state.uLists.value)
    const movieComments = useSelector(state => state.comments.value.movieComments)
    const allAuthorsImage = useSelector(state => state.allUserImages.value)

    return { user, language, userDisplayName, userComments, userLists, movieComments, userPhotoURL, allAuthorsImage };
}
