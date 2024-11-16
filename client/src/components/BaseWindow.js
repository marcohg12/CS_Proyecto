import React from "react";

function BaseWindow({sideBar, pageContent}){

    return(
    <div className="container-fluid">
        <div className="row">
            {sideBar}
            {pageContent}
        </div>
    </div>
    );

}

export default BaseWindow;