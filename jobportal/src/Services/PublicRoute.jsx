import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
    const token = useSelector((state) => state.jwt);
    if (token) {
        return <Navigate to="/" />;  // Redirect authenticated users to home or another page
    }

    return children;
}

PublicRoute.propTypes = {
    children: PropTypes.element.isRequired
};

export default PublicRoute;
