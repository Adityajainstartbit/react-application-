import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { tokenLoader } from '../util/auth';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = tokenLoader();
    useEffect( ()=>{
     if(!token)
        {
         toast.error("please login before continue") 
        }
    })
   
    

    return token != null ? (
        <>{children}</>
    ) : (
        <>
           
            <Navigate to="/auth?mode=login" />
        </>
    );
};

export default ProtectedRoute;
