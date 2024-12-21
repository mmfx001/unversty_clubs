import React, { useState } from 'react';
import axios from 'axios';
import { FiImage, FiEdit, FiUser } from 'react-icons/fi';

const Create = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [imageSource, setImageSource] = useState('url'); // 'url' or 'file'
    const [message, setMessage] = useState('');

    // Get user data from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};
    const club_id = loggedInUser._id || '';

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if title and description are not empty
        if (!title || !description) {
            setMessage('Title va description maydonlari bo\'sh bo\'lmasligi kerak.');
            return;
        }

        // Check if image URL or file is provided
        if (!image) {
            setMessage('Rasm URL manzili yoki fayli kiritilmagan.');
            return;
        }

        // Check if club_id exists
        if (!club_id) {
            setMessage('Foydalanuvchi ma\'lumotlari mavjud emas.');
            return;
        }

        // Get current time in Asia/Tashkent timezone
        const currentDatetime = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Tashkent' });

        const newPost = {
            title,
            description,
            datetime: currentDatetime,
            image,
            club_id: club_id,
            likes: 0, // Default likes
        };

        try {
            // Post the new post to the server
            const response = await axios.post('https://unversty-2.onrender.com/posts', newPost);
            if (response.status === 201 || response.status === 200) {
                setMessage('Post muvaffaqiyatli yaratildi!');
                // Reset form after submission
                setTitle('');
                setDescription('');
                setImage('');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.');
        }
    };

    // Handle image URL change
    const handleImageURLChange = (e) => {
        setImage(e.target.value);
    };

    // Handle file change
    const handleImageFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // Set image as base64 URL
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <form onSubmit={handleSubmit} className="bg-gradient-to-b from-indigo-500 to-indigo-700 p-8 rounded-lg shadow-xl w-full max-w-md">
                <h1 className="text-3xl font-semibold mb-6 text-white flex items-center space-x-2">
                    <FiEdit className="text-white" />
                    <span>Yangi Post Yaratish</span>
                </h1>

                {message && (
                    <p className={`mb-4 ${message.includes('muvaffaqiyatli') ? 'text-green-500' : 'text-red-500'}`}>
                        {message}
                    </p>
                )}

                {/* Title Input */}
                <div className="flex items-center mb-4">
                    <FiEdit className="text-white mr-2" />
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Description Input */}
                <div className="flex items-center mb-4">
                    <FiEdit className="text-white mr-2" />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    ></textarea>
                </div>

                {/* Image Selection */}
                <div className="mb-4">
                    <label className="text-white mr-4">Rasmni tanlang:</label>

                    {/* Radio buttons to choose URL or File */}
                    <div className="flex items-center mb-2">
                        <input
                            type="radio"
                            id="url"
                            name="imageSource"
                            value="url"
                            checked={imageSource === 'url'}
                            onChange={() => setImageSource('url')}
                            className="mr-2"
                        />
                        <label htmlFor="url" className="text-white">URL</label>

                        <input
                            type="radio"
                            id="file"
                            name="imageSource"
                            value="file"
                            checked={imageSource === 'file'}
                            onChange={() => setImageSource('file')}
                            className="ml-4 mr-2"
                        />
                        <label htmlFor="file" className="text-white">Fayl</label>
                    </div>

                    {/* URL Input */}
                    {imageSource === 'url' && (
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={image && !image.startsWith('data:image') ? image : ''}
                            onChange={handleImageURLChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    )}

                    {/* File Input */}
                    {imageSource === 'file' && (
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageFileChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-white hover:bg-indigo-100 duration-300 text-indigo-500 text-lg font-semibold py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Post Yaratish
                </button>
            </form>
        </div>
    );
};

export default Create;
