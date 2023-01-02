import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from "./localization/en/translations.json"
import tr from './localization/tr/translations.json';

const resources = {
    en: {
        translation: en,
    },
    tr: {
        translation: tr,
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        keySeparator: false,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;