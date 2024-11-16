import React, { useState, useEffect, useCallback } from "react";
import { Link } from 'react-router-dom';
import "../styles/general.css";
import axios from 'axios';
import PostCard from "./PostCard";

function Timeline() {

  const [posts, setPosts] = useState([]);       
  const [loading, setLoading] = useState(false); 
  const [hasMore, setHasMore] = useState(true);  
  const [maxId, setMaxId] = useState(null);

  const fetchPosts = useCallback(async () => {
    
    if (loading || !hasMore) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get("https://mastodon.social/api/v1/timelines/public?local=true", {
        params: { max_id: maxId }
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
  }, [loading, hasMore, maxId]);

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
      {posts.length === 0 && !loading && <p>No hay más debates por ver</p>}
      <div>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {loading && <p>Cargando debates...</p>}
      {!hasMore && <p>No hay más debates por ver</p>}
    </div>
  );
}

export default Timeline;
