import React, { useState } from 'react';
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { registration, login } from "../http/userAPI";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { useUserStore } from "../store/UserStore"; 

const Auth = () => {
    const { user, login: setUserLogin } = useUserStore();  
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('USER');  
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [agreeToPolicy, setAgreeToPolicy] = useState(false); // Чекбокс согласия

    const isEmailValid = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };
    const phonePattern = /^(\+7|8)?\d{11}$/;



    const click = async () => {
        try {
            let data;
            if (isLogin) {
                if (!isEmailValid(email)) {
                    setError('Некорректный email');
                    return;
                } else {
                    data = await login(email, password);
                }
            } else {
                if (!isEmailValid(email)) {
                    setError('Некорректный email');
                    return;
                } else if (password.length < 6) {
                    setError('Пароль должен быть длиннее 6 символов');
                    return;
                } else if (!name) {
                    setError('Заполните имя');
                    return;
                } else if (!phonePattern.test(phone)) {
                    setError('Некорректный телефон');
                    return;
                } else if (!agreeToPolicy) {
                    setError('Вы должны согласиться с политикой конфиденциальности');
                    return;
                } else {
                    data = await registration(name, phone, email, password, role);
                }
            }
           
            setUserLogin(data.role);  
            navigate(SHOP_ROUTE);
        } catch (e) {
            setError(e.response?.data?.message || "Ошибка входа/регистрации");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {isLogin ? 'Авторизация' : 'Регистрация'}
                </h2>
                {error && (
                    <div className="text-red-500 text-sm mb-4">
                        {error}
                    </div>
                )}
                <div className="space-y-4">
                    <input
                        placeholder="Введите ваш email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="email"
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                    />
                    <input
                        placeholder="Введите ваш пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                    />
                    {!isLogin && (
                        <>
                            <input
                                placeholder="Введите ваше имя"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                            />
                            <input
                                placeholder="Введите ваш номер телефона"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                            />
                            <select
                                value={role}
                                onChange={e => setRole(e.target.value)}
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                            >
                                <option value="USER">Покупатель</option>
                                <option value="SUPPLIER">Поставщик</option>
                                <option value="ADMIN">Администратор</option>
                            </select>

                            <div className="mt-4">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={agreeToPolicy}
                                        onChange={e => setAgreeToPolicy(e.target.checked)}
                                        className="mr-2"
                                    />
                                    <span>Я согласен с <NavLink to="/agreement" className="text-blue-500 hover:underline">политикой конфиденциальности</NavLink></span>
                                </label>
                            </div>
                        </>
                    )}
                </div>
                <button
                    onClick={click}
                    className="w-full bg-blue-500 text-white py-2 rounded mt-6 hover:bg-blue-600 transition duration-200"
                >
                    {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </button>
                <div className="text-center mt-4">
                    {isLogin ? (
                        <div>
                            Нет аккаунта? <NavLink to={REGISTRATION_ROUTE} className="text-blue-500 hover:underline">Зарегистрируйтесь!</NavLink>
                        </div>
                    ) : (
                        <div>
                            Есть аккаунт? <NavLink to={LOGIN_ROUTE} className="text-blue-500 hover:underline">Войдите!</NavLink>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Auth;
