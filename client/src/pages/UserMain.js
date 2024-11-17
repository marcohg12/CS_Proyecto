import React from "react";
import UserSideBar from "../components/UserSideBar";
import BaseWindow from "../components/BaseWindow";
import Timeline from "../components/Timeline";
import ActionsSideBar from "../components/ActionsSideBar";

function UserMain(){

    return(
        <BaseWindow 
            leftSideBar={<UserSideBar/>} 
            pageContent={<Timeline type="home"/>}
            rightSideBar={<ActionsSideBar/>}
        />);

}

export default UserMain;