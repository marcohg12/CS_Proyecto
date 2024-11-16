import React, { useState, useEffect } from "react";
import "../styles/general.css";
import axios from "axios";

function UserSideBar(){

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        async function fetchUserData(){
            
            try {
                
                const response = await axios.get('https://mastodon.social/api/v1/accounts/verify_credentials', {
                    headers: {Authorization: `Bearer ${localStorage.getItem("mastodon_access_token")}`}
                });
                
                setUserData(response.data);
            
            } catch (err) {
                console.error('Error obteniendo los datos del usuario:', err);
            } finally {
                setLoading(false); // Stop loading when done
            }
        };
    
        fetchUserData();

      }, []);

    async function handleLogOut(){

    }
    
    return(
    <div className="col-3 position-fixed main-grad d-flex flex-column justify-content-between align-items-center"
          style={{ height: '100vh', padding: '1rem' }}
    >
        
        <div className="d-flex flex-column align-items-center mt-4">   
            <img
                src={userData.avatar}
                alt="Mi foto de perfil"
                className="rounded-circle mb-1"
                style={{ width: '90px', height: '90px' }}
            />
            <p className="text-center fw-bold text-light">@{userData.username}</p>
        </div>
        
        <button
            type="button"
            className="btn btn-light mb-3"
            onClick={handleLogOut}
            style={{ position: 'absolute', bottom: '1rem' }}
        >
            Cerrar sesión
        </button>

    </div>
    );

}

export default UserSideBar;