import React from "react";
import logo from "../../images/Logo.png";

function InfoSideBar(){

    return(
        <div className="col-3 end-0 position-fixed d-flex flex-column justify-content-start align-items-center" 
             style={{ height: '100vh' }}>
            <div className="mt-4">
                <img src={logo} alt="Mapari Logo" />
            </div>
            <p className="mt-3">
            <b>Punto y Contrapunto</b> es un cliente de Mastodon diseñado como un foro para debates constructivos, 
            donde cada argumento debe estar respaldado por evidencia, con enlaces a las fuentes de información. 
            Promovemos un ambiente respetuoso y libre de competitividad, priorizando el aprendizaje mutuo. 
            </p>
            <p>
            Los debates se organizan por medio de hilos, con herramientas de moderación para validar contribuciones 
            y mantener conversaciones de calidad. 
            </p>
            <p>
            Con una integración directa con Mastodon, buscamos fomentar el análisis y la argumentación razonada, 
            ofreciendo un espacio donde las ideas se enriquecen a través del diálogo informado y colaborativo.
            </p>
        </div>
    );
}

export default InfoSideBar;