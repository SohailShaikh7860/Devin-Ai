import React, {useState} from 'react'
import { useAppContext } from '../context/context'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthMid = ({children}) => {
    const {user} = useAppContext();
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

   

    

    useEffect(()=>{
         if(user){
        setLoading(false);
    }
       if(!token){
         navigate('/login');
       }

       if(!user){
        navigate('/login');
       }
    },[])

    if(loading){
        return <div>Loading...</div>
    }
  return (
      <>{children}</>
  )
}

export default AuthMid
