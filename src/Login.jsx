import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const formRef = useRef(null);

    const clearMessage = () => {
        setTimeout(() => {
            setMessage('');
        }, 5000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://37.140.216.178/api/v1/clubs/login/', {
                login:email,
                password,
            });
            console.log(email, password);
            

            if (response.status === 200) {
                const { access_token, refresh_token, ...userData } = response.data;

                // Tokenlarni localStoragega saqlash
                localStorage.setItem('accessToken', access_token);
                localStorage.setItem('refreshToken', refresh_token);

                // Foydalanuvchi ma'lumotlarini saqlash
                localStorage.setItem('loggedInUser', JSON.stringify(userData));

                // Foydalanuvchini bosh sahifaga yo'naltirish
                navigate('/home');
            } else {
                setMessage('Login qilishda xatolik yuz berdi.');
                clearMessage();
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Tarmoq xatosi. Iltimos qayta urinib ko'ring.";
            setMessage(errorMessage);
            clearMessage();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div ref={formRef} className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">
                    Kirish
                </h1>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Parol"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {message && (
                    <p className={`block mb-4 ${message.includes('topilmadi') ? 'text-red-500' : 'text-green-500'}`}>
                        {message}
                    </p>
                )}
                <button
                    type="submit"
                    className={`w-full py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                    disabled={loading}
                >
                    {loading ? 'Yuklanmoqda...' : 'Kirish'}
                </button>
            </form>
        </div>
    );
};

export default Login;
