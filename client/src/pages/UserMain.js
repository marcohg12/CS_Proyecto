import React from "react";
import UserSideBar from "../components/sidebars/UserSideBar";
import BaseWindow from "../components/BaseWindow";
import ActionsSideBar from "../components/sidebars/ActionsSideBar";
import { Outlet } from "react-router";

function UserMain(){

    return(
    <BaseWindow 
        leftSideBar={<UserSideBar/>} 
        pageContent={<Outlet/>}
        rightSideBar={<ActionsSideBar/>}
    />
    );

}

export default UserMain;