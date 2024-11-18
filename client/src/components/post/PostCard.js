import React from "react";
import DOMPurify from "dompurify";
import "../../styles/general.css";
import { formatDistanceToNow } from 'date-fns'; 
import { es } from 'date-fns/locale';
import PostActionsButton from "../post_buttons/PostActionsButton";
import { Link } from "react-router-dom";
import LikeButton from "./post_buttons/LikeButton";
import RespostButton from "./post_buttons/RepostButton";

function PostCard({ post }){

    const sanitizedContent = DOMPurify.sanitize(post.content);
    const relativeTime = formatDistanceToNow(new Date(post.created_at), 
                        { addSuffix: true, locale: es })
                        .replace(/alrededor de /, '');;

    return(
    <div className="card mb-3">
        <div className="card-body">
            <Link to={`/main/post/${post.id}`} className="no-link-styles">
            <div className="d-flex align-items-center mb-2">
                <img 
                    src={post.account.avatar}
                    className="rounded-circle mb-0 me-1" 
                    alt="Foto de perfil"
                    style={{ width: '40px', height: '40px'}}
                />
                <h5 className="card-title mb-0 me-2">@{post.account.username}</h5>
                <small className="mt-1 fw-light">{relativeTime}</small>
            </div>
            <p className="card-text" dangerouslySetInnerHTML={{ __html: sanitizedContent }}></p>
            </Link>
            <div className="d-flex align-items-center justify-content-between mt-2">

                <div>
                    <i className="bi bi-chat-right me-1"></i>
                    {post.replies_count}
                </div>

                <div>
                    <RespostButton 
                        postId={post.id}
                        repostsCount={post.reblogs_count}
                        repostStaus={post.reblogged}
                        showRepostsCount={true}>
                    </RespostButton>
                </div>

                <div>
                    <LikeButton 
                        postId={post.id} 
                        likesCount={post.favourites_count} 
                        likeStatus={post.favourited} 
                        showLikesCount={true}>
                    </LikeButton>
                </div>
        
                <PostActionsButton postAccountId={post.account.id} postId={post.id} />
            </div>
        </div>
    </div>
    );

}

export default PostCard;