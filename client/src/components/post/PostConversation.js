import React, { useEffect, useState, useRef } from "react";
//import { useAlert } from "../providers/AlertContext";
import { useParams } from "react-router-dom";
import PostCard from "./PostCard";
import axios from "axios";
import ReactLoading from "react-loading";
import PostDetailCard from "./PostDetailCard";
import ReplyForm from "./ReplyForm";

function PostConversation(){

    //const { alert } = useAlert();
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [replies, setReplies] = useState([]);
    const [ancestors, setAncestors] = useState([]);
    const [loadingPost, setLoadingPost] = useState(false);
    const [loadingRepliesAndAncestors, setLoadingRepliesAndAncestors] = useState(false);

    const detailCardRef = useRef(null);

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
                return response.data;
            } catch (e){
                console.log("Error al obtener la publicación", e);
                return null;
            } finally {
                setLoadingPost(false);
            }

        }

        // Obtiene las respuestas del post
        async function fetchRepliesAndAncestors(currentPost){

            if (loadingRepliesAndAncestors){
                return;
            }
    
            setLoadingRepliesAndAncestors(true);
    
            try {

                const response = await axios.get(`https://mastodon.social/api/v1/statuses/${postId}/context`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("mastodon_access_token")}` }
                });

                const directReplies = response.data.descendants.filter(reply => reply.in_reply_to_id === postId);
                setReplies(directReplies);

                const directAncestors = [];
                
                // Obtiene la línea directa de ancestros
                let directAncestor = response.data.ancestors.find(ancestor => currentPost.in_reply_to_id === ancestor.id);

                if (directAncestor === undefined){
                    setAncestors(directAncestors);
                    return;
                }

                directAncestors.push(directAncestor);

                while (directAncestor.in_reply_to_id !== null){

                    // eslint-disable-next-line
                    directAncestor = response.data.ancestors.find(ancestor => directAncestor.in_reply_to_id === ancestor.id);

                    if (directAncestor === undefined){
                        break;
                    }

                    directAncestors.push(directAncestor);
                }

                setAncestors(directAncestors.reverse());

            } catch (e){
                console.log("Error obteniendo las respuestas de la publicación", e);
            } finally {
                setLoadingRepliesAndAncestors(false);
            }
    
        }

        // Obtiene los datos de la conversación
        async function fetchDataForConversation(){

            const currentPost = await fetchPost();

            if (currentPost){
                fetchRepliesAndAncestors(currentPost);
            }
        }

        fetchDataForConversation();

    // eslint-disable-next-line
    }, [postId]);

    useEffect(() => {
        if (!loadingPost && !loadingRepliesAndAncestors && ancestors.length !== 0 && detailCardRef.current) {
          detailCardRef.current.scrollIntoView({
            behavior: "smooth",
          });
        }
    }, [post, loadingPost, loadingRepliesAndAncestors, ancestors]);

    // Agrega una respuesta a la lista de respuestas
    const addReply = (newReply) => {
        setReplies((prevReplies) => [newReply, ...prevReplies]);
    };

    return(
    <div className="mt-4">
        <div>
            <div className="mx-4">
                {!loadingRepliesAndAncestors && ancestors.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
        <div className="my-4">
            {loadingPost && 
                <div className="d-flex justify-content-center align-items-center my-4">
                    <ReactLoading type="spin" color="#3498db" height={50} width={50} />
                </div>}
            {!loadingPost && post? <div ref={detailCardRef}><PostDetailCard post={post} /></div> : <></>}
        </div>
        {!loadingPost && post? <ReplyForm postId={post.id} addReplyCallback={addReply}/> : <></>}
        <div>
            {loadingRepliesAndAncestors &&
                <div className="d-flex justify-content-center align-items-center my-4">
                    <ReactLoading type="spin" color="#3498db" height={50} width={50} />
                </div>
            }
            <div className="mx-4">
            {!loadingRepliesAndAncestors && replies.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
            </div>
        </div>
    </div>
    );

}

export default PostConversation;