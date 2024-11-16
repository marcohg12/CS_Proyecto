import React from "react";
import HomeSideBar from "../components/HomeSideBar";
import BaseWindow from "../components/BaseWindow";
import Timeline from "../components/Timeline";

function HomePage(){

    return(
    <BaseWindow 
        sideBar={<HomeSideBar/>} 
        pageContent={<Timeline/>}
    />);

}

export default HomePage;