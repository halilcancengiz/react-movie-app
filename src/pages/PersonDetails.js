import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PersonOtherMovies from '../components/PersonOtherMovies';

export default function PersonDetails() {
    const { personId } = useParams()
    const language = useSelector(state => state.language.language)
    return (
        <div>
            <PersonOtherMovies personId={personId} language={language} />
        </div>
    )
}
