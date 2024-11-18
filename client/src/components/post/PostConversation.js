import React, { useEffect, useState } from "react";
//import { useAlert } from "../providers/AlertContext";
import { useParams } from "react-router-dom";
import PostCard from "./PostCard";
import axios from "axios";
import ReactLoading from "react-loading";
import PostDetailCard from "./PostDetailCard";

function PostConversation(){

    //const { alert } = useAlert();
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [replies, setReplies] = useState([]);
    const [loadingPost, setLoadingPost] = useState(false);
    const [loadingReplies, setLoadingReplies] = useState(false);

    useEffect(() => {

        // Obtiene el detalle del post
        async function fetchPost(){
            
            if (loadingPost){
                return;
            }

            setLoadingPost(true);

            try {
                const response = await axios.get(`https://mastodon.social/api/v1/statuses/${postId}`);
                setPost(response.data);
            } catch (e){
                console.log("Error al obtener la publicación", e);
            } finally {
                setLoadingPost(false);
            }
        }

        // Obtiene las respuestas del post
        async function fetchReplies(){

            if (loadingReplies){
                return;
            }
    
            setLoadingReplies(true);
    
            try {
                const response = await axios.get(`https://mastodon.social/api/v1/statuses/${postId}/context`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("mastodon_access_token")}` }
                });
                setReplies(response.data.descendants);
            } catch (e){
                console.log("Error obteniendo las respuestas de la publicación", e);
            } finally {
                setLoadingReplies(false);
            }
    
        }


        fetchPost();
        fetchReplies();
    // eslint-disable-next-line
    }, [postId]);

    return(
    <div className="mt-4">
        <div className="mb-4">
            {loadingPost && 
                <div className="d-flex justify-content-center align-items-center my-4">
                    <ReactLoading type="spin" color="#3498db" height={50} width={50} />
                </div>}
            {!loadingPost && post? <PostDetailCard post={post} /> : <></>}
        </div>
        <div>
            {loadingReplies &&
                <div className="d-flex justify-content-center align-items-center my-4">
                    <ReactLoading type="spin" color="#3498db" height={50} width={50} />
                </div>
            }
            <div className="mx-4">
            {!loadingReplies && replies.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
            </div>
        </div>
    </div>
    );

}

export default PostConversation;