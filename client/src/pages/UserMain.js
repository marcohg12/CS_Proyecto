import React from "react";
import UserSideBar from "../components/UserSideBar";
import BaseWindow from "../components/BaseWindow";
import Timeline from "../components/Timeline";

function UserMain(){

    return(
        <BaseWindow 
            sideBar={<UserSideBar/>} 
            pageContent={<Timeline type="home"/>}
        />);

}

export default UserMain;