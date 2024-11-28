import React from "react";
import ReactDOM from "react-dom";
import { useAlert } from "../../providers/AlertContext";

function ReportPostModal({id}){

    const reportCauses = ["Argumento engañoso o falso", "Evidencia engañosa o falsa", "Discursos de odio o violencia",
                          "Suplantación de identidad", "Violación a la privacidad", "Contenido delicado", "Spam"];
    
    const { showAlert } = useAlert();

    const handleSendReport = () => {
        showAlert("Se ha enviado el reporte exitosamente", "primary");
    }

    return ReactDOM.createPortal(
        <>
        <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="reportModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="reportModalLabel">Reporte</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h5 className="mb-3">Dinos qué sucede con esta publicación</h5>
                        <p className="fw-light mb-4">Escoge las opciones que mejor representen el caso</p>
                        <form className="mb-4 border-1 border-bottom pb-3">
                            {reportCauses.map((cause, index) => (
                                <div key={`report-form-${index}`} className="form-check mb-3">
                                    <input className="form-check-input" type="checkbox" value=""/>
                                    <label className="form-check-label">
                                        {cause}
                                    </label>
                                </div>
                            ))}
                        </form>  
                        <p className="fw-light">
                            Al enviar tu reporte, este será analizado por los moderadores de Punto y Contrapunto.
                            Recibirás una notificación con la resolución de tu reporte cuando sea resuelto.
                        </p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSendReport}>Enviar</button>
                    </div>
                </div>
            </div>
        </div>
        </>,
        document.getElementById('modal-root')
    );

}

export default ReportPostModal;