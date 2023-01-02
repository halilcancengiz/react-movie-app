import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PersonOtherMovies from '../components/PersonOtherMovies';
import useRedux from '../hooks/useRedux';
import { useTranslation } from 'react-i18next';

function PersonDetails() {
    const { personId, personName } = useParams()
    const { language } = useRedux()
    const { t } = useTranslation()

    return (
        <div>
            <Helmet>
                <title>{`${personName.replace(/([A-Z])/g, ' $1').trim()}${t("moviesFeaturing")}`}</title>
                <meta name="description" content={`${personName.replace(/([A-Z])/g, ' $1').trim()}${t("moviesFeaturing")}`} />
            </Helmet>
            <PersonOtherMovies personId={personId} language={language} />
        </div>
    )
}
export default PersonDetails