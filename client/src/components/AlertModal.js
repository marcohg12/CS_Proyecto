import React from "react";
import { useAlert } from "../providers/AlertContext";

function AlertModal(){

    const { alert } = useAlert();

    return(
        <>
        {alert &&
            (
                <div tabIndex="-1" style={{ position: 'fixed', bottom: 20, left: 20, zIndex: 1050 }}>
                    <div className={`alert alert-${alert.type} mt-4`} role="alert">
                        {alert.message}
                    </div>
                </div>
            )
        }
        </>
    );
}

export default AlertModal;