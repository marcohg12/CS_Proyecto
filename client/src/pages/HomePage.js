import React from "react";
import HomeSideBar from "../components/HomeSideBar";
import BaseWindow from "../components/BaseWindow";

function HomePage(){

    return(
    <BaseWindow 
        sideBar={<HomeSideBar/>} 
        pageContent={
        <>
        <h1>Welcome to the Main Content Area</h1>
        <p>This is where your main content goes.</p>
        </>}
    />);

}

export default HomePage;