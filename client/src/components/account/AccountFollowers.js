import React, {useEffect, useState, useRef, useCallback}from "react";
import { useParams } from "react-router";
import ReactLoading from "react-loading";
import axios from "axios";
import PreviewAccountCard from "./PreviewAccountCard";

function AccountFollowers(){

    const { userId } = useParams();
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [maxId, setMaxId] = useState(null);
    const observer = useRef();
    
    const fetchFollowers = useCallback(async() => {

        if (loading || !hasMore){
            return;
        }

        setLoading(true);

        try {
            const response = await axios.get(`https://mastodon.social/api/v1/accounts/${userId}/followers`, {
                params: { max_id: maxId }
            });

            setFollowers((prevFollowers) => [...prevFollowers, ...response.data]);
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
            console.log("Error al obtener los seguidores de la cuenta", e);
        } finally {
            setLoading(false);
        }
    }, [loading, hasMore, maxId, userId]);

    useEffect(() => {
        fetchFollowers();
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
                fetchFollowers();
            }
        });
        
        if (node){
            observer.current.observe(node);
        }
    }, [loading, fetchFollowers]);


    return(
        <>
        {followers.map((account, index) => (
            <div ref={followers.length === index + 1 ? lastPostElementRef : null} key={account.id}>
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

export default AccountFollowers;