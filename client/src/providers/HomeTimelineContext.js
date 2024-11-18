import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const HomeTimelineContext = createContext();

export function useHomeTimeline(){
  return useContext(HomeTimelineContext);
}

export function HomeTimelineProvider({ children }){
    
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [maxId, setMaxId] = useState(null);
    
    // Agrega un post al inicio de la lista
    const addPost = (newPost) => {
        setPosts((prevPosts) => [newPost, ...prevPosts]);
    };

    // Elimina un post de la lista
    const deletePost = (postId) => {
        setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    }

    // Obtiene los post del timeline del usuario
    const fetchPosts = useCallback(async () => {

        if (loading || !hasMore) {
            return;
        }

        setLoading(true);

        try {

            const response = await axios.get("https://mastodon.social/api/v1/timelines/home", {
                params: { max_id: maxId },
                headers: { Authorization: `Bearer ${localStorage.getItem("mastodon_access_token")}` }
            });

            const data = response.data;
            setPosts((prevPosts) => [...prevPosts, ...data]);
            setHasMore(data.length > 0);

            // Configura el id de paginación si hay más posts
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
    
    return (
    <HomeTimelineContext.Provider value={{ posts, addPost, deletePost, fetchPosts, loading, hasMore }}>
        {children}
    </HomeTimelineContext.Provider>
    );

}