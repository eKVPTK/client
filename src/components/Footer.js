import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AGREEMENT_ROUTE } from "../utils/consts";
import { FaTelegramPlane, FaInstagram, FaTiktok } from "react-icons/fa"; 

const Footer = () => {
    const { t } = useTranslation(); 

    return (
        <div>
            <div className="bg-gray-200 py-2">
                <div className="container mx-auto flex justify-center space-x-4">
                    <a href="https://telegram.org/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-orange-500">
                        <FaTelegramPlane className="text-2xl" />
                    </a>
                    <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-orange-500">
                        <FaTiktok className="text-2xl" />
                    </a>
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-orange-500">
                        <FaInstagram className="text-2xl" />
                    </a>
                </div>
            </div>

            <footer className="bg-gray-100 py-4 mt-2">
                <div className="container mx-auto flex flex-col items-center space-y-2">
                    <div className="flex flex-wrap justify-center space-x-6">
                        <NavLink to={AGREEMENT_ROUTE} className="text-gray-600 hover:text-orange-500 transition">
                            {t('privacyPolicy')} 
                        </NavLink>
                        <NavLink to="/terms" className="text-gray-600 hover:text-orange-500 transition">
                            {t('termsOfUse')} 
                        </NavLink>
                        <NavLink to="/contacts" className="text-gray-600 hover:text-orange-500 transition">
                            {t('contacts')} 
                        </NavLink>
                    </div>
                    <div className="text-center text-gray-500 mt-2">
                        <p>&copy; {new Date().getFullYear()} OptiTradeHub. {t('allRightsReserved')}</p> {/* Используем перевод */}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
