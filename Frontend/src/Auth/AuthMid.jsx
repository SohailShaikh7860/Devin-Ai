import React, {useState, useEffect} from 'react'
import { useAppContext } from '../context/context'
import { useNavigate } from 'react-router-dom';
import axios from '../config/axios';

const AuthMid = ({children}) => {
    const {user, setUser} = useAppContext();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        const checkAuth = async () => {
            try {
                // Try to fetch user profile - cookies will be sent automatically
                const response = await axios.get('/user/profile');
                
                if(response.data && response.data.user){
                    setUser(response.data.user);
                    setLoading(false);
                } else {
                    // No user found, redirect to login
                    setLoading(false);
                    navigate('/login');
                }
            } catch (error) {
                // Not authenticated or error, redirect to login
                console.error('Auth check failed:', error);
                setLoading(false);
                navigate('/login');
            }
        };

        // If user is already set, we're good
        if(user){
            setLoading(false);
            return;
        }

        // Otherwise, check auth by fetching profile
        checkAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if(loading){
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="text-white text-lg">Loading...</div>
            </div>
        )
    }
    
    // Only render children if user is authenticated
    if(!user){
        return null;
    }
    
    return <>{children}</>
}

export default AuthMid
