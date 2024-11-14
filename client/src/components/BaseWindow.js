import React from "react";

function BaseWindow({sideBar, pageContent}){

    return(
    <>
    <div className="d-flex">
        {sideBar}
        <div className="content p-4" style={{ flex: 1 }}>
            {pageContent}
        </div>
    </div>
    </>);

}

export default BaseWindow;