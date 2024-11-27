import React, {useRef} from "react";
import ReactDOM from "react-dom";

function EvidenceModal({evidences, id, addEvidenceCallback, deleteEvidenceByIndexCallback}){

    const formRef = useRef(null);

    function handleAddEvidence(e){
        e.preventDefault();
        const form = formRef.current;
        const evidenceLink = form.evidenceLink.value;
        addEvidenceCallback(evidenceLink);
        form.reset();
    }

    function handleDeleteEvidence(index){
        deleteEvidenceByIndexCallback(index);
    }

    return ReactDOM.createPortal(
    <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="evidenceModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="evidenceModalLabel">Evidencias</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">

                    {evidences.map((evidence, index) => (
                        <div key={index} className="d-flex justify-content-between border-bottom border-1 my-2 pt-2">
                            <p className="text-truncate">{evidence}</p>
                            <button onClick={() => {handleDeleteEvidence(index)}} type="button" className="btn-close "></button>
                        </div>
                    ))}

                    <form className="mt-3 d-flex" ref={formRef} onSubmit={handleAddEvidence}>
                        <input 
                            id="evidenceLink" 
                            name="evidenceLink" 
                            className="form-control me-2"
                            required 
                            type="text" 
                            placeholder="Enlace a la fuente"></input>
                        <button type="submit" className="btn btn-primary">Agregar</button>
                    </form>

                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>,
    document.getElementById('modal-root')
    );
}

export default EvidenceModal;