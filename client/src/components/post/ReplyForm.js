import React, { useState } from "react";
import { useAlert } from "../../providers/AlertContext";
import axios from "axios";

function ReplyForm({ postId, addReplyCallback }){

    const [text, setText] = useState("");
    const { showAlert } = useAlert();

    async function handleReply(e){
        e.preventDefault();

        try {

            const response = await axios.post("https://mastodon.social/api/v1/statuses", {
                status: text,
                in_reply_to_id: postId
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem("mastodon_access_token")}`}
            });
            setText("");
            showAlert("¡Se ha enviado tu respuesta!", "primary");
            addReplyCallback(response.data);
        } catch (e){
            showAlert("Ha ocurrido un error al enviar tu respuesta, intenta de nuevo", "danger");
        }
        

    }

    return(
        <div className="mx-4 border-bottom border-1 mb-3">
            <form onSubmit={handleReply}>
                <div className="mb-3">
                    <textarea 
                        className="form-control"
                        required
                        value={text}
                        onChange={(e) => {setText(e.target.value)}}
                        placeholder="Postea tu respuesta">  
                    </textarea>
                </div>
                <div className="mb-4">
                    <button className="btn btn btn-outline-secondary me-2">Adjuntar evidencia</button>
                    <button type="submit" className="btn btn-primary">Publicar</button>
                </div>
            </form>
        </div>
    );

}

export default ReplyForm;