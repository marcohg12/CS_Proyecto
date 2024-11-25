import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import PostCard from "../post/PostCard";
import axios from "axios";
import { useParams } from "react-router";

function AccountPosts(){

    const { userId } = useParams();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        async function fetchAccountPosts(){

            if (loading){
                return;
            }

            setLoading(true);

            try {
                const response = await axios.get(`https://mastodon.social/api/v1/accounts/${userId}/statuses`);
                const directPosts = response.data.filter(post => post.in_reply_to_id === null);
                setPosts(directPosts);
            } catch (e){
                console.log("Error obteniendo las publicaciones de la cuenta", e);
            } finally {
                setLoading(false);
            }
        }

        fetchAccountPosts();
    // eslint-disable-next-line
    }, [userId]);


    return(
    <>
    {loading && 
        <div className="d-flex justify-content-center align-items-center">
            <ReactLoading type="spin" color="#3498db" height={50} width={50} />
        </div>
    }

    {posts.map((post) => (
        <PostCard key={post.id} post={post} />
    ))}
    </>
    );

}

export default AccountPosts;