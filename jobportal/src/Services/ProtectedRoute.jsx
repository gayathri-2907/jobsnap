import {jwtDecode} from 'jwt-decode';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = useSelector((state) => state.jwt);
    if (!token) {
        return <Navigate to="/login" />;
    }
    
    const decoded = jwtDecode(token);
    
    if (decoded.exp - decoded.iat  === 0){
        return <Navigate to="/login" />;
    }
    else{
        if (allowedRoles && !allowedRoles.includes(decoded.accountType)) {
            return <Navigate to="/unauthorized" />;
        }
    }

    return children;
}

ProtectedRoute.propTypes = {
    children: PropTypes.element.isRequired,
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ProtectedRoute;
