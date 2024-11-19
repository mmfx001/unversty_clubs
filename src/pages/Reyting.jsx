import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const Reyting = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // Fetch user data from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://unversty-2.onrender.com/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Disable loading state after data is fetched
            }
        };

        fetchData();
    }, []);

    // Open modal and set selected user
    const openModal = (user) => {
        setSelectedUser(user);
        setModalIsOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedUser(null);
    };

    // Skeleton loader component
    const SkeletonLoader = () => (
        <div className="animate-pulse">
            <div className="grid grid-cols-5 gap-4 p-6 rounded-xl bg-violet-600 shadow-md">
                <div className="w-16 h-16 rounded-full bg-gray-400"></div>
                <div className="h-6 bg-gray-400 rounded col-span-1"></div>
                <div className="h-6 bg-gray-400 rounded col-span-1"></div>
                <div className="h-6 bg-gray-400 rounded col-span-1"></div>
                <div className="h-6 bg-gray-400 rounded col-span-1"></div>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto p-6 bg-gradient-to-r from-blue-800 to-violet-700">
            <p className="text-4xl font-extrabold text-white mb-8 text-center">
                O'quvchilar Reytingi
            </p>
            <div className="grid grid-cols-5 gap-6 p-6 bg-gradient-to-r from-blue-800 to-violet-700 rounded-3xl shadow-xl">
                {/* Table Headers */}
                <div className="font-semibold text-white text-lg bg-violet-600 p-2 rounded-md text-center">
                    Profil rasmi
                </div>
                <div className="font-semibold text-white text-lg bg-violet-600 p-2 rounded-md text-center">
                    Ismi
                </div>
                <div className="font-semibold text-white text-lg bg-violet-600 p-2 rounded-md text-center">
                    Fakultet
                </div>
                <div className="font-semibold text-white text-lg bg-violet-600 p-2 rounded-md text-center">
                    Kursi
                </div>
                <div className="font-semibold text-white text-lg bg-violet-600 p-2 rounded-md text-center">
                    Umumiy Coini
                </div>
            </div>
            <div className="divide-y divide-violet-400">
                {/* Show skeleton loader if data is loading */}
                {loading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                        <SkeletonLoader key={index} />
                    ))
                ) : (
                    users.map((user, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-5 gap-4 items-center p-6 rounded-xl bg-violet-600 shadow-md"
                        >
                            <button
                                className="flex items-center justify-center"
                                onClick={() => openModal(user)}
                            >
                                <img
                                    src={user.img || 'https://joybox.uz/wp-content/uploads/default-user.png'}
                                    alt="Profil rasmi"
                                    className="w-16 h-16 rounded-full border-4 border-violet-600 shadow-lg"
                                />
                            </button>
                            <button
                                className="text-left text-white font-bold px-2 py-1 rounded-lg bg-violet-700"
                                onClick={() => openModal(user)}
                            >
                                {user.name} {user.surname}
                            </button>
                            <button
                                className="text-left text-white font-semibold px-2 py-1 rounded-lg bg-violet-700"
                                onClick={() => openModal(user)}
                            >
                                {user.faculty}
                            </button>
                            <button
                                className="text-left text-white font-semibold px-2 py-1 rounded-lg bg-violet-700"
                                onClick={() => openModal(user)}
                            >
                                Kursi {user.course || 'Ma’lumot mavjud emas'}
                            </button>
                            <button
                                className="text-left text-white font-semibold px-2 py-1 rounded-lg bg-violet-700"
                                onClick={() => openModal(user)}
                            >
                                {user.tokens.length > 0 ? user.tokens[0].quantity : 0} Coin
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Modal for user details */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="bg-gradient-to-r from-blue-800 to-violet-700 p-10 rounded-3xl shadow-2xl max-w-lg mx-auto mt-20"
                overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
                contentLabel="User Details"
            >
                {selectedUser && (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-violet-700 to-blue-800 p-8 rounded-3xl shadow-lg">
                            <h2 className="text-3xl font-bold text-white mb-4 text-center">
                                {selectedUser.name} {selectedUser.surname}
                            </h2>
                            <p className="text-lg text-white text-center">
                                Umumiy Coini: {selectedUser.tokens.length > 0 ? selectedUser.tokens[0].quantity : 0}
                            </p>
                        </div>

                        <div className="bg-gradient-to-r from-blue-800 to-violet-700 p-8 rounded-3xl shadow-lg">
                            <h3 className="text-2xl font-semibold text-white mb-4">Coin Tarixi:</h3>
                            <ul className="list-disc pl-6 space-y-3 text-white">
                                {selectedUser.tokens && selectedUser.tokens.length > 0 ? (
                                    selectedUser.tokens.map((item, idx) => (
                                        <li key={idx} className="text-lg">
                                            Token ID: {item._id}, Miqdor: {item.quantity}
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-lg">Mavjud emas</li>
                                )}
                            </ul>
                        </div>

                        <div className="text-center">
                            <button
                                onClick={closeModal}
                                className="mt-6 bg-violet-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-violet-700 transition duration-300"
                            >
                                Yopish
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Reyting;
