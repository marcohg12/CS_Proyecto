import React from "react";
import UserSideBar from "../components/UserSideBar";
import BaseWindow from "../components/BaseWindow";
import ActionsSideBar from "../components/ActionsSideBar";
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