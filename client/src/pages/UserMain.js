import React from "react";
import UserSideBar from "../components/UserSideBar";
import BaseWindow from "../components/BaseWindow";

function UserMain(){

    return(
    <BaseWindow 
        sideBar={<UserSideBar/>} 
        pageContent={
        <>
        <h1>Token de acceso: {localStorage.getItem("mastodon_access_token")}</h1>
        </>}
    />);

}

export default UserMain;