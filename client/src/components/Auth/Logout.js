import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

export const Logout = () => {
    const { onLogout } = useContext(AuthContext);

    useEffect(() => {
        async function logout() {
            await onLogout();
        }

        logout();
    }, [onLogout]);

    return <Navigate to="/" /> 
};