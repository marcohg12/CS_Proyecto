import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SERVER_ROUTE } from '../utils/constants';

function AuthHandler(){

    const navigate = useNavigate();
    
    useEffect(() => {

        async function getAccessToken(){
            
            // Extrae el código de autorización
            const params = new URLSearchParams(window.location.search);
            const code = params.get("code");

            if (code) {
                const response = await axios.get(`${SERVER_ROUTE}/auth/login_callback?code=${code}`);
                const { access_token } = response.data;
                localStorage.setItem("mastodon_access_token", access_token);
                navigate('/main');
            } 
            else {
                console.error('Authorization code is missing from the URL.');
            }
        }

        getAccessToken();
        
    }, [navigate]);

};

export default AuthHandler;
