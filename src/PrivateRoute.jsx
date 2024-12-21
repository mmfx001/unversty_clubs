import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, guestOnly }) => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        return <Navigate to="/" />; // Redirect to login if no logged-in user
    }

 

    return children;
};

export default PrivateRoute;
