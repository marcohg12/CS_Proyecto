import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const UserContext = createContext();

export function useUser(){
  return useContext(UserContext);
}

export function UserProvider({ children }){
    
    const [currentUser, setCurrentUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    async function fetchUserData(){
            
        try {

            const response = await axios.get('https://mastodon.social/api/v1/accounts/verify_credentials', {
                headers: {Authorization: `Bearer ${localStorage.getItem("mastodon_access_token")}`}
            });
            
            setCurrentUser(response.data);
        
        } catch (err) {
            console.error('Error obteniendo los datos del usuario:', err);
        } finally {
            setLoadingUser(false); 
        }
    }
    
    useEffect(() => {
        
        fetchUserData();

    }, []);
    
    return(
        <UserContext.Provider value={{ currentUser, loadingUser, fetchUserData }}>
            {children}
        </UserContext.Provider>
    );
}
