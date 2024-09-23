import React from "react";
import { NavLink } from "react-router-dom";
import { AGREEMENT_ROUTE } from "../utils/consts";
import { FaTelegramPlane, FaInstagram, FaTiktok } from "react-icons/fa"; // Импортируем иконки

const Footer = () => {
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
                            Политика конфиденциальности
                        </NavLink>
                        <NavLink to="/terms" className="text-gray-600 hover:text-orange-500 transition">
                            Условия использования
                        </NavLink>
                        <NavLink to="/contact" className="text-gray-600 hover:text-orange-500 transition">
                            Контакты
                        </NavLink>
                    </div>
                    <div className="text-center text-gray-500 mt-2">
                        <p>&copy; {new Date().getFullYear()} OptiTradeHub. Все права защищены.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
