import React, { useState, useRef } from "react";
import "../../styles/general.css";
import axios from 'axios';
import { useAlert } from "../../providers/AlertContext";
import { useHomeTimeline } from "../../providers/HomeTimelineContext";
import EvidenceModal from "../EvidenceModal";

function PostForm(){

    const [text, setText] = useState("");
    const [evidence, setEvidence] = useState([]);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { showAlert } = useAlert();
    const { addPost } = useHomeTimeline();
    const formRef = useRef(null);

    const addEvidenceCallback = (newEvidence) => {
        setEvidence([...evidence, newEvidence]);
    };

    const deleteEvidenceByIndex = (index) => {
        const newEvidence = evidence.filter((_, i) => i !== index);
        setEvidence(newEvidence);
      };

    async function handlePostPublication(e){

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
                status: textWithEvidences
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem("mastodon_access_token")}`}
            });

            showAlert("¡Se ha publicado exitosamente tu debate!", "primary");
            setText("");
            setEvidence([]);
            addPost(response.data);
            setErrorMessage("");
            setShowError(false);
        } catch (e){
            showAlert("Ha ocurrido un error al publicar tu debate, intenta de nuevo", "danger");
        }

    }

    return(
    <>
    <form className="mb-4" onSubmit={handlePostPublication}>
        <div className="mb-3">
            <textarea 
                className="form-control" 
                placeholder="¿Qué quieres debatir?" 
                rows="4" 
                required
                value={text}
                ref={formRef}
                onChange={(e) => {setText(e.target.value)}}/>
        </div>
        {showError && <p className="fw-light text-danger">{errorMessage}</p>}
        <button type="button" className="btn btn btn-outline-secondary me-2" data-bs-toggle="modal" data-bs-target="#evidenceModal">Adjuntar evidencia</button>
        <button type="submit" className="btn btn-primary">Publicar</button>
    </form>

    <EvidenceModal 
        id={"evidenceModal"} 
        evidences={evidence}
        addEvidenceCallback={addEvidenceCallback}
        deleteEvidenceByIndexCallback={deleteEvidenceByIndex}
    >
    </EvidenceModal>
    </>
    );

}

export default PostForm;