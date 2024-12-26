import React, { useEffect, useState } from "react";
import axios from "axios";
import ClubPosts from "./ClubPost";

function Profile() {
    const [club, setClub] = useState(null);
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClubData = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                setError("Token not found. Please log in.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await axios.get(
                    `http://37.140.216.178/api/v1/clubs/info/`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const clubData = response.data?.[0];
                if (!clubData) {
                    setError("No club data found.");
                } else {
                    setClub(clubData);
                    setFollowers(clubData.followers || []);
                }
            } catch (error) {
                console.error("Error fetching club data:", error);
                setError("Failed to fetch club data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchClubData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg text-gray-600">Yuklanmoqda...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 mt-20">
                {error}
            </div>
        );
    }

    if (!club) {
        return (
            <div className="text-center text-red-500 mt-20">
                Klub haqida ma’lumot topilmadi
            </div>
        );
    }

    return (
        <div className="w-full bg-gray-100 py-4 px-4 sm:px-6 lg:px-12">
            <div className="bg-indigo-500 shadow-xl rounded-lg p-2 sm:p-10 mb-4">
                <div className="flex flex-col sm:flex-row items-center sm:ml-16 gap-6 sm:gap-14">
                    <img
                        src={club.logo ? `http://37.140.216.178${club.logo}` : "https://via.placeholder.com/150"}
                        alt={club.name || "Klub logosi"}
                        className="w-24 h-24 sm:w-36 sm:h-36 rounded-full border-4 p-1 border-white shadow-lg"
                    />

                    <div className="text-center sm:text-left">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                            {club.name || "Nomi ko'rsatilmagan"}
                        </h1>
                        <p className="text-lg sm:text-xl text-white mt-2">
                            {club.category?.name || "Kategoriya ko'rsatilmagan"}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start justify-center gap-8">
                <div className="bg-white w-full sm:w-3/4 lg:w-2/3 p-2 h-[550px] rounded-lg shadow-lg mx-auto">
                    <ClubPosts />
                </div>

                <div className="bg-white w-full sm:w-3/4 lg:w-1/3 p-6 rounded-lg shadow-lg mx-auto">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Followers</h2>
                    {followers.length > 0 ? (
                        <ul className="space-y-4">
                            {followers.map((follower) => (
                                <li
                                    key={follower.id}
                                    className="flex items-center p-4 border rounded-lg bg-gray-50 shadow-sm"
                                >
                                    <img
                                        src={
                                            follower.image
                                                ? `http://37.140.216.178${follower.image}`
                                                : "https://via.placeholder.com/100"
                                        }
                                        alt={`${follower.name || "User"} ${follower.surname || ""
                                            }`}
                                        className="w-12 h-12 rounded-full border-2 mr-4"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-700">
                                            {follower.name || "No name"}{" "}
                                            {follower.surname || ""}
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

export default Profile;
