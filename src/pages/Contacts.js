import React from 'react';
import { useTranslation } from 'react-i18next';

const Contacts = ({ lang = 'en' }) => {
    const { t } = useTranslation();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
            <p className="mb-8">{t('description')}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                    <i className="fas fa-envelope text-blue-500 mr-4"></i>
                    <div>
                        <h2 className="font-semibold">{t.email}</h2>
                        <a href={`mailto:${t('emailLink')}`} className="text-blue-500">{t('emailLink')}</a>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                    <i className="fas fa-phone text-blue-500 mr-4"></i>
                    <div>
                        <h2 className="font-semibold">{t.phone}</h2>
                        <a href={`tel:${t('phoneLink')}`} className="text-blue-500">{t('phoneLink')}</a>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                    <i className="fas fa-map-marker-alt text-blue-500 mr-4"></i>
                    <div>
                        <h2 className="font-semibold">{t.address}</h2>
                        <a href={`https://www.google.com/maps/search/?api=1&query=${t('addressLink')}`} className="text-blue-500">{t('addressLink')}</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contacts;
