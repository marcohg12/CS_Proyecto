import React, { useState } from "react";
import "../styles/general.css";
import axios from 'axios';
import { useAlert } from "./AlertContext";
import { useTimeline } from "./TimelineContex";

function PostForm(){

    const [text, setText] = useState("");
    const { showAlert } = useAlert();
    const { addPost } = useTimeline();

    async function handlePostPublication(e){

        e.preventDefault();

        try {
            const response = await axios.post("https://mastodon.social/api/v1/statuses", {
                status: text
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem("mastodon_access_token")}`}
            });

            showAlert("¡Se ha publicado exitosamente tu debate!", "primary");
            setText("");
            addPost(response.data);
        } catch (e){
            showAlert("Ha ocurrido un error al publicar tu debate, intenta de nuevo", "danger");
        }

    }

    return(
    <form className="mb-4" onSubmit={handlePostPublication}>
        <div className="mb-3">
            <textarea 
                className="form-control" 
                placeholder="¿Qué quieres debatir?" 
                rows="4" 
                required
                value={text}
                onChange={(e) => {setText(e.target.value)}}/>
        </div>
        <button className="btn btn btn-outline-secondary me-2">Adjuntar evidencia</button>
        <button type="submit" className="btn btn-primary">Publicar</button>
    </form>
    );

}

export default PostForm;