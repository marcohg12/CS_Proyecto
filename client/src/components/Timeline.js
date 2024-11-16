import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "../styles/general.css";
import axios from "axios";
import PostCard from "./PostCard";
import ReactLoading from "react-loading";

function Timeline({ type }) {

  const [posts, setPosts] = useState([]);       
  const [loading, setLoading] = useState(false); 
  const [hasMore, setHasMore] = useState(true);  
  const [maxId, setMaxId] = useState(null);

  const fetchPosts = useCallback(async () => {

    if (loading || !hasMore) {
      return;
    }

    setLoading(true);

    let requestString;

    if (type === "public"){
        requestString = "https://mastodon.social/api/v1/timelines/public?local=true";
    }
    else if (type === "home"){
        requestString = "https://mastodon.social/api/v1/timelines/home";
    }

    try {
      const response = await axios.get(requestString, {
        params: { max_id: maxId },
        headers: { Authorization: `Bearer ${localStorage.getItem("mastodon_access_token")}` }
      });

      const data = response.data;
      
      setPosts((prevPosts) => [...prevPosts, ...data]);

      setHasMore(data.length > 0);

      if (data.length > 0) {
        const linkHeader = response.headers.link;
        const nextMatch = linkHeader.match(/<([^>]+)>;\s*rel="next"/);
        const nextUrl = nextMatch[1];
        const maxIdMatch = nextUrl.match(/max_id=(\d+)/);
        setMaxId(maxIdMatch[1]);
      }

    } catch (error) {
      console.error("Error obteniendo las publicaciones:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, maxId, type]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleScroll = useCallback(() => {

    const bottom = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;

    if (bottom && !loading && hasMore) {
      fetchPosts();
    }

  }, [loading, hasMore, fetchPosts]);

  useEffect(() => {

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, [handleScroll]);

  return (
    <div className="col-6 offset-3">

        <Link to="/" className="no-link-styles">
            <div className="d-flex align-items-center border-bottom border-1 mb-3">
                <i className="bi bi-house mb-0 me-1" style={{ fontSize: '40px' }}></i>
                <h4 className="mb-0">Inicio</h4>
            </div>
        </Link>

      <div>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <div className="d-flex justify-content-center align-items-center">
        {loading && <ReactLoading type="spin" color="#3498db" height={50} width={50} />}
        {!hasMore && <p>No hay más debates por ver</p>}
      </div>

    </div>
  );
}

export default Timeline;
