import React from 'react';
import { Result } from 'antd'
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
    const { t } = useTranslation()
    return (
        <Result
            className='position-absolute bg-white'
            style={{ top: 0 }}
            status="404"
            subTitle={t("Sorry,ThisPageCouldNotBeFound.")}
            extra={<NavLink to="/" type="primary">{t("backToHomePage")}</NavLink>}
        />
    )
}
