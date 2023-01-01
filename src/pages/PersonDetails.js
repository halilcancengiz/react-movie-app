import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PersonOtherMovies from '../components/PersonOtherMovies';
import useRedux from '../hooks/useRedux';

function PersonDetails() {
    const { personId, personName } = useParams()
    const { language } = useRedux()

    return (
        <div>
            <Helmet>
                <title>{`${personName.replace(/([A-Z])/g, ' $1').trim()}'in yer aldığı filmler`}</title>
                <meta name="description" content={`${personName.replace(/([A-Z])/g, ' $1').trim()}'in yer aldığı filmler`} />
            </Helmet>
            <PersonOtherMovies personId={personId} language={language} />
        </div>
    )
}
export default PersonDetails