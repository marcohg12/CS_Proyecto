import React, { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTimeline } from "./TimelineContex";
import "../styles/general.css";
import PostCard from "./PostCard";
import ReactLoading from "react-loading";

function Timeline({ type }) {
    
    const { posts, fetchPosts, loading, hasMore } = useTimeline();
    
    // Carga los posts al cargar el componente
    useEffect(() => {
        fetchPosts(type);
    }, [fetchPosts, type]);
    

    // Carga más posts cuando se esté llegando a la parte baja de la página (cuando se hace scroll hacía abajo)
    const handleScroll = useCallback(() => {
        
        const bottom = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
        
        if (bottom && !loading && hasMore) {
            fetchPosts(type);
        }
    
    }, [loading, hasMore, fetchPosts, type]);
    
    // Maneja el listener de la ventana para cargar más posts
    useEffect(() => {
        
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [handleScroll]);
    
    return (
    <div>
        
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
