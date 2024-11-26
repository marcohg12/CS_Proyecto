import React from "react";
import { Link } from "react-router-dom";

function PreviewAccountCard({account}){

    return(
        <div className="card mb-2">
            <div className="d-flex align-items-center my-2 ms-2">
                <img 
                    src={account.avatar}
                    className="rounded-circle mb-0 me-1" 
                    alt="Foto de perfil"
                    style={{ width: '40px', height: '40px'}}
                />
                <div>
                    <Link className="no-link-styles" to={`/main/profile/${account.id}`}>
                        <h5 className="card-title mb-0 me-2">@{account.username}</h5>
                    </Link>
                </div>
            </div>
        </div>
    );

}

export default PreviewAccountCard;