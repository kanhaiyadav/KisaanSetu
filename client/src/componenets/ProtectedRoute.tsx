import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken } from '../redux/user/selectors';

const ProtectedRoute = ({ element: Element, ...rest }: { element: any }
) => {
    const isAuthenticated = useSelector(selectToken).length ? true : false;

    return (
        <Route
            {...rest}
            element={isAuthenticated ? <Element /> : <Navigate to="/signin" />}
        />
    );
};

export default ProtectedRoute;