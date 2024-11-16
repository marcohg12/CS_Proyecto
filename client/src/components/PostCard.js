import React from "react";
import DOMPurify from "dompurify";
import "../styles/general.css";

function PostCard({ post }){

    const sanitizedContent = DOMPurify.sanitize(post.content);

    return(
    <div className="card mb-3">
        <div className="card-body">
            <div className="d-flex align-items-center mb-2">
                <img 
                    src={post.account.avatar}
                    className="rounded-circle mb-0 me-1" 
                    alt="Foto de perfil"
                    style={{ width: '40px', height: '40px'}}
                />
                <h5 className="card-title mb-0 me-2">@{post.account.username}</h5>
                <small className="mt-1">{new Date(post.created_at).toLocaleString()}</small>
            </div>
            <p className="card-text" dangerouslySetInnerHTML={{ __html: sanitizedContent }}></p>
            <div className="d-flex align-items-center">
                <i className="bi bi-chat-right me-1"></i>
                {post.replies_count}
                <i className="bi bi-repeat ms-4 me-1"></i>
                {post.reblogs_count}
                <i className="bi bi-suit-heart ms-4 me-1"></i>
                {post.favourites_count}
            </div>
        </div>
    </div>
    );

}

export default PostCard;