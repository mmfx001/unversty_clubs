import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const Reyting = () => {
    const [users, setUsers] = useState([]);
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

    return (
        <div className="container mx-auto p-4">
            <p className="text-2xl font-bold mb-4">O'quvchilar reytingi</p>
            <div className="grid grid-cols-5 gap-2 bg-yellow-300 p-4 rounded">
                {/* Table Headers */}
                <div className="font-bold">Profil rasmi</div>
                <div className="font-bold">Ismi</div>
                <div className="font-bold">Fakultet</div>
                <div className="font-bold">Kursi</div>
                <div className="font-bold">Umumiy Coini</div>
            </div>
            <div className="divide-y divide-gray-200">
                {users.map((user, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-5 gap-2 items-center p-2 hover:bg-yellow-200 cursor-pointer"
                    >
                        <button
                            className="flex items-center justify-center"
                            onClick={() => openModal(user)}
                        >
                            <img
                                src={user.img || 'https://joybox.uz/wp-content/uploads/default-user.png'}
                                alt="Profil rasmi"
                                className="w-10 h-10 rounded-full"
                            />
                        </button>
                        <button
                            className="text-left"
                            onClick={() => openModal(user)}
                        >
                            {user.name} {user.surname}
                        </button>
                        <button
                            className="text-left"
                            onClick={() => openModal(user)}
                        >
                            {user.faculty}
                        </button>
                        <button
                            className="text-left"
                            onClick={() => openModal(user)}
                        >
                            {/* Assuming course is not provided; use placeholder */}
                            Kursi {user.course || 'Ma’lumot mavjud emas'}
                        </button>
                        <button
                            className="text-left"
                            onClick={() => openModal(user)}
                        >
                            {user.tokens.length > 0 ? user.tokens[0].quantity : 0} Coin
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal for user details */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="bg-white p-6 rounded shadow-lg max-w-sm mx-auto mt-20"
                overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
                contentLabel="User Details"
            >
                {selectedUser && (
                    <div>
                        <h2 className="text-xl font-bold mb-2">{selectedUser.name} {selectedUser.surname}</h2>
                        <p className="mb-4">
                            Umumiy Coini: {selectedUser.tokens.length > 0 ? selectedUser.tokens[0].quantity : 0}
                        </p>
                        <h3 className="text-lg font-semibold mb-2">Coin tarixi:</h3>
                        <ul className="list-disc pl-5">
                            {/* Iterate over tokens if they exist */}
                            {selectedUser.tokens && selectedUser.tokens.length > 0 ? (
                                selectedUser.tokens.map((item, idx) => (
                                    <li key={idx}>
                                        {/* Placeholder values, modify based on your backend structure */}
                                        Token ID: {item._id}, Miqdor: {item.quantity}
                                    </li>
                                ))
                            ) : (
                                <li>Mavjud emas</li>
                            )}
                        </ul>
                        <button
                            onClick={closeModal}
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Yopish
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
};


export default Reyting;