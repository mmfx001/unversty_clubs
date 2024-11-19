import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentModal from '../components/CommentModal';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen ">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4  border-blue-500 border-solid"></div>
  </div>
);

const HeartIcon = ({ isLiked, onClick, likeCount }) => (
  <div className="flex items-center space-x-2">
    <svg
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`w-8 h-8 fill-current transition-colors duration-300 ${isLiked ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 cursor-pointer`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
    {likeCount > 0 && <span className="text-lg font-semibold text-gray-600">{likeCount}</span>}
  </div>
);

const Posts = () => {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [likedStates, setLikedStates] = useState({});
  const [loading, setLoading] = useState(true); // New loading state
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://unversty-2.onrender.com/posts');
        setData(response.data);
        const initialLikedStates = {};
        response.data.forEach((item) => {
          initialLikedStates[item._id] = false;
        });
        setLikedStates(initialLikedStates);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://unversty-2.onrender.com/users');
        setUsers(response.data);
        if (loggedInUser) {
          const user = response.data.find((u) => u.email === loggedInUser.email);
          if (user) {
            const userLikedItems = user.likeItems || [];
            const updatedLikedStates = { ...likedStates };
            userLikedItems.forEach((id) => {
              updatedLikedStates[id] = true;
            });
            setLikedStates(updatedLikedStates);
          }
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [loggedInUser]);

  const handleLikeToggle = async (post) => {
    if (!loggedInUser) {
      alert('Please log in to like a post.');
      return;
    }
    // (Existing like toggle logic here)
  };

  const handleCardClick = (post) => {
    setSelectedPost(post);
    setModalOpen(true);
    fetchComments(post._id);
  };

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(
        `https://unversty-2.onrender.com/comments?productId=${postId}`
      );
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  if (loading) return <LoadingSpinner />;


  return (
    <div className=" w-full items-center justify-center mx-auto p-4 h-screen">
      <div className="max-w-xl mx-auto p-5 mt-10 overflow-auto" style={{ maxHeight: '90vh' }}>
        <div className="flex flex-col space-y-6">
          {data.length === 0 ? (
            <p className="text-center text-lg font-poppins">No posts available at the moment.</p>
          ) : (
            data.map((post) => (
              <div key={post._id} className="bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  {loggedInUser && (
                    <img
                      src={loggedInUser.img} // Use the image from the fetched user data
                      alt={loggedInUser.name} // Use the name from the fetched user data
                      className="w-12 h-12 rounded-full border-2 border-blue-500"
                    />
                  )}
                  <h3 className="text-lg font-bold">{post.title}</h3>
                </div>
                <p className="text-gray-600 mb-5">{post.description}</p>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 object-cover rounded-md mb-2"
                />
                <p className="text-md mb-2">{post.datetime}</p>
                <div className="flex justify-between items-center">
                  <HeartIcon
                    isLiked={likedStates[post._id]}
                    onClick={() => handleLikeToggle(post)}
                    likeCount={post.likes}
                  />
                  <button
                    onClick={() => handleCardClick(post)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Izohlar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {modalOpen && (
        <CommentModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onCommentSubmit={(newComment) => setComments((prev) => [newComment, ...prev])}
          allComments={comments}
          productId={selectedPost._id}
          userEmail={loggedInUser.email}
        />
      )}
    </div>
  );
};

export default Posts;
