import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { CONTACTS } from '../utils/consts';
const WarningBeta = ({ lang = 'en' }) => {
    const { i18n, t } = useTranslation();

    return (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg mb-4">
            <h2 className="font-bold text-lg">{t('warningTitle')}</h2>
            <p className="mt-2">{t('warningMessage')}</p>
            <NavLink to={CONTACTS} className="text-yellow-600 underline mt-2 block">{t('contactUs')}</NavLink>
        </div>
    );
};

export default WarningBeta;
