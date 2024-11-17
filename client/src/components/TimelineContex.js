import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const TimelineContext = createContext();

export function useTimeline(){
  return useContext(TimelineContext);
}

export function TimelineProvider({ children }){
    
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [maxId, setMaxId] = useState(null);
    
    // Agrega un post al inicio de la lista
    const addPost = (newPost) => {
        setPosts((prevPosts) => [newPost, ...prevPosts]);
    };

    // Obtiene los post según el tipo de timeline
    const fetchPosts = useCallback(async (type) => {

        if (loading || !hasMore) {
            return;
        }

        setLoading(true);

        let requestString;

        if (type === "public") {
            // Obtiene el timeline público
            requestString = "https://mastodon.social/api/v1/timelines/public?local=true";
        } else if (type === "home") {
            // Obtiene el timeline del usuario en sesión
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
    <TimelineContext.Provider value={{ posts, addPost, fetchPosts, loading, hasMore }}>
        {children}
    </TimelineContext.Provider>
    );

}
