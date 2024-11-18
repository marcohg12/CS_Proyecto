import React from "react";
import { useAlert } from "../providers/AlertContext";

function BaseWindow({leftSideBar, pageContent, rightSideBar}){

    const { alert } = useAlert();

    return(
    <>
        <div className="container-fluid">
            <div className="row">
                {leftSideBar}
                <div className="col-6 offset-3">
                    {alert && (
                        <div className={`alert alert-${alert.type} mt-4`} role="alert">
                            {alert.message}
                        </div>
                    )}
                    {pageContent}
                </div>
                {rightSideBar}
            </div>
        </div>
    </>
    );

}

export default BaseWindow;