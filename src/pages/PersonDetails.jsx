import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PersonOtherMovies from '../components/PersonOtherMovies';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

function PersonDetails() {
    const selectLanguage = state => state.language;
    const getLanguage = createSelector(
        selectLanguage,
        language => language
    )
    const language = useSelector(getLanguage);
    const { personId, personName } = useParams()
    const { t } = useTranslation()

    return (
        <div>
            <Helmet>
                <title>{`${personName.replace(/([A-Z])/g, ' $1').trim()}${t("moviesFeaturing")}`}</title>
                <meta name="description" content={`${personName.replace(/([A-Z])/g, ' $1').trim()}${t("moviesFeaturing")}`} />
            </Helmet>
            <PersonOtherMovies personId={personId} language={language.language} />
        </div>
    )
}
export default PersonDetails