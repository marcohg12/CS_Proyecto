import React, { useState } from "react";
import DOMPurify from "dompurify";
import "../../styles/general.css";
import PostActionsButton from "../post_buttons/PostActionsButton";
import LikeButton from "./post_buttons/LikeButton";

function PostDetailCard({ post }){

    const sanitizedContent = DOMPurify.sanitize(post.content);
    const [likes, setLikes] = useState(post.favourites_count);

    const handleLikesChange = (newLikes) => {
        setLikes(newLikes);
    };

    return(
    <div className="m-4 py-4 border-bottom border-top border-1">
        <div className="card-body">
            <div className="d-flex align-items-center mb-2">
                <img 
                    src={post.account.avatar}
                    className="rounded-circle mb-0 me-1" 
                    alt="Foto de perfil"
                    style={{ width: '40px', height: '40px'}}
                />
                <h5 className="card-title mb-0 me-2">@{post.account.username}</h5>
            </div>
            <p className="card-text" dangerouslySetInnerHTML={{ __html: sanitizedContent }}></p>
            <small className="mt-1 fw-light">{(new Date(post.created_at)).toLocaleString()}</small>

            <div className="d-flex mt-1 align-items-center py-3 border-bottom border-top border-1">

                <div className="mx-2">
                    {post.replies_count}
                    {" "} {post.replies_count === 1? "respuesta" : "respuestas"}
                </div>

                <i className="bi bi-dot"></i>

                <div className="mx-2">
                    {post.reblogs_count}
                    {" "} {post.reblogs_count === 1? "compartido" : "compartidos"}
                </div>

                <i className="bi bi-dot"></i>

                <div className="mx-2">
                    {likes}
                    {" me gusta"}
                </div>
            </div>

            <div className="d-flex align-items-center justify-content-between mx-2 mt-4">
                
                <div>
                    <i className="bi bi-chat-right me-1"></i>
                </div>
                
                <div>
                    <i className="bi bi-repeat ms-4 me-1"></i>
                </div>
                
                <div>
                    <LikeButton 
                        postId={post.id} 
                        likesCount={post.favourites_count} 
                        likeStatus={post.favourited} 
                        showLikesCount={false}
                        callbackOnChange={handleLikesChange}></LikeButton>
                </div>

                <PostActionsButton postAccountId={post.account.id} postId={post.id} />
            
            </div>

        </div>
    </div>
    );

}

export default PostDetailCard;