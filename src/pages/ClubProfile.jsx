import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ClubPosts from "./ClubPost";

function ClubProfile() {
    const location = useLocation();
    const club = location.state?.club;

    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modalni yopish funksiyasi (misol uchun)
    const closeModal = () => {
        console.log("Modal yopildi!"); // Bu yerni siz haqiqiy modal yopilish logikasi bilan almashtiring.
    };

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                if (club?.followers) {
                    const followerIds = club.followers.split(",");
                    const requests = followerIds.map((id) =>
                        axios.get(`https://unversty-2.onrender.com/users/${id}`)
                    );
                    const responses = await Promise.all(requests);
                    setFollowers(responses.map((res) => res.data));
                }
            } catch (error) {
                console.error("Followerlarni olishda xatolik:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFollowers();
    }, [club]);

    if (!club) {
        return (
            <div className="text-center text-red-500 mt-20">
                Klub haqida ma’lumot topilmadi
            </div>
        );
    }

    return (
        <div className="w-full bg-gray-100 py-4 px-4 sm:px-6 lg:px-12">
        {/* Klub Logosi va Asosiy Ma'lumotlar */}
        <div className="bg-indigo-500 shadow-xl rounded-lg p-2 sm:p-10 mb-4">
            <div className="flex flex-col sm:flex-row items-center sm:ml-16 gap-6 sm:gap-14">
                <img
                    src={club.logo || "https://via.placeholder.com/150"}
                    alt={club.name || "Klub logosi"}
                    className="w-24 h-24 sm:w-36 sm:h-36 rounded-full border-4 p-1 border-white shadow-lg"
                />
                <div className="text-center sm:text-left">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                        {club.name || "Nomi ko'rsatilmagan"}
                    </h1>
                    <p className="text-lg sm:text-xl text-white mt-2">
                        {club.category || "Kategoriya ko'rsatilmagan"}
                    </p>
                    <p className="text-white mt-2 sm:mt-3 text-xl sm:text-xl font-bold">
                        {club.description || "Tavsif yo'q"}
                    </p>
                    <p className="text-md sm:text-lg text-white mt-2">
                        Klub ID: {club._id || "Noma'lum"}
                    </p>
                </div>
            </div>
        </div>
    
        <div className="flex flex-col sm:flex-row items-start justify-center gap-8">
            {/* Klub Postlar */}
            <div className="bg-white w-full sm:w-3/4 lg:w-2/3 p-2 h-[440px] rounded-lg shadow-lg mx-auto">
                <ClubPosts />
            </div>
    
            {/* Followerlarni ko'rsatish */}
            <div className="bg-white w-full sm:w-3/4 lg:w-1/3 p-6 rounded-lg shadow-lg mx-auto">
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                >
                    ✕
                </button>
    
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Followers
                </h2>
                {loading ? (
                    <p className="text-gray-600">Yuklanmoqda...</p>
                ) : followers.length > 0 ? (
                    <ul className="space-y-4">
                        {followers.map((follower) => (
                            <li
                                key={follower._id}
                                className="flex items-center p-4 border rounded-lg bg-gray-50 shadow-sm"
                            >
                                <img
                                    src={follower.logo || "https://via.placeholder.com/50"}
                                    alt={follower.name || "Noma'lum"}
                                    className="w-12 h-12 rounded-full border-2 mr-4"
                                />
                                <div>
                                    <p className="font-semibold text-gray-700">
                                        {follower.name || "Nomi yo'q"}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {follower.category || "Kategoriya yo'q"}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">Followerlar mavjud emas</p>
                )}
            </div>
        </div>
    </div>
    
    );
}

export default ClubProfile;
