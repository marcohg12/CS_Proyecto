import React, {useEffect, useState, useRef, useCallback}from "react";
import { useParams } from "react-router";
import ReactLoading from "react-loading";
import axios from "axios";
import PreviewAccountCard from "./PreviewAccountCard";

function AccountFollowing(){

    const { userId } = useParams();
    const [following, setFollowing] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [maxId, setMaxId] = useState(null);
    const observer = useRef();

    const fetchFollowing = useCallback(async() => {

        if (loading || !hasMore){
            return;
        }

        setLoading(true);

        try {
            const response = await axios.get(`https://mastodon.social/api/v1/accounts/${userId}/following`, {
                params: { max_id: maxId }
            });

            setFollowing((prevFollowers) => [...prevFollowers, ...response.data]);
            setHasMore(response.data.length > 0);

            if (response.data.length > 0) {
                const linkHeader = response.headers.link;
                const nextMatch = linkHeader.match(/<([^>]+)>;\s*rel="next"/);

                if (nextMatch){
                    const nextUrl = nextMatch[1];
                    const maxIdMatch = nextUrl.match(/max_id=(\d+)/);
                    setMaxId(maxIdMatch[1]);
                } else {
                    setHasMore(false);
                }

            }
        } catch (e){
            console.log("Error al obtener los usuarios a los que sigue la cuenta", e);
        } finally {
            setLoading(false);
        }
    }, [loading, hasMore, maxId, userId]);

    useEffect(() => {
        fetchFollowing();
        // eslint-disable-next-line
    }, [userId]);
    
    const lastPostElementRef = useCallback((node) => {
        
        if (loading){
            return;
        }
        
        if (observer.current){
            observer.current.disconnect();
        }
        
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                fetchFollowing();
            }
        });
        
        if (node){
            observer.current.observe(node);
        }
    }, [loading, fetchFollowing]);


    return(
        <>
        {following.map((account, index) => (
            <div ref={following.length === index + 1 ? lastPostElementRef : null} key={account.id}>
                <PreviewAccountCard  
                    account={account} 
                />
            </div>
        ))}
        {loading && 
            <div className="d-flex justify-content-center align-items-center">
                <ReactLoading type="spin" color="#3498db" height={50} width={50} />
            </div>
        }
        </>
    );
}

export default AccountFollowing;