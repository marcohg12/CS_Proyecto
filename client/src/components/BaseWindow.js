import React from "react";
import AlertModal from "./modals/AlertModal";

function BaseWindow({leftSideBar, pageContent, rightSideBar}){

    return(
    <>
        <div className="container-fluid">
            <AlertModal></AlertModal>
            <div className="row">
                {leftSideBar}
                <div className="col-6 offset-3">
                    {pageContent}
                </div>
                {rightSideBar}
            </div>
        </div>
    </>
    );

}

export default BaseWindow;