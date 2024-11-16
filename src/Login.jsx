import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const formRef = useRef(null);

    useEffect(() => {
        // Check localStorage for 'hasVisited'
        const hasVisited = localStorage.getItem('hasVisited');

        if (!hasVisited) {
            alert("Bu web siteda bazi xatolar va kechikishlar mavjud! Biror xato topsangiz, shu chatApp ning ozidan barcha usersdan qidirib (_sherbek_off) ga yozing.");
            // Set 'hasVisited' to true in localStorage
            localStorage.setItem('hasVisited', 'true');
        }
    }, []);

    const clearMessage = () => {
        setTimeout(() => {
            setMessage('');
        }, 5000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form submission
        setLoading(true);  // Set loading to true
        await handleLogin();
        setLoading(false);  // Set loading to false
    };

    const handleLogin = async () => {
        try {
            // Send POST request to login API
            const response = await axios.post('https://unversty-2.onrender.com/users', { email, password });

            if (response.status === 200) {
                // Save the access and refresh tokens to localStorage
                const { access_token, refresh_token } = response.data;
                localStorage.setItem('accessToken', access_token);
                localStorage.setItem('refreshToken', refresh_token);

                // Redirect user to the 'messenger' page
                navigate('/');
            } else {
                setMessage('Login qilishda xatolik yuz berdi.');
                clearMessage();
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Tarmoq xatosi. Iltimos qayta urinib ko\'ring.');
            clearMessage();
        }
    };

    return (
        <div ref={formRef} className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Kirish</h1>
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
                    <p className={`block mb-4 ${message.includes('xatolik') ? 'text-red-500' : 'text-green-500'}`}>
                        {message}
                    </p>
                )}
                <button
                    type="submit"
                    className={`w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                >
                    {loading ? 'Loading...' : 'Kirish'}
                </button>
            </form>
        </div>
    );
};

export default Login;
