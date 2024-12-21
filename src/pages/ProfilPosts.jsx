import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentModal from '../components/CommentModal';

const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
    </div>
);

const HeartIcon = ({ isLiked, onClick, likeCount, disabled }) => (
    <div className="flex items-center space-x-2">
        <svg
            onClick={(e) => {
                if (disabled) return;
                e.stopPropagation();
                onClick();
            }}
            className={`w-8 h-8 fill-current transition-colors duration-300 ${isLiked ? 'text-red-500' : 'text-gray-400'} ${disabled ? 'cursor-not-allowed opacity-50' : 'hover:text-red-500 cursor-pointer'
                }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        {likeCount > 0 && <span className="text-lg font-semibold text-gray-600">{likeCount}</span>}
    </div>
);

const ClubProfilPosts = () => {
    const [data, setData] = useState([]);
    const [users, setUsers] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [likedStates, setLikedStates] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [userData, setUserData] = useState(null);
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    useEffect(() => {
        const fetchPosts = async () => {
            if (!loggedInUser || !loggedInUser._id) {
                setError(true);
                return;
            }
            try {
                const [postsResponse, usersResponse] = await Promise.all([
                    axios.get('https://unversty-2.onrender.com/posts'),
                    axios.get('https://unversty-2.onrender.com/users'),
                ]);

                const filteredPosts = postsResponse.data.filter(post => post.club_id === loggedInUser._id);
                setData(filteredPosts);
                setUsers(usersResponse.data);

                const initialLikedStates = {};
                filteredPosts.forEach((item) => {
                    initialLikedStates[item._id] = false;
                });
                setLikedStates(initialLikedStates);

                if (loggedInUser) {
                    const user = usersResponse.data.find((u) => u.email === loggedInUser.email);
                    if (user) {
                        const userLikedItems = user.likeItems || [];
                        const updatedLikedStates = { ...initialLikedStates };
                        userLikedItems.forEach((id) => {
                            updatedLikedStates[id] = true;
                        });
                        setLikedStates(updatedLikedStates);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(true);  // Set error state if fetching fails
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [loggedInUser]);

    const handleCardClick = (post) => {
        setSelectedPost(post);
        setModalOpen(true);
        fetchComments(post._id);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedPost(null);
    };

    const fetchComments = async (postId) => {
        try {
            const response = await axios.get(`https://unversty-2.onrender.com/comments?productId=${postId}`);
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleCommentSubmit = async (postId, comment) => {
        try {
            const newComment = {
                postId,
                comment,
                userId: loggedInUser._id,
                userName: loggedInUser.name,
            };
            const response = await axios.post('https://unversty-2.onrender.com/comments', newComment);
            setComments([...comments, response.data]);  // Update comments with the new one
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <p className="text-center text-red-500">An error occurred while fetching the posts. Please try again later.</p>;

    return (
        <div className="w-full flex items-center justify-center bg-white">
            <div className="max-w-3xl h-[430px] w-full mx-auto p-2 lg:p-6 overflow-auto">
                <div className="flex flex-col space-y-8">
                    {data.length === 0 ? (
                        <p className="text-center text-lg font-poppins text-indigo-600">
                            Postlar mavjud emas
                        </p>
                    ) : (
                        data.map((post) => {
                            const postUser = users.find((user) => user._id === post.club_id); // Match user by userid
                            return (
                                <div
                                    key={post._id}
                                    className="bg-white p-4 rounded-lg duration-200 shadow-lg shadow-indigo-200"
                                >
                                    <div className="flex items-center space-x-4 mb-4">
                                        {postUser && (
                                            <img
                                                src={postUser.logo}
                                                alt={postUser.name}
                                                className="w-10 h-10 rounded-full"
                                            />
                                        )}
                                        <div className="flex flex-col">
                                            <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
                                            <p className="text-sm text-gray-500">{postUser?.name}</p>
                                        </div>
                                    </div>

                                    {/* Image */}
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-[250px] object-cover rounded-md mb-4"
                                    />

                                    {/* Post Details */}
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center space-x-3">
                                            <HeartIcon
                                                isLiked={likedStates[post._id]}
                                                onClick={() => handleLikeToggle(post)}
                                                disabled={loggedInUser && loggedInUser.email === 'guest@example.com'} // Disable like if guest
                                            />
                                            <span className="text-md text-gray-600">{post.likes} Likes</span>
                                        </div>
                                        {loggedInUser && loggedInUser.email !== 'guest@example.com' && (
                                            <button
                                                onClick={() => handleCardClick(post)}
                                                className="px-4 py-2 text-sm bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-200"
                                            >
                                                Izohlar
                                            </button>
                                        )}
                                    </div>

                                    {/* Post Caption */}
                                    <p className="text-sm text-gray-800">{post.description}</p>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
            {modalOpen && (
                <CommentModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onCommentSubmit={handleCommentSubmit}
                    allComments={comments}
                    productId={selectedPost._id}
                    userEmail={loggedInUser.email}
                    disabled={loggedInUser && loggedInUser.email === 'guest@example.com'} // Disable comments for guest
                />
            )}
        </div>
    );
};

export default ClubProfilPosts;