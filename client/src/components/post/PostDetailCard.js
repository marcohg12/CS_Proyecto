import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import "../../styles/general.css";
import PostActionsButton from "./post_buttons/PostActionsButton";
import LikeButton from "./post_buttons/LikeButton";
import BookmarkButton from "./post_buttons/BookmarkButton";
import RepostButton from "./post_buttons/RepostButton";
import { Link } from "react-router-dom";
import Microlink from "@microlink/react";

function PostDetailCard({ post }){

    const sanitizedContent = DOMPurify.sanitize(post.content.replace(/<a[^>]*>(.*?)<\/a>/g, ''));
    const [likes, setLikes] = useState(post.favourites_count);
    const [reposts, setReposts] = useState(post.reblogs_count);
    const [evidence, setEvidence] = useState([]);
    const [viewEvidences, setViewEvidences] = useState(false);

    function extractLinksFromPostContent(content){
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        
        const anchorElements = doc.querySelectorAll('a');
        
        const links = Array.from(anchorElements).map(a => a.href);
      
        return links;
    }

    const handleLikesChange = (newLikes) => {
        setLikes(newLikes);
    };

    const handleRepostsChange = (newReposts) => {
        setReposts(newReposts)
    };

    const toggleEvidenceView = () => {
        setViewEvidences(!viewEvidences);
    }

    useEffect(() => {
        const links = extractLinksFromPostContent(post.content);
        setEvidence(links);
    }, [post]);

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
                <Link className="no-link-styles" to={`/main/profile/${post.account.id}`}>
                    <h5 className="card-title mb-0 me-2">@{post.account.username}</h5>
                </Link>
            </div>
            <p className="card-text" dangerouslySetInnerHTML={{ __html: sanitizedContent }}></p>

            {viewEvidences && (
                <div className="my-1">
                    {evidence.map((link) => (
                        <div className="mb-1">
                            <Microlink url={link} />
                        </div>
                    ))}
                </div>
            )}

            <small className="mt-1 fw-light">{(new Date(post.created_at)).toLocaleString()}</small>

            <div className="d-flex mt-1 py-3 border-bottom border-top border-1">

                <div className="me-2">
                    {reposts}
                    {" "} {reposts === 1? "compartido" : "compartidos"}
                </div>

                <i className="bi bi-dot"></i>

                <div className="mx-2">
                    {likes}
                    {" me gusta"}
                </div>

                <button className="ms-auto btn btn-outline-secondary" onClick={toggleEvidenceView}>
                    {viewEvidences? "Ocultar evidencias" : "Ver evidencias"}
                </button>
                
            </div>

            <div className="d-flex align-items-center justify-content-between mx-2 mt-4">
                
                <div>
                    <BookmarkButton 
                        postId={post.id} 
                        bookmarkStatus={post.bookmarked}></BookmarkButton>
                </div>
                
                <div>
                    <RepostButton
                        postId={post.id}
                        repostsCount={post.reblogs_count}
                        repostStaus={post.reblogged}
                        showRepostsCount={false}
                        callbackOnChange={handleRepostsChange}></RepostButton>
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