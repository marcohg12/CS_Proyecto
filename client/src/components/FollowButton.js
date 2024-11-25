import React, { useEffect, useState } from "react";
import axios from "axios";

function FollowButton({ accountId }){

    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        async function fetchAccountRelatioship(){

            if (loading){
                return;
            }

            setLoading(true);

            try {

                const response = await axios.get(`https://mastodon.social/api/v1/accounts/relationships`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("mastodon_access_token")}` }
                });

                setIsFollowing(response.data.following);

            } catch (e){
                console.log("Error obteniendo la relación con la cuenta", e);
            } finally {
                setLoading(false);
            }
        }

        fetchAccountRelatioship();
        // eslint-disable-next-line
    }, []);

    async function handleFollow(){

        if (isFollowing){

            try {
                await axios.post(`https://mastodon.social/api/v1/accounts/${accountId}/unfollow`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("mastodon_access_token")}` }
                });
                setIsFollowing(false);
            } catch (e){
                console.log("Error al dejar de seguir al usuario", e);
            }

        } else {

            try {
                await axios.post(`https://mastodon.social/api/v1/accounts/${accountId}/follow`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("mastodon_access_token")}` }
                });
                setIsFollowing(true);
            } catch (e){
                console.log("Error al seguir al usuario", e);
            }

        }
    }

    return(<>{
        isFollowing?
        (<button type="button" onClick={handleFollow} className="btn btn-outline-primary">Siguiendo</button>)
        :
        (<button type="button" onClick={handleFollow} className="btn btn-primary">Seguir</button>)
    }</>);
}

export default FollowButton;