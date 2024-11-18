import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const PublicTimelineContext = createContext();

export function usePublicTimeline(){
  return useContext(PublicTimelineContext);
}

export function PublicTimelineProvider({ children }){
    
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [maxId, setMaxId] = useState(null);

    // Obtiene los posts del timeline público
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
    <PublicTimelineContext.Provider value={{ posts, fetchPosts, loading, hasMore }}>
        {children}
    </PublicTimelineContext.Provider>
    );

}