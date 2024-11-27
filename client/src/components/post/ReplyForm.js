import React, { useState, useRef } from "react";
import { useAlert } from "../../providers/AlertContext";
import axios from "axios";
import EvidenceModal from "../EvidenceModal";

function ReplyForm({ postId, addReplyCallback }){

    const [text, setText] = useState("");
    const { showAlert } = useAlert();
    const [evidence, setEvidence] = useState([]);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const formRef = useRef(null);

    const addEvidenceCallback = (newEvidence) => {
        setEvidence([...evidence, newEvidence]);
    };

    const deleteEvidenceByIndex = (index) => {
        const newEvidence = evidence.filter((_, i) => i !== index);
        setEvidence(newEvidence);
    };

    async function handleReply(e){
        e.preventDefault();

        const cleanedText = text.trim();

        if (cleanedText.length === 0){
            setShowError(true);
            setErrorMessage("Completa este campo");

            setTimeout(() => {
                setShowError(false);
                setErrorMessage("");
            }, 10000);

            return;
        }

        if (evidence.length === 0){
            setShowError(true);
            setErrorMessage("Debe adjuntar evidencia para el debate");

            setTimeout(() => {
                setShowError(false);
                setErrorMessage("");
            }, 10000);

            return;
        }

        let textWithEvidences = cleanedText;

        for (let i = 0; i < evidence.length; i++){
            textWithEvidences = textWithEvidences.concat("\n");
            textWithEvidences = textWithEvidences.concat(evidence[i]);
        }

        try {

            const response = await axios.post("https://mastodon.social/api/v1/statuses", {
                status: textWithEvidences,
                in_reply_to_id: postId
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem("mastodon_access_token")}`}
            });
            setText("");
            showAlert("¡Se ha enviado tu respuesta!", "primary");
            addReplyCallback(response.data);
            setShowError(false);
            setErrorMessage("");
            setEvidence([]);
        } catch (e){
            showAlert("Ha ocurrido un error al enviar tu respuesta, intenta de nuevo", "danger");
        }
        

    }

    return(
        <>
        <div className="mx-4 border-bottom border-1 mb-3">
            <form onSubmit={handleReply}>
                <div className="mb-3">
                    <textarea 
                        className="form-control"
                        required
                        value={text}
                        ref={formRef}
                        onChange={(e) => {setText(e.target.value)}}
                        placeholder="Postea tu respuesta">  
                    </textarea>
                </div>
                {showError && <p className="fw-light text-danger">{errorMessage}</p>}
                <div className="mb-4">
                    <button type="button" className="btn btn btn-outline-secondary me-2" data-bs-toggle="modal" data-bs-target="#replyEvidenceModal">Adjuntar evidencia</button>
                    <button type="submit" className="btn btn-primary">Publicar</button>
                </div>
            </form>
        </div>

        <EvidenceModal 
        id={"replyEvidenceModal"} 
        evidences={evidence}
        addEvidenceCallback={addEvidenceCallback}
        deleteEvidenceByIndexCallback={deleteEvidenceByIndex}
        >
        </EvidenceModal>
        </>
    );

}

export default ReplyForm;